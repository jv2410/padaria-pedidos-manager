# Configuração do Sistema Admin

## ⚠️ IMPORTANTE - Configurar Email do Criador

Para você ter acesso completo e gratuito como criador da plataforma, você precisa alterar o email de admin no código:

### Passo a Passo:

1. **Abra o arquivo:** `supabase/functions/check-subscription/index.ts`

2. **Encontre a linha 51:**
```typescript
const adminEmails = ["seu-email@exemplo.com"]; // TODO: Replace with your actual email
```

3. **Substitua** `seu-email@exemplo.com` pelo **seu email real**:
```typescript
const adminEmails = ["seu-email-real@gmail.com"]; // Coloque seu email aqui
```

4. **Salve o arquivo** - As mudanças serão aplicadas automaticamente!

## ✅ Funcionalidades Implementadas

### 🎁 Trial de 7 Dias Grátis
- **Novos usuários**: Recebem 7 dias grátis automaticamente
- **Sem necessidade de cartão**: Trial funciona sem cobrança
- **Conversão automática**: Após 7 dias, se torna assinatura paga

### 👑 Acesso de Admin (Criador)
- **Acesso permanente**: Sem cobrança para o criador
- **Identificação visual**: Badge especial "Acesso Criador" 
- **Funcionalidades completas**: Todos os recursos disponíveis

### 🔄 Sistema de Verificação
- **Auto-verificação**: Status atualizado automaticamente no login
- **Botão manual**: "Atualizar Status" para forçar verificação
- **Suporte a trial**: Detecta e mostra dias restantes do trial

### 💳 Gestão de Assinatura
- **Portal do cliente**: Acesso direto ao Stripe para gerenciar assinatura
- **Informações claras**: Status, plano e vencimento visíveis
- **Controle completo**: Cancelar, alterar método de pagamento, etc.

## 🎯 Como Funciona

### Para Usuários Novos:
1. Se cadastram na plataforma
2. Fazem checkout → Ganham 7 dias grátis
3. Após 7 dias → Cobrança automática de R$ 39,00/mês

### Para Você (Criador):
1. Faça login com seu email configurado
2. Sistema detecta automaticamente que é admin
3. Acesso completo e permanente, sem cobrança

### Para Usuários Existentes:
1. Sistema verifica status no Stripe
2. Mostra informações de assinatura atualizadas
3. Permite gerenciar via Portal do Cliente

## 🚀 Pronto para Usar!

Após configurar seu email de admin, o sistema está **100% funcional** com:
- ✅ Trial de 7 dias para novos usuários
- ✅ Acesso gratuito permanente para você
- ✅ Cobrança automática R$ 39,00/mês após trial
- ✅ Interface clara mostrando status e dias restantes
- ✅ Gestão completa via Stripe Portal

**Importante**: Lembre-se de ter configurado sua chave secreta do Stripe nas configurações do projeto!