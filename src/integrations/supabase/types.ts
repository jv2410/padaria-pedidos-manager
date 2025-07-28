export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      admin_expenses: {
        Row: {
          amount: number
          created_at: string | null
          date: string
          description: string
          expense_type: string
          id: string
          payment_date: string | null
          payment_status: string
          updated_at: string | null
        }
        Insert: {
          amount?: number
          created_at?: string | null
          date: string
          description: string
          expense_type?: string
          id?: string
          payment_date?: string | null
          payment_status?: string
          updated_at?: string | null
        }
        Update: {
          amount?: number
          created_at?: string | null
          date?: string
          description?: string
          expense_type?: string
          id?: string
          payment_date?: string | null
          payment_status?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      appointments: {
        Row: {
          created_at: string | null
          date: string
          id: string
          notes: string | null
          patient_id: string | null
          professional_id: string | null
          status: string
          time_end: string
          time_start: string
          type: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          date: string
          id?: string
          notes?: string | null
          patient_id?: string | null
          professional_id?: string | null
          status: string
          time_end: string
          time_start: string
          type: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          date?: string
          id?: string
          notes?: string | null
          patient_id?: string | null
          professional_id?: string | null
          status?: string
          time_end?: string
          time_start?: string
          type?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "appointments_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "appointments_professional_id_fkey"
            columns: ["professional_id"]
            isOneToOne: false
            referencedRelation: "professionals"
            referencedColumns: ["id"]
          },
        ]
      }
      attendants: {
        Row: {
          created_at: string
          email: string
          id: string
          name: string
          password: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          name: string
          password: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          name?: string
          password?: string
        }
        Relationships: []
      }
      cards: {
        Row: {
          card_name: string
          card_type: string
          company_id: string | null
          created_at: string | null
          id: string
          last_four_digits: string
          updated_at: string | null
        }
        Insert: {
          card_name: string
          card_type?: string
          company_id?: string | null
          created_at?: string | null
          id?: string
          last_four_digits: string
          updated_at?: string | null
        }
        Update: {
          card_name?: string
          card_type?: string
          company_id?: string | null
          created_at?: string | null
          id?: string
          last_four_digits?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "cards_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "financial_companies"
            referencedColumns: ["id"]
          },
        ]
      }
      caregiver_schedules: {
        Row: {
          caregiver_id: string
          created_at: string | null
          date: string
          end_time: string
          id: string
          notes: string | null
          patient_id: string | null
          start_time: string
          status: string
        }
        Insert: {
          caregiver_id: string
          created_at?: string | null
          date: string
          end_time: string
          id?: string
          notes?: string | null
          patient_id?: string | null
          start_time: string
          status?: string
        }
        Update: {
          caregiver_id?: string
          created_at?: string | null
          date?: string
          end_time?: string
          id?: string
          notes?: string | null
          patient_id?: string | null
          start_time?: string
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "caregiver_schedules_caregiver_id_fkey"
            columns: ["caregiver_id"]
            isOneToOne: false
            referencedRelation: "caregivers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "caregiver_schedules_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
        ]
      }
      caregivers: {
        Row: {
          active: boolean | null
          created_at: string | null
          email: string
          id: string
          name: string
          password: string
          phone: string
        }
        Insert: {
          active?: boolean | null
          created_at?: string | null
          email: string
          id?: string
          name: string
          password: string
          phone: string
        }
        Update: {
          active?: boolean | null
          created_at?: string | null
          email?: string
          id?: string
          name?: string
          password?: string
          phone?: string
        }
        Relationships: []
      }
      chart_of_accounts: {
        Row: {
          accepts_entries: boolean | null
          account_subtype: string | null
          account_type: string
          code: string
          company_id: string | null
          created_at: string | null
          id: string
          is_active: boolean | null
          level: number
          name: string
          parent_id: string | null
          updated_at: string | null
        }
        Insert: {
          accepts_entries?: boolean | null
          account_subtype?: string | null
          account_type: string
          code: string
          company_id?: string | null
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          level?: number
          name: string
          parent_id?: string | null
          updated_at?: string | null
        }
        Update: {
          accepts_entries?: boolean | null
          account_subtype?: string | null
          account_type?: string
          code?: string
          company_id?: string | null
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          level?: number
          name?: string
          parent_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "chart_of_accounts_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "financial_companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "chart_of_accounts_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "chart_of_accounts"
            referencedColumns: ["id"]
          },
        ]
      }
      client_files: {
        Row: {
          client_id: string | null
          id: string
          name: string
          type: string
          upload_date: string | null
          url: string
        }
        Insert: {
          client_id?: string | null
          id?: string
          name: string
          type: string
          upload_date?: string | null
          url: string
        }
        Update: {
          client_id?: string | null
          id?: string
          name?: string
          type?: string
          upload_date?: string | null
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "client_files_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
        ]
      }
      clients: {
        Row: {
          company_name: string | null
          contact: string | null
          created_at: string | null
          email: string | null
          expected_payment_date: string | null
          id: string
          instagram_handle: string | null
          last_payment_date: string | null
          name: string
          notes: string | null
          payment_status: string
          status: string
          updated_at: string | null
          value: number
        }
        Insert: {
          company_name?: string | null
          contact?: string | null
          created_at?: string | null
          email?: string | null
          expected_payment_date?: string | null
          id?: string
          instagram_handle?: string | null
          last_payment_date?: string | null
          name: string
          notes?: string | null
          payment_status?: string
          status?: string
          updated_at?: string | null
          value?: number
        }
        Update: {
          company_name?: string | null
          contact?: string | null
          created_at?: string | null
          email?: string | null
          expected_payment_date?: string | null
          id?: string
          instagram_handle?: string | null
          last_payment_date?: string | null
          name?: string
          notes?: string | null
          payment_status?: string
          status?: string
          updated_at?: string | null
          value?: number
        }
        Relationships: []
      }
      companies: {
        Row: {
          created_at: string
          id: string
          name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      company_subscriptions: {
        Row: {
          cancel_at_period_end: boolean | null
          company_id: string | null
          created_at: string
          current_period_end: string | null
          current_period_start: string | null
          id: string
          plan_id: string | null
          status: Database["public"]["Enums"]["subscription_status"]
          stripe_customer_id: string | null
          stripe_subscription_id: string | null
          updated_at: string
        }
        Insert: {
          cancel_at_period_end?: boolean | null
          company_id?: string | null
          created_at?: string
          current_period_end?: string | null
          current_period_start?: string | null
          id?: string
          plan_id?: string | null
          status?: Database["public"]["Enums"]["subscription_status"]
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          updated_at?: string
        }
        Update: {
          cancel_at_period_end?: boolean | null
          company_id?: string | null
          created_at?: string
          current_period_end?: string | null
          current_period_start?: string | null
          id?: string
          plan_id?: string | null
          status?: Database["public"]["Enums"]["subscription_status"]
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "company_subscriptions_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "financial_companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "company_subscriptions_plan_id_fkey"
            columns: ["plan_id"]
            isOneToOne: false
            referencedRelation: "subscription_plans"
            referencedColumns: ["id"]
          },
        ]
      }
      cost_centers: {
        Row: {
          code: string
          company_id: string | null
          created_at: string | null
          description: string | null
          id: string
          is_active: boolean | null
          name: string
          updated_at: string | null
        }
        Insert: {
          code: string
          company_id?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          updated_at?: string | null
        }
        Update: {
          code?: string
          company_id?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "cost_centers_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "financial_companies"
            referencedColumns: ["id"]
          },
        ]
      }
      crm_appointments: {
        Row: {
          client: string
          created_at: string
          date: string
          description: string | null
          duration: string
          id: string
          location: string | null
          status: string
          time: string
          title: string
          type: string
          updated_at: string
        }
        Insert: {
          client: string
          created_at?: string
          date: string
          description?: string | null
          duration: string
          id?: string
          location?: string | null
          status?: string
          time: string
          title: string
          type: string
          updated_at?: string
        }
        Update: {
          client?: string
          created_at?: string
          date?: string
          description?: string | null
          duration?: string
          id?: string
          location?: string | null
          status?: string
          time?: string
          title?: string
          type?: string
          updated_at?: string
        }
        Relationships: []
      }
      crm_clients: {
        Row: {
          created_at: string
          documents: number | null
          email: string | null
          id: string
          name: string
          phone: string
          processes: number | null
          status: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          documents?: number | null
          email?: string | null
          id?: string
          name: string
          phone: string
          processes?: number | null
          status?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          documents?: number | null
          email?: string | null
          id?: string
          name?: string
          phone?: string
          processes?: number | null
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      crm_conversations: {
        Row: {
          client_id: string | null
          created_at: string
          id: string
          meta: Json | null
          timestamp: string
          unread_count: number | null
          updated_at: string
        }
        Insert: {
          client_id?: string | null
          created_at?: string
          id?: string
          meta?: Json | null
          timestamp?: string
          unread_count?: number | null
          updated_at?: string
        }
        Update: {
          client_id?: string | null
          created_at?: string
          id?: string
          meta?: Json | null
          timestamp?: string
          unread_count?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "crm_conversations_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "crm_clients"
            referencedColumns: ["id"]
          },
        ]
      }
      crm_messages: {
        Row: {
          content: string
          conversation_id: string | null
          created_at: string
          id: string
          sender_type: string
        }
        Insert: {
          content: string
          conversation_id?: string | null
          created_at?: string
          id?: string
          sender_type: string
        }
        Update: {
          content?: string
          conversation_id?: string | null
          created_at?: string
          id?: string
          sender_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "crm_messages_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "crm_conversations"
            referencedColumns: ["id"]
          },
        ]
      }
      dados_cliente: {
        Row: {
          created_at: string | null
          disparado_at: string | null
          empresa: string | null
          id: number
          nome: string | null
          situacao: string | null
          telefone: string | null
        }
        Insert: {
          created_at?: string | null
          disparado_at?: string | null
          empresa?: string | null
          id?: number
          nome?: string | null
          situacao?: string | null
          telefone?: string | null
        }
        Update: {
          created_at?: string | null
          disparado_at?: string | null
          empresa?: string | null
          id?: number
          nome?: string | null
          situacao?: string | null
          telefone?: string | null
        }
        Relationships: []
      }
      dre_parameters: {
        Row: {
          created_at: string | null
          developer_rate: number
          id: string
          partner_rate: number
          tax_rate: number
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          developer_rate?: number
          id?: string
          partner_rate?: number
          tax_rate?: number
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          developer_rate?: number
          id?: string
          partner_rate?: number
          tax_rate?: number
          updated_at?: string | null
        }
        Relationships: []
      }
      financial_companies: {
        Row: {
          address: string | null
          cnpj: string | null
          created_at: string
          email: string
          id: string
          name: string
          owner_user_id: string | null
          phone: string | null
          updated_at: string
        }
        Insert: {
          address?: string | null
          cnpj?: string | null
          created_at?: string
          email: string
          id?: string
          name: string
          owner_user_id?: string | null
          phone?: string | null
          updated_at?: string
        }
        Update: {
          address?: string | null
          cnpj?: string | null
          created_at?: string
          email?: string
          id?: string
          name?: string
          owner_user_id?: string | null
          phone?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      financial_transactions: {
        Row: {
          account_id: string | null
          amount: number
          card_id: string | null
          category_id: string | null
          company_id: string | null
          cost_center_id: string | null
          created_at: string
          date: string
          description: string
          fiscal_notes: string | null
          id: string
          payment_method: string | null
          reference_id: string | null
          series_id: string | null
          tax_cfop: string | null
          tax_document_number: string | null
          tax_ncm: string | null
          type: string
          updated_at: string
        }
        Insert: {
          account_id?: string | null
          amount: number
          card_id?: string | null
          category_id?: string | null
          company_id?: string | null
          cost_center_id?: string | null
          created_at?: string
          date: string
          description: string
          fiscal_notes?: string | null
          id?: string
          payment_method?: string | null
          reference_id?: string | null
          series_id?: string | null
          tax_cfop?: string | null
          tax_document_number?: string | null
          tax_ncm?: string | null
          type: string
          updated_at?: string
        }
        Update: {
          account_id?: string | null
          amount?: number
          card_id?: string | null
          category_id?: string | null
          company_id?: string | null
          cost_center_id?: string | null
          created_at?: string
          date?: string
          description?: string
          fiscal_notes?: string | null
          id?: string
          payment_method?: string | null
          reference_id?: string | null
          series_id?: string | null
          tax_cfop?: string | null
          tax_document_number?: string | null
          tax_ncm?: string | null
          type?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "financial_transactions_account_id_fkey"
            columns: ["account_id"]
            isOneToOne: false
            referencedRelation: "chart_of_accounts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "financial_transactions_card_id_fkey"
            columns: ["card_id"]
            isOneToOne: false
            referencedRelation: "cards"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "financial_transactions_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "transaction_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "financial_transactions_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "financial_companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "financial_transactions_cost_center_id_fkey"
            columns: ["cost_center_id"]
            isOneToOne: false
            referencedRelation: "cost_centers"
            referencedColumns: ["id"]
          },
        ]
      }
      lead_files: {
        Row: {
          id: string
          lead_id: string
          name: string
          type: string
          upload_date: string
          url: string
        }
        Insert: {
          id?: string
          lead_id: string
          name: string
          type: string
          upload_date?: string
          url: string
        }
        Update: {
          id?: string
          lead_id?: string
          name?: string
          type?: string
          upload_date?: string
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "lead_files_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
        ]
      }
      lead_interactions: {
        Row: {
          created_at: string | null
          description: string | null
          followup_date: string | null
          id: string
          lead_id: string | null
          result: string | null
          stage: string | null
          status: string | null
          type: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          followup_date?: string | null
          id?: string
          lead_id?: string | null
          result?: string | null
          stage?: string | null
          status?: string | null
          type: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          followup_date?: string | null
          id?: string
          lead_id?: string | null
          result?: string | null
          stage?: string | null
          status?: string | null
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "lead_interactions_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
        ]
      }
      leads: {
        Row: {
          created_at: string | null
          email: string | null
          id: string
          interest: string | null
          name: string
          notes: string | null
          phone: string
          source: string
          stage: string
          status: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          email?: string | null
          id?: string
          interest?: string | null
          name: string
          notes?: string | null
          phone: string
          source: string
          stage: string
          status: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string | null
          id?: string
          interest?: string | null
          name?: string
          notes?: string | null
          phone?: string
          source?: string
          stage?: string
          status?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      machina_contacts: {
        Row: {
          company_id: string | null
          created_at: string | null
          email: string
          id: string
          name: string
          phone: string | null
          role: string | null
          updated_at: string | null
        }
        Insert: {
          company_id?: string | null
          created_at?: string | null
          email: string
          id?: string
          name: string
          phone?: string | null
          role?: string | null
          updated_at?: string | null
        }
        Update: {
          company_id?: string | null
          created_at?: string | null
          email?: string
          id?: string
          name?: string
          phone?: string | null
          role?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "machina_contacts_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      machina_machines: {
        Row: {
          created_at: string | null
          id: string
          installation_date: string | null
          last_maintenance_date: string | null
          maintenance_alerts: Json | null
          model_name: string
          next_maintenance_date: string | null
          owner_company_id: string | null
          serial_number: string
          status: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          installation_date?: string | null
          last_maintenance_date?: string | null
          maintenance_alerts?: Json | null
          model_name: string
          next_maintenance_date?: string | null
          owner_company_id?: string | null
          serial_number: string
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          installation_date?: string | null
          last_maintenance_date?: string | null
          maintenance_alerts?: Json | null
          model_name?: string
          next_maintenance_date?: string | null
          owner_company_id?: string | null
          serial_number?: string
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "machina_machines_owner_company_id_fkey"
            columns: ["owner_company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      machina_service_orders: {
        Row: {
          actual_hours: number | null
          completed_at: string | null
          cost: number | null
          created_at: string | null
          estimated_hours: number | null
          id: string
          issue_description: string | null
          machine_id: string | null
          parts_used: Json | null
          priority: string | null
          solution_notes: string | null
          started_at: string | null
          status: string | null
          technician_id: string | null
          updated_at: string | null
        }
        Insert: {
          actual_hours?: number | null
          completed_at?: string | null
          cost?: number | null
          created_at?: string | null
          estimated_hours?: number | null
          id?: string
          issue_description?: string | null
          machine_id?: string | null
          parts_used?: Json | null
          priority?: string | null
          solution_notes?: string | null
          started_at?: string | null
          status?: string | null
          technician_id?: string | null
          updated_at?: string | null
        }
        Update: {
          actual_hours?: number | null
          completed_at?: string | null
          cost?: number | null
          created_at?: string | null
          estimated_hours?: number | null
          id?: string
          issue_description?: string | null
          machine_id?: string | null
          parts_used?: Json | null
          priority?: string | null
          solution_notes?: string | null
          started_at?: string | null
          status?: string | null
          technician_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "machina_service_orders_machine_id_fkey"
            columns: ["machine_id"]
            isOneToOne: false
            referencedRelation: "machina_machines"
            referencedColumns: ["id"]
          },
        ]
      }
      marketing_analyses: {
        Row: {
          analysis_data: Json | null
          campaign_id: string
          completed_at: string | null
          error_message: string | null
          id: string
          improvements_count: number | null
          insights: Json | null
          issues_count: number | null
          progress: number | null
          score: number | null
          started_at: string
          status: string
          user_id: string
        }
        Insert: {
          analysis_data?: Json | null
          campaign_id: string
          completed_at?: string | null
          error_message?: string | null
          id?: string
          improvements_count?: number | null
          insights?: Json | null
          issues_count?: number | null
          progress?: number | null
          score?: number | null
          started_at?: string
          status?: string
          user_id: string
        }
        Update: {
          analysis_data?: Json | null
          campaign_id?: string
          completed_at?: string | null
          error_message?: string | null
          id?: string
          improvements_count?: number | null
          insights?: Json | null
          issues_count?: number | null
          progress?: number | null
          score?: number | null
          started_at?: string
          status?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "marketing_analyses_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "marketing_campaigns"
            referencedColumns: ["id"]
          },
        ]
      }
      marketing_campaigns: {
        Row: {
          created_at: string
          id: string
          name: string
          notes: string | null
          platform: string | null
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          notes?: string | null
          platform?: string | null
          status?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          notes?: string | null
          platform?: string | null
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      marketing_files: {
        Row: {
          campaign_id: string
          file_size: number | null
          file_type: string
          id: string
          name: string
          storage_path: string
          upload_date: string
          user_id: string
        }
        Insert: {
          campaign_id: string
          file_size?: number | null
          file_type: string
          id?: string
          name: string
          storage_path: string
          upload_date?: string
          user_id: string
        }
        Update: {
          campaign_id?: string
          file_size?: number | null
          file_type?: string
          id?: string
          name?: string
          storage_path?: string
          upload_date?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "marketing_files_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "marketing_campaigns"
            referencedColumns: ["id"]
          },
        ]
      }
      marketing_reports: {
        Row: {
          analysis_id: string
          file_path: string
          generated_at: string
          id: string
          user_id: string
        }
        Insert: {
          analysis_id: string
          file_path: string
          generated_at?: string
          id?: string
          user_id: string
        }
        Update: {
          analysis_id?: string
          file_path?: string
          generated_at?: string
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "marketing_reports_analysis_id_fkey"
            columns: ["analysis_id"]
            isOneToOne: false
            referencedRelation: "marketing_analyses"
            referencedColumns: ["id"]
          },
        ]
      }
      monthly_financials: {
        Row: {
          balance: number
          cash_balance: number
          created_at: string | null
          id: string
          month: number
          total_expense: number
          total_income: number
          updated_at: string | null
          year: number
        }
        Insert: {
          balance?: number
          cash_balance?: number
          created_at?: string | null
          id?: string
          month: number
          total_expense?: number
          total_income?: number
          updated_at?: string | null
          year: number
        }
        Update: {
          balance?: number
          cash_balance?: number
          created_at?: string | null
          id?: string
          month?: number
          total_expense?: number
          total_income?: number
          updated_at?: string | null
          year?: number
        }
        Relationships: []
      }
      operational_costs: {
        Row: {
          amount: number
          created_at: string | null
          date: string
          description: string
          expense_type: string
          id: string
          payment_date: string | null
          payment_status: string
          updated_at: string | null
        }
        Insert: {
          amount?: number
          created_at?: string | null
          date: string
          description: string
          expense_type?: string
          id?: string
          payment_date?: string | null
          payment_status?: string
          updated_at?: string | null
        }
        Update: {
          amount?: number
          created_at?: string | null
          date?: string
          description?: string
          expense_type?: string
          id?: string
          payment_date?: string | null
          payment_status?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      patient_caregiver_shifts: {
        Row: {
          created_at: string | null
          date: string
          day_shift_caregiver_id: string | null
          day_shift_end_time: string | null
          day_shift_hours: number | null
          day_shift_start_time: string | null
          day_shift_value: number | null
          id: string
          night_shift_caregiver_id: string | null
          night_shift_end_time: string | null
          night_shift_hours: number | null
          night_shift_start_time: string | null
          night_shift_value: number | null
          notes: string | null
          patient_id: string
        }
        Insert: {
          created_at?: string | null
          date: string
          day_shift_caregiver_id?: string | null
          day_shift_end_time?: string | null
          day_shift_hours?: number | null
          day_shift_start_time?: string | null
          day_shift_value?: number | null
          id?: string
          night_shift_caregiver_id?: string | null
          night_shift_end_time?: string | null
          night_shift_hours?: number | null
          night_shift_start_time?: string | null
          night_shift_value?: number | null
          notes?: string | null
          patient_id: string
        }
        Update: {
          created_at?: string | null
          date?: string
          day_shift_caregiver_id?: string | null
          day_shift_end_time?: string | null
          day_shift_hours?: number | null
          day_shift_start_time?: string | null
          day_shift_value?: number | null
          id?: string
          night_shift_caregiver_id?: string | null
          night_shift_end_time?: string | null
          night_shift_hours?: number | null
          night_shift_start_time?: string | null
          night_shift_value?: number | null
          notes?: string | null
          patient_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "patient_caregiver_shifts_day_shift_caregiver_id_fkey"
            columns: ["day_shift_caregiver_id"]
            isOneToOne: false
            referencedRelation: "caregivers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "patient_caregiver_shifts_night_shift_caregiver_id_fkey"
            columns: ["night_shift_caregiver_id"]
            isOneToOne: false
            referencedRelation: "caregivers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "patient_caregiver_shifts_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
        ]
      }
      patient_evolutions: {
        Row: {
          assessment: string | null
          blood_glucose: string | null
          blood_pressure: string | null
          caregiver_id: string
          created_at: string | null
          date: string
          description: string
          evacuation: string | null
          heart_rate: string | null
          id: string
          next_steps: string | null
          oxygen_saturation: string | null
          patient_id: string
          respiratory_rate: string | null
          temperature: string | null
          treatment: string | null
        }
        Insert: {
          assessment?: string | null
          blood_glucose?: string | null
          blood_pressure?: string | null
          caregiver_id: string
          created_at?: string | null
          date?: string
          description: string
          evacuation?: string | null
          heart_rate?: string | null
          id?: string
          next_steps?: string | null
          oxygen_saturation?: string | null
          patient_id: string
          respiratory_rate?: string | null
          temperature?: string | null
          treatment?: string | null
        }
        Update: {
          assessment?: string | null
          blood_glucose?: string | null
          blood_pressure?: string | null
          caregiver_id?: string
          created_at?: string | null
          date?: string
          description?: string
          evacuation?: string | null
          heart_rate?: string | null
          id?: string
          next_steps?: string | null
          oxygen_saturation?: string | null
          patient_id?: string
          respiratory_rate?: string | null
          temperature?: string | null
          treatment?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "patient_evolutions_caregiver_id_fkey"
            columns: ["caregiver_id"]
            isOneToOne: false
            referencedRelation: "caregivers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "patient_evolutions_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
        ]
      }
      patient_info: {
        Row: {
          age: number | null
          cpf: string | null
          created_at: string | null
          date_of_birth: string | null
          gender: string | null
          healthcare_plan: string | null
          height: number | null
          id: string
          name: string
          patient_id: string
          phone_numbers: string | null
          relationship: string | null
          responsible_address: string | null
          responsible_cpf: string | null
          responsible_email: string | null
          responsible_name: string | null
          service_address: string | null
          updated_at: string | null
          website: string | null
          weight: number | null
        }
        Insert: {
          age?: number | null
          cpf?: string | null
          created_at?: string | null
          date_of_birth?: string | null
          gender?: string | null
          healthcare_plan?: string | null
          height?: number | null
          id?: string
          name: string
          patient_id: string
          phone_numbers?: string | null
          relationship?: string | null
          responsible_address?: string | null
          responsible_cpf?: string | null
          responsible_email?: string | null
          responsible_name?: string | null
          service_address?: string | null
          updated_at?: string | null
          website?: string | null
          weight?: number | null
        }
        Update: {
          age?: number | null
          cpf?: string | null
          created_at?: string | null
          date_of_birth?: string | null
          gender?: string | null
          healthcare_plan?: string | null
          height?: number | null
          id?: string
          name?: string
          patient_id?: string
          phone_numbers?: string | null
          relationship?: string | null
          responsible_address?: string | null
          responsible_cpf?: string | null
          responsible_email?: string | null
          responsible_name?: string | null
          service_address?: string | null
          updated_at?: string | null
          website?: string | null
          weight?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "patient_info_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: true
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
        ]
      }
      patient_physical_exams: {
        Row: {
          adapted_bathroom: boolean | null
          allergies: boolean | null
          allergies_description: string | null
          auditory_acuity: string | null
          behavior: string | null
          caregiver_id: string
          communication: string | null
          consciousness_level: string | null
          created_at: string | null
          date: string
          decubitus_changes: boolean | null
          dependency_level: string | null
          eliminations: string | null
          equipment_analog_sphygmomanometer: boolean | null
          equipment_crane: boolean | null
          equipment_digital_sphygmomanometer: boolean | null
          equipment_hgt_device: boolean | null
          equipment_hygienic_chair: boolean | null
          equipment_oximeter: boolean | null
          equipment_stethoscope: boolean | null
          equipment_thermometer: boolean | null
          feeding: string | null
          general_state: string | null
          hygiene_habits: string | null
          id: string
          medical_specialty: string | null
          notes: string | null
          pain_level: string | null
          pain_physical_state: string | null
          patient_id: string
          recent_medical_evaluation: boolean | null
          respiratory_status: string | null
          skin_mucosa: string | null
          sleep_rest: string | null
          uses_aspiration_equipment: boolean | null
          uses_hospital_bed: boolean | null
          uses_walker: boolean | null
          uses_wheelchair: boolean | null
          venous_access: boolean | null
          visual_acuity: string | null
        }
        Insert: {
          adapted_bathroom?: boolean | null
          allergies?: boolean | null
          allergies_description?: string | null
          auditory_acuity?: string | null
          behavior?: string | null
          caregiver_id: string
          communication?: string | null
          consciousness_level?: string | null
          created_at?: string | null
          date: string
          decubitus_changes?: boolean | null
          dependency_level?: string | null
          eliminations?: string | null
          equipment_analog_sphygmomanometer?: boolean | null
          equipment_crane?: boolean | null
          equipment_digital_sphygmomanometer?: boolean | null
          equipment_hgt_device?: boolean | null
          equipment_hygienic_chair?: boolean | null
          equipment_oximeter?: boolean | null
          equipment_stethoscope?: boolean | null
          equipment_thermometer?: boolean | null
          feeding?: string | null
          general_state?: string | null
          hygiene_habits?: string | null
          id?: string
          medical_specialty?: string | null
          notes?: string | null
          pain_level?: string | null
          pain_physical_state?: string | null
          patient_id: string
          recent_medical_evaluation?: boolean | null
          respiratory_status?: string | null
          skin_mucosa?: string | null
          sleep_rest?: string | null
          uses_aspiration_equipment?: boolean | null
          uses_hospital_bed?: boolean | null
          uses_walker?: boolean | null
          uses_wheelchair?: boolean | null
          venous_access?: boolean | null
          visual_acuity?: string | null
        }
        Update: {
          adapted_bathroom?: boolean | null
          allergies?: boolean | null
          allergies_description?: string | null
          auditory_acuity?: string | null
          behavior?: string | null
          caregiver_id?: string
          communication?: string | null
          consciousness_level?: string | null
          created_at?: string | null
          date?: string
          decubitus_changes?: boolean | null
          dependency_level?: string | null
          eliminations?: string | null
          equipment_analog_sphygmomanometer?: boolean | null
          equipment_crane?: boolean | null
          equipment_digital_sphygmomanometer?: boolean | null
          equipment_hgt_device?: boolean | null
          equipment_hygienic_chair?: boolean | null
          equipment_oximeter?: boolean | null
          equipment_stethoscope?: boolean | null
          equipment_thermometer?: boolean | null
          feeding?: string | null
          general_state?: string | null
          hygiene_habits?: string | null
          id?: string
          medical_specialty?: string | null
          notes?: string | null
          pain_level?: string | null
          pain_physical_state?: string | null
          patient_id?: string
          recent_medical_evaluation?: boolean | null
          respiratory_status?: string | null
          skin_mucosa?: string | null
          sleep_rest?: string | null
          uses_aspiration_equipment?: boolean | null
          uses_hospital_bed?: boolean | null
          uses_walker?: boolean | null
          uses_wheelchair?: boolean | null
          venous_access?: boolean | null
          visual_acuity?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "patient_physical_exams_caregiver_id_fkey"
            columns: ["caregiver_id"]
            isOneToOne: false
            referencedRelation: "caregivers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "patient_physical_exams_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
        ]
      }
      patients: {
        Row: {
          category: string
          city: string | null
          cpf: string | null
          created_at: string | null
          current_caregiver_id: string | null
          date_of_birth: string | null
          email: string | null
          id: string
          last_appointment: string | null
          medical_history: string | null
          name: string
          neighborhood: string | null
          notes: string | null
          number: string | null
          phone: string
          remaining_sessions: number | null
          state: string | null
          status: string
          street: string | null
          zip_code: string | null
        }
        Insert: {
          category: string
          city?: string | null
          cpf?: string | null
          created_at?: string | null
          current_caregiver_id?: string | null
          date_of_birth?: string | null
          email?: string | null
          id?: string
          last_appointment?: string | null
          medical_history?: string | null
          name: string
          neighborhood?: string | null
          notes?: string | null
          number?: string | null
          phone: string
          remaining_sessions?: number | null
          state?: string | null
          status: string
          street?: string | null
          zip_code?: string | null
        }
        Update: {
          category?: string
          city?: string | null
          cpf?: string | null
          created_at?: string | null
          current_caregiver_id?: string | null
          date_of_birth?: string | null
          email?: string | null
          id?: string
          last_appointment?: string | null
          medical_history?: string | null
          name?: string
          neighborhood?: string | null
          notes?: string | null
          number?: string | null
          phone?: string
          remaining_sessions?: number | null
          state?: string | null
          status?: string
          street?: string | null
          zip_code?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "patients_current_caregiver_id_fkey"
            columns: ["current_caregiver_id"]
            isOneToOne: false
            referencedRelation: "caregivers"
            referencedColumns: ["id"]
          },
        ]
      }
      professionals: {
        Row: {
          active: boolean | null
          created_at: string | null
          email: string
          id: string
          name: string
          password: string
          phone: string
          photo_url: string | null
          role: string
          specialization: string | null
          username: string
        }
        Insert: {
          active?: boolean | null
          created_at?: string | null
          email: string
          id?: string
          name: string
          password: string
          phone: string
          photo_url?: string | null
          role: string
          specialization?: string | null
          username: string
        }
        Update: {
          active?: boolean | null
          created_at?: string | null
          email?: string
          id?: string
          name?: string
          password?: string
          phone?: string
          photo_url?: string | null
          role?: string
          specialization?: string | null
          username?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          company_id: string | null
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
        }
        Insert: {
          company_id?: string | null
          created_at?: string | null
          id: string
          role?: Database["public"]["Enums"]["app_role"]
        }
        Update: {
          company_id?: string | null
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
        }
        Relationships: [
          {
            foreignKeyName: "profiles_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      project_tasks: {
        Row: {
          automation_notes: string | null
          created_at: string
          delegated_to: string | null
          description: string | null
          id: string
          priority: string
          status: string
          time_estimate: string
          title: string
          updated_at: string
          zone: string
        }
        Insert: {
          automation_notes?: string | null
          created_at?: string
          delegated_to?: string | null
          description?: string | null
          id?: string
          priority: string
          status: string
          time_estimate: string
          title: string
          updated_at?: string
          zone: string
        }
        Update: {
          automation_notes?: string | null
          created_at?: string
          delegated_to?: string | null
          description?: string | null
          id?: string
          priority?: string
          status?: string
          time_estimate?: string
          title?: string
          updated_at?: string
          zone?: string
        }
        Relationships: []
      }
      prompt_tags: {
        Row: {
          prompt_id: string
          tag_id: string
        }
        Insert: {
          prompt_id: string
          tag_id: string
        }
        Update: {
          prompt_id?: string
          tag_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "prompt_tags_prompt_id_fkey"
            columns: ["prompt_id"]
            isOneToOne: false
            referencedRelation: "prompts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "prompt_tags_tag_id_fkey"
            columns: ["tag_id"]
            isOneToOne: false
            referencedRelation: "tags"
            referencedColumns: ["id"]
          },
        ]
      }
      prompt_versions: {
        Row: {
          content: string
          created_at: string
          created_by: string
          id: string
          prompt_id: string
          version_number: number
        }
        Insert: {
          content: string
          created_at?: string
          created_by: string
          id?: string
          prompt_id: string
          version_number: number
        }
        Update: {
          content?: string
          created_at?: string
          created_by?: string
          id?: string
          prompt_id?: string
          version_number?: number
        }
        Relationships: [
          {
            foreignKeyName: "prompt_versions_prompt_id_fkey"
            columns: ["prompt_id"]
            isOneToOne: false
            referencedRelation: "prompts"
            referencedColumns: ["id"]
          },
        ]
      }
      prompts: {
        Row: {
          company_id: string
          content: string
          content_search: unknown | null
          created_at: string
          id: string
          last_viewed_at: string | null
          title: string
          updated_at: string
          view_count: number | null
        }
        Insert: {
          company_id: string
          content: string
          content_search?: unknown | null
          created_at?: string
          id?: string
          last_viewed_at?: string | null
          title: string
          updated_at?: string
          view_count?: number | null
        }
        Update: {
          company_id?: string
          content?: string
          content_search?: unknown | null
          created_at?: string
          id?: string
          last_viewed_at?: string | null
          title?: string
          updated_at?: string
          view_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "prompts_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      subscription_plans: {
        Row: {
          active: boolean
          created_at: string
          features: Json
          id: string
          name: string
          price_monthly: number
          price_yearly: number | null
          stripe_price_id: string | null
          transaction_limit: number | null
          type: Database["public"]["Enums"]["subscription_plan_type"]
        }
        Insert: {
          active?: boolean
          created_at?: string
          features?: Json
          id?: string
          name: string
          price_monthly: number
          price_yearly?: number | null
          stripe_price_id?: string | null
          transaction_limit?: number | null
          type: Database["public"]["Enums"]["subscription_plan_type"]
        }
        Update: {
          active?: boolean
          created_at?: string
          features?: Json
          id?: string
          name?: string
          price_monthly?: number
          price_yearly?: number | null
          stripe_price_id?: string | null
          transaction_limit?: number | null
          type?: Database["public"]["Enums"]["subscription_plan_type"]
        }
        Relationships: []
      }
      tags: {
        Row: {
          id: string
          name: string
        }
        Insert: {
          id?: string
          name: string
        }
        Update: {
          id?: string
          name?: string
        }
        Relationships: []
      }
      tax_regimes: {
        Row: {
          company_id: string | null
          config: Json | null
          created_at: string | null
          id: string
          is_active: boolean | null
          regime_type: string
          updated_at: string | null
        }
        Insert: {
          company_id?: string | null
          config?: Json | null
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          regime_type: string
          updated_at?: string | null
        }
        Update: {
          company_id?: string | null
          config?: Json | null
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          regime_type?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tax_regimes_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "financial_companies"
            referencedColumns: ["id"]
          },
        ]
      }
      transaction_categories: {
        Row: {
          category_type: string
          company_id: string | null
          created_at: string
          description: string | null
          id: string
          is_active: boolean
          name: string
          updated_at: string
        }
        Insert: {
          category_type?: string
          company_id?: string | null
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean
          name: string
          updated_at?: string
        }
        Update: {
          category_type?: string
          company_id?: string | null
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean
          name?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "transaction_categories_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "financial_companies"
            referencedColumns: ["id"]
          },
        ]
      }
      transactions: {
        Row: {
          amount: number
          card_id: string | null
          client_id: string | null
          cost_id: string | null
          created_at: string | null
          date: string
          description: string
          expense_id: string | null
          id: string
          monthly_financial_id: string | null
          type: string
          updated_at: string | null
        }
        Insert: {
          amount?: number
          card_id?: string | null
          client_id?: string | null
          cost_id?: string | null
          created_at?: string | null
          date: string
          description: string
          expense_id?: string | null
          id?: string
          monthly_financial_id?: string | null
          type: string
          updated_at?: string | null
        }
        Update: {
          amount?: number
          card_id?: string | null
          client_id?: string | null
          cost_id?: string | null
          created_at?: string | null
          date?: string
          description?: string
          expense_id?: string | null
          id?: string
          monthly_financial_id?: string | null
          type?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "transactions_card_id_fkey"
            columns: ["card_id"]
            isOneToOne: false
            referencedRelation: "cards"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transactions_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transactions_cost_id_fkey"
            columns: ["cost_id"]
            isOneToOne: false
            referencedRelation: "operational_costs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transactions_expense_id_fkey"
            columns: ["expense_id"]
            isOneToOne: false
            referencedRelation: "admin_expenses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transactions_monthly_financial_id_fkey"
            columns: ["monthly_financial_id"]
            isOneToOne: false
            referencedRelation: "monthly_financials"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_user_company_id: {
        Args: { user_id: string }
        Returns: string
      }
      increment_view_count: {
        Args: { row_id: string }
        Returns: number
      }
    }
    Enums: {
      app_role: "admin"
      subscription_plan_type: "basic" | "premium" | "enterprise"
      subscription_status: "active" | "inactive" | "cancelled" | "past_due"
      user_role: "admin" | "client"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin"],
      subscription_plan_type: ["basic", "premium", "enterprise"],
      subscription_status: ["active", "inactive", "cancelled", "past_due"],
      user_role: ["admin", "client"],
    },
  },
} as const
