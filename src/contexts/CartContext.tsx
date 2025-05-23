
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./AuthContext";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";
import { Service } from "@/hooks/useServices";

export interface CartItem {
  id: string;
  service_id: string;
  quantity: number;
  service: Service;
}

interface CartContextType {
  cart: CartItem[];
  isLoading: boolean;
  addToCart: (service: Service) => Promise<void>;
  removeFromCart: (itemId: string) => Promise<void>;
  updateQuantity: (itemId: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// Local storage key for guest cart ID
const GUEST_ID_KEY = "onassist_guest_id";

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const [guestId, setGuestId] = useState<string | null>(null);

  // Initialize guest ID
  useEffect(() => {
    const storedGuestId = localStorage.getItem(GUEST_ID_KEY);
    if (!storedGuestId) {
      const newGuestId = uuidv4();
      localStorage.setItem(GUEST_ID_KEY, newGuestId);
      setGuestId(newGuestId);
    } else {
      setGuestId(storedGuestId);
    }
  }, []);

  // Fetch cart items whenever user or guestId changes
  useEffect(() => {
    const fetchCartItems = async () => {
      if (!user && !guestId) return;
      
      setIsLoading(true);
      try {
        // First, get the cart items
        let query = supabase.from("cart_items").select("*");

        if (user) {
          query = query.eq("user_id", user.id);
        } else if (guestId) {
          query = query.eq("guest_id", guestId);
        }

        const { data: cartItems, error: cartError } = await query;

        if (cartError) {
          console.error("Error fetching cart items:", cartError);
          setIsLoading(false);
          return;
        }

        // For each cart item, fetch the corresponding service details
        const cartWithServices = await Promise.all(
          cartItems.map(async (item) => {
            const { data: serviceData, error: serviceError } = await supabase
              .from("services")
              .select("*")
              .eq("id", item.service_id)
              .single();

            if (serviceError) {
              console.error("Error fetching service:", serviceError);
              return null;
            }

            return {
              ...item,
              service: serviceData
            };
          })
        );

        // Filter out nulls (in case of errors) and set the cart
        const validCartItems = cartWithServices.filter(Boolean) as CartItem[];
        setCart(validCartItems);
      } catch (error) {
        console.error("Error in fetchCartItems:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCartItems();
  }, [user, guestId]);

  // Transfer guest cart to user cart when user logs in
  useEffect(() => {
    const transferGuestCart = async () => {
      if (user && guestId) {
        try {
          // Get guest cart items
          const { data: guestCartItems, error: fetchError } = await supabase
            .from("cart_items")
            .select("*")
            .eq("guest_id", guestId);

          if (fetchError || !guestCartItems?.length) return;

          // For each guest cart item, add it to the user's cart
          for (const item of guestCartItems) {
            // Check if user already has this service in cart
            const { data: existingItem } = await supabase
              .from("cart_items")
              .select("*")
              .eq("user_id", user.id)
              .eq("service_id", item.service_id)
              .single();

            if (existingItem) {
              // Update quantity if service already in user's cart
              await supabase
                .from("cart_items")
                .update({ quantity: existingItem.quantity + item.quantity })
                .eq("id", existingItem.id);
            } else {
              // Add to user's cart if not already there
              await supabase.from("cart_items").insert({
                service_id: item.service_id,
                user_id: user.id,
                quantity: item.quantity,
              });
            }
          }

          // Delete all guest cart items
          await supabase.from("cart_items").delete().eq("guest_id", guestId);

        } catch (error) {
          console.error("Error transferring guest cart:", error);
        }
      }
    };

    transferGuestCart();
  }, [user, guestId]);

  // Add item to cart
  const addToCart = async (service: Service) => {
    try {
      // Check if the service is already in the cart
      const existingItem = cart.find(item => item.service_id === service.id);
      
      if (existingItem) {
        // Update quantity if already in cart
        await updateQuantity(existingItem.id, existingItem.quantity + 1);
        toast.success("Updated cart", {
          description: `Increased quantity of ${service.title}`
        });
        return;
      }

      // Create new cart item
      const newItem = {
        service_id: service.id,
        ...(user ? { user_id: user.id } : { guest_id: guestId }),
        quantity: 1,
      };

      const { data, error } = await supabase
        .from("cart_items")
        .insert(newItem)
        .select()
        .single();

      if (error) {
        throw error;
      }

      // Fetch the service details
      const { data: serviceData, error: serviceError } = await supabase
        .from("services")
        .select("*")
        .eq("id", service.id)
        .single();

      if (serviceError) {
        throw serviceError;
      }

      // Add the new item to the cart state
      const newCartItem = {
        ...data,
        service: serviceData
      };

      setCart(prevCart => [...prevCart, newCartItem]);
      
      toast.success("Added to cart", {
        description: `${service.title} has been added to your cart`
      });
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Error", {
        description: "Failed to add item to cart"
      });
    }
  };

  // Remove item from cart
  const removeFromCart = async (itemId: string) => {
    try {
      const { error } = await supabase
        .from("cart_items")
        .delete()
        .eq("id", itemId);

      if (error) {
        throw error;
      }

      setCart(prevCart => prevCart.filter(item => item.id !== itemId));
      
      toast.success("Removed from cart", {
        description: "Item has been removed from your cart"
      });
    } catch (error) {
      console.error("Error removing from cart:", error);
      toast.error("Error", {
        description: "Failed to remove item from cart"
      });
    }
  };

  // Update item quantity
  const updateQuantity = async (itemId: string, quantity: number) => {
    if (quantity < 1) {
      return removeFromCart(itemId);
    }

    try {
      const { error } = await supabase
        .from("cart_items")
        .update({ quantity })
        .eq("id", itemId);

      if (error) {
        throw error;
      }

      setCart(prevCart =>
        prevCart.map(item =>
          item.id === itemId ? { ...item, quantity } : item
        )
      );
      
      toast.success("Quantity updated", {
        description: "Cart item quantity has been updated"
      });
    } catch (error) {
      console.error("Error updating quantity:", error);
      toast.error("Error", {
        description: "Failed to update item quantity"
      });
    }
  };

  // Clear entire cart
  const clearCart = async () => {
    try {
      let query = supabase.from("cart_items").delete();
      
      if (user) {
        query = query.eq("user_id", user.id);
      } else {
        query = query.eq("guest_id", guestId);
      }
      
      const { error } = await query;

      if (error) {
        throw error;
      }

      setCart([]);
      toast.success("Cart cleared", {
        description: "All items have been removed from your cart"
      });
    } catch (error) {
      console.error("Error clearing cart:", error);
      toast.error("Error", {
        description: "Failed to clear cart"
      });
    }
  };

  // Calculate totals
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.quantity * item.service.price,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        isLoading,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
