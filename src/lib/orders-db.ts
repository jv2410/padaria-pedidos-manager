import { ordersSupabase } from '@/integrations/orders-supabase/client';
import type {
  Empresa,
  Fornecedor,
  Pedido,
  PedidoItem,
  Produto,
} from '@/integrations/orders-supabase/types';

// ---------- Fornecedores ----------
export async function listFornecedores(): Promise<Fornecedor[]> {
  const { data, error } = await ordersSupabase
    .from('Fornecedores')
    .select('*')
    .order('nome', { ascending: true });
  if (error) throw error;
  return (data ?? []) as Fornecedor[];
}

export async function createFornecedor(input: Partial<Fornecedor>) {
  const { data, error } = await ordersSupabase
    .from('Fornecedores')
    .insert(input)
    .select()
    .maybeSingle();
  if (error) throw error;
  return data as Fornecedor | null;
}

export async function deleteFornecedor(id: string) {
  const { error } = await ordersSupabase.from('Fornecedores').delete().eq('id', id);
  if (error) throw error;
}

// ---------- Produtos ----------
export async function listProdutos(): Promise<Produto[]> {
  const { data, error } = await ordersSupabase
    .from('produtos')
    .select('*')
    .order('nome', { ascending: true });
  if (error) throw error;
  return (data ?? []) as Produto[];
}

export async function createProduto(input: Partial<Produto>) {
  const { data, error } = await ordersSupabase
    .from('produtos')
    .insert(input)
    .select()
    .maybeSingle();
  if (error) throw error;
  return data as Produto | null;
}

export async function updateProduto(id: string, input: Partial<Produto>) {
  const { data, error } = await ordersSupabase
    .from('produtos')
    .update(input)
    .eq('id', id)
    .select()
    .maybeSingle();
  if (error) throw error;
  return data as Produto | null;
}

export async function deleteProduto(id: string) {
  const { error } = await ordersSupabase.from('produtos').delete().eq('id', id);
  if (error) throw error;
}

// ---------- Empresas ----------
export async function listEmpresas(): Promise<Empresa[]> {
  const { data, error } = await ordersSupabase.from('empresas').select('*');
  if (error) throw error;
  return (data ?? []) as Empresa[];
}

// ---------- Pedidos ----------
export interface NovoPedidoItem {
  produto_id: string;
  quantidade: number;
}

export async function listPedidos(): Promise<Pedido[]> {
  const { data, error } = await ordersSupabase
    .from('pedidos')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return (data ?? []) as Pedido[];
}

export async function createPedido(
  pedido: Partial<Pedido>,
  itens: NovoPedidoItem[],
): Promise<Pedido> {
  const { data: created, error: pedidoError } = await ordersSupabase
    .from('pedidos')
    .insert(pedido)
    .select()
    .maybeSingle();
  if (pedidoError) throw pedidoError;
  if (!created) throw new Error('Falha ao criar pedido (sem retorno).');

  if (itens.length > 0) {
    const payload = itens.map((i) => ({
      pedido_id: created.id,
      produto_id: i.produto_id,
      quantidade: i.quantidade,
    }));
    const { error: itensError } = await ordersSupabase
      .from('pedido_itens')
      .insert(payload);
    if (itensError) throw itensError;
  }

  return created as Pedido;
}

export async function deletePedido(id: string) {
  // Apaga itens primeiro caso não exista cascade
  await ordersSupabase.from('pedido_itens').delete().eq('pedido_id', id);
  const { error } = await ordersSupabase.from('pedidos').delete().eq('id', id);
  if (error) throw error;
}

export async function listItensDoPedido(pedidoId: string): Promise<PedidoItem[]> {
  const { data, error } = await ordersSupabase
    .from('pedido_itens')
    .select('*')
    .eq('pedido_id', pedidoId);
  if (error) throw error;
  return (data ?? []) as PedidoItem[];
}

// ---------- Health check ----------
export async function checkOrdersConnection(): Promise<{ ok: boolean; error?: string }> {
  try {
    const { error } = await ordersSupabase
      .from('pedidos')
      .select('id', { count: 'exact', head: true });
    if (error) return { ok: false, error: error.message };
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : String(e) };
  }
}