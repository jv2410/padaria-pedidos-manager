import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Package, DollarSign } from "lucide-react";
import { format } from "date-fns";

interface PurchaseHistory {
  id: string;
  supplierId: string;
  supplierName: string;
  date: string;
  products: Array<{
    name: string;
    quantity: number;
    stock: number;
    price?: number;
    unit?: 'UNIDADE' | 'FARDO' | 'CAIXA';
  }>;
  total: number;
}

interface MobileHistoryListProps {
  history: PurchaseHistory[];
}

export const MobileHistoryList: React.FC<MobileHistoryListProps> = ({ history }) => {
  if (history.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
        <Package className="h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="text-lg font-medium text-foreground mb-2">
          Nenhum histórico encontrado
        </h3>
        <p className="text-muted-foreground">
          Seus pedidos aparecerão aqui após serem realizados.
        </p>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4">
      {history.map((order) => (
        <Card key={order.id} className="w-full">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <CardTitle className="text-base font-semibold text-foreground">
                  {order.supplierName}
                </CardTitle>
                <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  {format(new Date(order.date), 'dd/MM/yyyy HH:mm')}
                </div>
              </div>
              {order.total > 0 && (
                <Badge variant="secondary" className="ml-2">
                  <DollarSign className="h-3 w-3 mr-1" />
                  {order.total.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                  })}
                </Badge>
              )}
            </div>
          </CardHeader>
          
          <CardContent className="pt-0">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                <Package className="h-4 w-4" />
                <span>{order.products.length} produtos pedidos</span>
              </div>
              
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {order.products.map((product, index) => (
                  <div key={index} className="flex items-center justify-between text-sm">
                    <span className="text-foreground truncate flex-1 pr-2">
                      {product.name}
                    </span>
                    <div className="flex items-center gap-2 shrink-0">
                      <Badge variant="outline" className="text-xs">
                        {product.quantity} {product.unit || 'UN'}
                      </Badge>
                      {product.price && (
                        <span className="text-muted-foreground text-xs">
                          {(product.quantity * product.price).toLocaleString('pt-BR', {
                            style: 'currency',
                            currency: 'BRL'
                          })}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};