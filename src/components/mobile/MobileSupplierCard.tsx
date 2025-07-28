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
    <Card className="w-full hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex flex-col gap-3">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-lg text-foreground truncate flex-1">
              {supplier.name}
            </h3>
            <Badge variant="secondary" className="text-xs">
              {totalProducts} produtos
            </Badge>
          </div>

          {/* Order Info */}
          {totalOrderQuantity > 0 && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <ShoppingCart className="h-4 w-4" />
              <span>{totalOrderQuantity} itens no pedido</span>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onViewProducts(supplier)}
              className="flex-1"
            >
              <Package className="h-4 w-4 mr-2" />
              Ver Produtos
            </Button>
            
            {totalOrderQuantity > 0 && (
              <Button
                variant="default"
                size="sm"
                onClick={() => onDownloadOrder(supplier)}
                className="px-3"
              >
                <ShoppingCart className="h-4 w-4" />
              </Button>
            )}
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEditSupplier(supplier)}
              className="px-3"
            >
              <Edit className="h-4 w-4" />
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDeleteSupplier(supplier.id)}
              className="px-3 text-destructive hover:text-destructive"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};