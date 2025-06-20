export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      cart_items: {
        Row: {
          created_at: string;
          guest_id: string | null;
          id: string;
          quantity: number;
          service_id: string;
          updated_at: string;
          user_id: string | null;
        };
        Insert: {
          created_at?: string;
          guest_id?: string | null;
          id?: string;
          quantity?: number;
          service_id: string;
          updated_at?: string;
          user_id?: string | null;
        };
        Update: {
          created_at?: string;
          guest_id?: string | null;
          id?: string;
          quantity?: number;
          service_id?: string;
          updated_at?: string;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "cart_items_service_id_fkey";
            columns: ["service_id"];
            isOneToOne: false;
            referencedRelation: "services";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "fk_cart_items_service";
            columns: ["service_id"];
            isOneToOne: false;
            referencedRelation: "services";
            referencedColumns: ["id"];
          }
        ];
      };
      contact_inquiries: {
        Row: {
          created_at: string;
          email: string;
          first_name: string;
          id: string;
          last_name: string;
          message: string;
          phone_number: string | null;
          status: string;
          subject: string;
          updated_at: string;
          user_id: string | null;
        };
        Insert: {
          created_at?: string;
          email: string;
          first_name: string;
          id?: string;
          last_name: string;
          message: string;
          phone_number?: string | null;
          status?: string;
          subject: string;
          updated_at?: string;
          user_id?: string | null;
        };
        Update: {
          created_at?: string;
          email?: string;
          first_name?: string;
          id?: string;
          last_name?: string;
          message?: string;
          phone_number?: string | null;
          status?: string;
          subject?: string;
          updated_at?: string;
          user_id?: string | null;
        };
        Relationships: [];
      };
      order_items: {
        Row: {
          created_at: string;
          id: string;
          order_id: string;
          quantity: number;
          service_id: string;
          service_price: number;
          service_title: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          order_id: string;
          quantity?: number;
          service_id: string;
          service_price: number;
          service_title: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          order_id?: string;
          quantity?: number;
          service_id?: string;
          service_price?: number;
          service_title?: string;
        };
        Relationships: [
          {
            foreignKeyName: "fk_order_items_order";
            columns: ["order_id"];
            isOneToOne: false;
            referencedRelation: "orders";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "fk_order_items_service";
            columns: ["service_id"];
            isOneToOne: false;
            referencedRelation: "services";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "order_items_order_id_fkey";
            columns: ["order_id"];
            isOneToOne: false;
            referencedRelation: "orders";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "order_items_service_id_fkey";
            columns: ["service_id"];
            isOneToOne: false;
            referencedRelation: "services";
            referencedColumns: ["id"];
          }
        ];
      };
      orders: {
        Row: {
          address: string;
          city: string;
          created_at: string;
          email: string;
          first_name: string;
          id: string;
          last_name: string;
          payment_id: string | null;
          payment_method: string | null;
          payment_status: string;
          phone_number: string;
          state: string;
          status: string;
          total_amount: number;
          updated_at: string;
          user_id: string | null;
          zip_code: string;
        };
        Insert: {
          address: string;
          city: string;
          created_at?: string;
          email: string;
          first_name: string;
          id?: string;
          last_name: string;
          payment_id?: string | null;
          payment_method?: string | null;
          payment_status?: string;
          phone_number: string;
          state: string;
          status?: string;
          total_amount: number;
          updated_at?: string;
          user_id?: string | null;
          zip_code: string;
        };
        Update: {
          address?: string;
          city?: string;
          created_at?: string;
          email?: string;
          first_name?: string;
          id?: string;
          last_name?: string;
          payment_id?: string | null;
          payment_method?: string | null;
          payment_status?: string;
          phone_number?: string;
          state?: string;
          status?: string;
          total_amount?: number;
          updated_at?: string;
          user_id?: string | null;
          zip_code?: string;
        };
        Relationships: [];
      };
      profiles: {
        Row: {
          address: string | null;
          city: string | null;
          created_at: string;
          first_name: string | null;
          id: string;
          last_name: string | null;
          phone_number: string | null;
          state: string | null;
          updated_at: string;
          zip_code: string | null;
        };
        Insert: {
          address?: string | null;
          city?: string | null;
          created_at?: string;
          first_name?: string | null;
          id: string;
          last_name?: string | null;
          phone_number?: string | null;
          state?: string | null;
          updated_at?: string;
          zip_code?: string | null;
        };
        Update: {
          address?: string | null;
          city?: string | null;
          created_at?: string;
          first_name?: string | null;
          id?: string;
          last_name?: string | null;
          phone_number?: string | null;
          state?: string | null;
          updated_at?: string;
          zip_code?: string | null;
        };
        Relationships: [];
      };
      service_categories: {
        Row: {
          created_at: string;
          description: string | null;
          id: string;
          image_url: string | null;
          title: string;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          description?: string | null;
          id?: string;
          image_url?: string | null;
          title: string;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          description?: string | null;
          id?: string;
          image_url?: string | null;
          title?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      services: {
        Row: {
          active: boolean | null;
          category_id: string;
          created_at: string;
          description: string;
          duration: string;
          id: string;
          image_url: string;
          popular: boolean | null;
          price: number;
          title: string;
          updated_at: string;
        };
        Insert: {
          active?: boolean | null;
          category_id: string;
          created_at?: string;
          description: string;
          duration: string;
          id?: string;
          image_url: string;
          popular?: boolean | null;
          price: number;
          title: string;
          updated_at?: string;
        };
        Update: {
          active?: boolean | null;
          category_id?: string;
          created_at?: string;
          description?: string;
          duration?: string;
          id?: string;
          image_url?: string;
          popular?: boolean | null;
          price?: number;
          title?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "fk_services_category";
            columns: ["category_id"];
            isOneToOne: false;
            referencedRelation: "service_categories";
            referencedColumns: ["id"];
          }
        ];
      };
      site_settings: {
        Row: {
          address: string | null;
          contactphone: string | null;
          description: string | null;
          email: string | null;
          id: number;
          name: string;
        };
        Insert: {
          address?: string | null;
          contactphone?: string | null;
          description?: string | null;
          email?: string | null;
          id?: number;
          name: string;
        };
        Update: {
          address?: string | null;
          contactphone?: string | null;
          description?: string | null;
          email?: string | null;
          id?: number;
          name?: string;
        };
        Relationships: [];
      };
      user_roles: {
        Row: {
          created_at: string;
          id: string;
          role: Database["public"]["Enums"]["user_role"];
          user_id: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          role?: Database["public"]["Enums"]["user_role"];
          user_id: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          role?: Database["public"]["Enums"]["user_role"];
          user_id?: string;
        };
        Relationships: [];
      };
      category_service_leads: {
        Row: {
          id: string;
          name: string;
          phone: string;
          email: string;
          address: string;
          category_slug: string;
          category_name: string;
          preferred_time: string;
          message: string | null;
          created_at: string;
          status: string;
          notes: string | null;
        };
        Insert: {
          id?: string;
          name: string;
          phone: string;
          email: string;
          address: string;
          category_slug: string;
          category_name: string;
          preferred_time: string;
          message?: string | null;
          created_at?: string;
          status?: string;
          notes?: string | null;
        };
        Update: {
          id?: string;
          name?: string;
          phone?: string;
          email?: string;
          address?: string;
          category_slug?: string;
          category_name?: string;
          preferred_time?: string;
          message?: string | null;
          created_at?: string;
          status?: string;
          notes?: string | null;
        };
        Relationships: [];
      };
      service_leads: {
        Row: {
          id: string;
          name: string;
          email: string;
          phone: string;
          service: string;
          preferred_datetime: string;
          message: string | null;
          status: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          phone: string;
          service: string;
          preferred_datetime: string;
          message?: string | null;
          status?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string;
          phone?: string;
          service?: string;
          preferred_datetime?: string;
          message?: string | null;
          status?: string;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      has_role: {
        Args: { required_role: Database["public"]["Enums"]["user_role"] };
        Returns: boolean;
      };
    };
    Enums: {
      user_role: "admin" | "customer";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DefaultSchema = Database[Extract<keyof Database, "public">];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
      DefaultSchema["Views"])
  ? (DefaultSchema["Tables"] &
      DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
      Row: infer R;
    }
    ? R
    : never
  : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
  ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
      Insert: infer I;
    }
    ? I
    : never
  : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
  ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
      Update: infer U;
    }
    ? U
    : never
  : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
  ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
  : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
  ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
  : never;

export const Constants = {
  public: {
    Enums: {
      user_role: ["admin", "customer"],
    },
  },
} as const;
