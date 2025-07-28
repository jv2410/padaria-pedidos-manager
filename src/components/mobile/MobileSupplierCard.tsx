import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Package, ShoppingCart, Edit, Trash2 } from "lucide-react";

interface Product {
  id: string;
  name: string;
  currentStock: number;
  orderQuantity: number;
  price?: number;
  unit?: 'UNIDADE' | 'FARDO' | 'CAIXA';
}

interface Supplier {
  id: string;
  name: string;
  products: Product[];
}

interface MobileSupplierCardProps {
  supplier: Supplier;
  onViewProducts: (supplier: Supplier) => void;
  onEditSupplier: (supplier: Supplier) => void;
  onDeleteSupplier: (supplierId: string) => void;
  onDownloadOrder: (supplier: Supplier) => void;
}

export const MobileSupplierCard: React.FC<MobileSupplierCardProps> = ({
  supplier,
  onViewProducts,
  onEditSupplier,
  onDeleteSupplier,
  onDownloadOrder
}) => {
  const totalProducts = supplier.products.length;
  const totalOrderQuantity = supplier.products.reduce((sum, product) => sum + product.orderQuantity, 0);

  return (
    <Card className="w-full animate-slide-up">
      <CardContent className="p-5">
        <div className="flex flex-col gap-4">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-xl text-foreground truncate flex-1">
              {supplier.name}
            </h3>
            <Badge variant="secondary" className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary border-primary/20">
              {totalProducts} produtos
            </Badge>
          </div>

          {/* Order Info */}
          {totalOrderQuantity > 0 && (
            <div className="flex items-center gap-2 p-3 rounded-lg bg-success/10 border border-success/20">
              <ShoppingCart className="h-4 w-4 text-success" />
              <span className="text-sm font-medium text-success">{totalOrderQuantity} itens no pedido</span>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-2">
            <Button
              variant="warm"
              size="touch"
              onClick={() => onViewProducts(supplier)}
              className="flex-1 rounded-xl"
            >
              <Package className="h-4 w-4 mr-2" />
              Ver Produtos
            </Button>
            
            {totalOrderQuantity > 0 && (
              <Button
                variant="success"
                size="touch"
                onClick={() => onDownloadOrder(supplier)}
                className="px-4 rounded-xl"
              >
                <ShoppingCart className="h-4 w-4" />
              </Button>
            )}
            
            <Button
              variant="outline"
              size="touch"
              onClick={() => onEditSupplier(supplier)}
              className="px-4 rounded-xl"
            >
              <Edit className="h-4 w-4" />
            </Button>
            
            <Button
              variant="outline"
              size="touch"
              onClick={() => onDeleteSupplier(supplier.id)}
              className="px-4 text-destructive hover:text-destructive hover:border-destructive/50 rounded-xl"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};