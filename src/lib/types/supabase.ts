
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          first_name: string | null
          last_name: string | null
          phone_number: string | null
          address: string | null
          city: string | null
          state: string | null
          zip_code: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          first_name?: string | null
          last_name?: string | null
          phone_number?: string | null
          address?: string | null
          city?: string | null
          state?: string | null
          zip_code?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          first_name?: string | null
          last_name?: string | null
          phone_number?: string | null
          address?: string | null
          city?: string | null
          state?: string | null
          zip_code?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      user_roles: {
        Row: {
          id: string
          user_id: string
          role: 'admin' | 'customer'
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          role?: 'admin' | 'customer'
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          role?: 'admin' | 'customer'
          created_at?: string
        }
      }
      services: {
        Row: {
          id: string
          title: string
          description: string
          price: number
          duration: string
          image_url: string
          category_id: string
          popular: boolean
          active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          price: number
          duration: string
          image_url: string
          category_id: string
          popular?: boolean
          active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          price?: number
          duration?: string
          image_url?: string
          category_id?: string
          popular?: boolean
          active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      service_categories: {
        Row: {
          id: string
          title: string
          description: string | null
          image_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          image_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          image_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      cart_items: {
        Row: {
          id: string
          service_id: string
          user_id: string | null
          guest_id: string | null
          quantity: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          service_id: string
          user_id?: string | null
          guest_id?: string | null
          quantity?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          service_id?: string
          user_id?: string | null
          guest_id?: string | null
          quantity?: number
          created_at?: string
          updated_at?: string
        }
      }
      orders: {
        Row: {
          id: string
          user_id: string | null
          first_name: string
          last_name: string
          email: string
          phone_number: string
          address: string
          city: string
          state: string
          zip_code: string
          total_amount: number
          status: string
          payment_status: string
          payment_method: string | null
          payment_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          first_name: string
          last_name: string
          email: string
          phone_number: string
          address: string
          city: string
          state: string
          zip_code: string
          total_amount: number
          status?: string
          payment_status?: string
          payment_method?: string | null
          payment_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          first_name?: string
          last_name?: string
          email?: string
          phone_number?: string
          address?: string
          city?: string
          state?: string
          zip_code?: string
          total_amount?: number
          status?: string
          payment_status?: string
          payment_method?: string | null
          payment_id?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      order_items: {
        Row: {
          id: string
          order_id: string
          service_id: string
          service_title: string
          service_price: number
          quantity: number
          created_at: string
        }
        Insert: {
          id?: string
          order_id: string
          service_id: string
          service_title: string
          service_price: number
          quantity?: number
          created_at?: string
        }
        Update: {
          id?: string
          order_id?: string
          service_id?: string
          service_title?: string
          service_price?: number
          quantity?: number
          created_at?: string
        }
      }
      contact_inquiries: {
        Row: {
          id: string
          first_name: string
          last_name: string
          email: string
          phone_number: string | null
          subject: string
          message: string
          user_id: string | null
          status: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          first_name: string
          last_name: string
          email: string
          phone_number?: string | null
          subject: string
          message: string
          user_id?: string | null
          status?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          first_name?: string
          last_name?: string
          email?: string
          phone_number?: string | null
          subject?: string
          message?: string
          user_id?: string | null
          status?: string
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}
