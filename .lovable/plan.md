
## Objetivo

Conectar o app a um **segundo projeto Supabase** (`udeibydlmuuoecxfyxjt`) exclusivamente para gravar e ler **pedidos**, **itens de pedido**, **fornecedores**, **produtos** e **empresas** dessas tabelas novas. O Supabase atual (`fmfbfykdzvqionrsiwjv`) continua responsável por login/auth e assinaturas Stripe.

## Tabelas detectadas no novo projeto

Pela tela enviada:
- `empresas`
- `Fornecedores` (com F maiúsculo — atenção)
- `produtos`
- `pedidos`
- `pedido_itens` (id, pedido_id, produto_id, quantidade, ...)

Vou assumir colunas comuns (`id uuid`, `created_at`, `nome`, FKs por `_id`). Se algum campo for diferente, ajusto depois — não vou alterar o schema do seu banco.

## Passos de implementação

### 1. Segundo cliente Supabase
- Criar `src/integrations/orders-supabase/client.ts` com `createClient` apontando para o novo projeto.
- Adicionar ao `.env`:
  - `VITE_ORDERS_SUPABASE_URL=https://udeibydlmuuoecxfyxjt.supabase.co`
  - `VITE_ORDERS_SUPABASE_ANON_KEY=<anon key fornecida>`
- Sem `persistSession` (o login fica só no Supabase principal).

### 2. Tipos manuais
- Criar `src/integrations/orders-supabase/types.ts` com tipos TS para `empresas`, `Fornecedores`, `produtos`, `pedidos`, `pedido_itens`.

### 3. Camada de dados
- Criar `src/lib/orders-db.ts` com funções:
  - `listFornecedores()`, `createFornecedor()`, `deleteFornecedor()`
  - `listProdutos()`, `createProduto()`, `updateProduto()`, `deleteProduto()`
  - `listPedidos()`, `createPedido(itens)`, `deletePedido()`
- Usar `.maybeSingle()` quando esperar 0 ou 1 linha.
- Mostrar toast em caso de erro.

### 4. Integração na UI (`src/pages/Index.tsx`)
- Carregar fornecedores/produtos do novo Supabase em `useEffect`.
- Botão "Salvar pedido" grava em `pedidos` + `pedido_itens` numa transação lógica (insert pedido → insert itens com `pedido_id`).
- Mantém todo o resto da página intacto (visual, fluxo, Stripe, login).

### 5. Tela de teste
- Adicionar um indicador discreto no dashboard ("Conectado ao banco de pedidos ✓/✗") chamando uma query leve para validar a conexão.

## O que você precisa fazer no Supabase novo (importante)

Para que as gravações funcionem do frontend com a anon key, **uma das duas**:

**Opção A — público (mais simples, menos seguro):** ativar políticas RLS abertas para `anon`:
```sql
alter table public.pedidos enable row level security;
create policy "anon all" on public.pedidos for all to anon using (true) with check (true);
-- repetir para pedido_itens, "Fornecedores", produtos, empresas
```

**Opção B — autenticado:** criar usuários no novo Supabase também e logar lá em paralelo. Mais trabalhoso; só recomendo se for multi-tenant.

Me confirme qual opção quer. Por padrão sigo com a **Opção A** (já que é um app interno seu) e te aviso para rodar o SQL.

## O que NÃO muda
- Login, cadastro, Stripe, fornecedores/produtos antigos no Supabase principal.
- Nenhum dado é migrado entre projetos.

## Próximo passo após aprovar
1. Você confirma se as colunas das tabelas são as padrão (ou cola o schema).
2. Você escolhe Opção A ou B de RLS.
3. Eu implemento os itens 1–5 acima.
