import { useEffect, useState } from 'react';
import { checkOrdersConnection } from '@/lib/orders-db';
import { cn } from '@/lib/utils';

type Status = 'loading' | 'ok' | 'error';

/**
 * Discreet indicator showing whether the secondary Supabase project
 * (banco de pedidos) is reachable from the browser.
 */
export function OrdersDbStatus({ className }: { className?: string }) {
  const [status, setStatus] = useState<Status>('loading');
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    let mounted = true;
    checkOrdersConnection().then((res) => {
      if (!mounted) return;
      if (res.ok) {
        setStatus('ok');
        setMessage('Banco de pedidos conectado');
      } else {
        setStatus('error');
        setMessage(res.error ?? 'Falha ao conectar');
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

  const dot =
    status === 'ok'
      ? 'bg-emerald-500'
      : status === 'error'
        ? 'bg-red-500'
        : 'bg-muted-foreground/50 animate-pulse';

  const label =
    status === 'ok'
      ? 'Pedidos: online'
      : status === 'error'
        ? 'Pedidos: offline'
        : 'Pedidos: …';

  return (
    <div
      className={cn(
        'flex items-center gap-2 text-xs text-muted-foreground',
        className,
      )}
      title={message}
    >
      <span className={cn('h-2 w-2 rounded-full', dot)} />
      <span>{label}</span>
    </div>
  );
}