// Manually-maintained types for the secondary Supabase project (pedidos).
// Adjust column names here if the real schema differs.

export interface Empresa {
  id: string;
  nome?: string | null;
  created_at?: string | null;
}

export interface Fornecedor {
  id: string;
  nome?: string | null;
  empresa_id?: string | null;
  created_at?: string | null;
}

export interface Produto {
  id: string;
  nome?: string | null;
  fornecedor_id?: string | null;
  preco?: number | null;
  unidade?: string | null;
  created_at?: string | null;
}

export interface Pedido {
  id: string;
  fornecedor_id?: string | null;
  empresa_id?: string | null;
  observacao?: string | null;
  created_at?: string | null;
}

export interface PedidoItem {
  id: string;
  pedido_id: string;
  produto_id: string;
  quantidade: number;
  created_at?: string | null;
}

export type OrdersDatabase = {
  public: {
    Tables: {
      empresas: { Row: Empresa; Insert: Partial<Empresa>; Update: Partial<Empresa> };
      Fornecedores: { Row: Fornecedor; Insert: Partial<Fornecedor>; Update: Partial<Fornecedor> };
      produtos: { Row: Produto; Insert: Partial<Produto>; Update: Partial<Produto> };
      pedidos: { Row: Pedido; Insert: Partial<Pedido>; Update: Partial<Pedido> };
      pedido_itens: { Row: PedidoItem; Insert: Partial<PedidoItem>; Update: Partial<PedidoItem> };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};