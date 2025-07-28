import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Minus, Plus, ArrowLeft, ShoppingCart, Edit, Trash2 } from "lucide-react";

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

interface MobileProductListProps {
  supplier: Supplier;
  onBack: () => void;
  onUpdateStock: (productId: string, newStock: number) => void;
  onUpdateOrderQuantity: (productId: string, newQuantity: number) => void;
  onEditProduct: (product: Product) => void;
  onDeleteProduct: (productId: string) => void;
  onDownloadOrder: () => void;
}

export const MobileProductList: React.FC<MobileProductListProps> = ({
  supplier,
  onBack,
  onUpdateStock,
  onUpdateOrderQuantity,
  onEditProduct,
  onDeleteProduct,
  onDownloadOrder
}) => {
  const totalOrderQuantity = supplier.products.reduce((sum, product) => sum + product.orderQuantity, 0);

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="sticky top-14 z-40 bg-background border-b border-border p-4">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="h-9 w-9"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex-1">
            <h2 className="font-semibold text-lg text-foreground">{supplier.name}</h2>
            <p className="text-sm text-muted-foreground">{supplier.products.length} produtos</p>
          </div>
        </div>
      </div>

      {/* Products List */}
      <div className="flex-1 p-4 space-y-3 pb-20">
        {supplier.products.map((product) => (
          <Card key={product.id} className="w-full">
            <CardContent className="p-4">
              <div className="flex flex-col gap-3">
                {/* Product Name */}
                <div className="flex items-start justify-between">
                  <h3 className="font-medium text-foreground text-sm leading-tight flex-1 pr-2">
                    {product.name}
                  </h3>
                  {product.unit && (
                    <Badge variant="outline" className="text-xs shrink-0">
                      {product.unit}
                    </Badge>
                  )}
                </div>

                {/* Stock Controls */}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Estoque:</span>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => onUpdateStock(product.id, Math.max(0, product.currentStock - 1))}
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="text-sm font-medium min-w-8 text-center">
                      {product.currentStock}
                    </span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => onUpdateStock(product.id, product.currentStock + 1)}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                </div>

                {/* Order Controls */}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Pedido:</span>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => onUpdateOrderQuantity(product.id, Math.max(0, product.orderQuantity - 1))}
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="text-sm font-medium min-w-8 text-center text-primary">
                      {product.orderQuantity}
                    </span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => onUpdateOrderQuantity(product.id, product.orderQuantity + 1)}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onEditProduct(product)}
                    className="flex-1"
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Editar
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDeleteProduct(product.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Floating Action Button */}
      {totalOrderQuantity > 0 && (
        <div className="fixed bottom-4 left-4 right-4 lg:hidden">
          <Button
            onClick={onDownloadOrder}
            className="w-full h-12 text-base font-medium shadow-lg"
            size="lg"
          >
            <ShoppingCart className="h-5 w-5 mr-2" />
            Fazer Pedido ({totalOrderQuantity} itens)
          </Button>
        </div>
      )}
    </div>
  );
};