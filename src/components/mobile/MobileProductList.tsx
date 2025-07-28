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
      <div className="sticky top-16 z-40 bg-gradient-warm backdrop-blur-md border-b border-border/50 p-4 shadow-card">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="h-10 w-10 rounded-xl hover:bg-primary/10 transition-all duration-300"
          >
            <ArrowLeft className="h-5 w-5 text-primary" />
          </Button>
          <div className="flex-1">
            <h2 className="font-bold text-xl text-foreground">{supplier.name}</h2>
            <p className="text-sm text-primary/80 font-medium">{supplier.products.length} produtos</p>
          </div>
        </div>
      </div>

      {/* Products List */}
      <div className="flex-1 p-4 space-y-4 pb-24">
        {supplier.products.map((product, index) => (
          <Card key={product.id} className="w-full animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
            <CardContent className="p-5">
              <div className="flex flex-col gap-4">
                {/* Product Name */}
                <div className="flex items-start justify-between">
                  <h3 className="font-semibold text-foreground text-base leading-tight flex-1 pr-2">
                    {product.name}
                  </h3>
                  {product.unit && (
                    <Badge variant="outline" className="text-xs shrink-0 px-3 py-1 rounded-full bg-primary/10 text-primary border-primary/20">
                      {product.unit}
                    </Badge>
                  )}
                </div>

                {/* Stock Controls */}
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <span className="text-sm font-medium text-foreground">Estoque:</span>
                  <div className="flex items-center gap-3">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-9 w-9 rounded-xl touch-target"
                      onClick={() => onUpdateStock(product.id, Math.max(0, product.currentStock - 1))}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="text-base font-bold min-w-10 text-center bg-card rounded-lg px-3 py-1">
                      {product.currentStock}
                    </span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-9 w-9 rounded-xl touch-target"
                      onClick={() => onUpdateStock(product.id, product.currentStock + 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Order Controls */}
                <div className="flex items-center justify-between p-3 rounded-lg bg-success/10">
                  <span className="text-sm font-medium text-success">Pedido:</span>
                  <div className="flex items-center gap-3">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-9 w-9 rounded-xl touch-target border-success/30 hover:bg-success/10"
                      onClick={() => onUpdateOrderQuantity(product.id, Math.max(0, product.orderQuantity - 1))}
                    >
                      <Minus className="h-4 w-4 text-success" />
                    </Button>
                    <span className="text-base font-bold min-w-10 text-center bg-success/20 text-success rounded-lg px-3 py-1">
                      {product.orderQuantity}
                    </span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-9 w-9 rounded-xl touch-target border-success/30 hover:bg-success/10"
                      onClick={() => onUpdateOrderQuantity(product.id, product.orderQuantity + 1)}
                    >
                      <Plus className="h-4 w-4 text-success" />
                    </Button>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-1">
                  <Button
                    variant="outline"
                    size="touch"
                    onClick={() => onEditProduct(product)}
                    className="flex-1 rounded-xl"
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Editar
                  </Button>
                  <Button
                    variant="outline"
                    size="touch"
                    onClick={() => onDeleteProduct(product.id)}
                    className="px-4 text-destructive hover:text-destructive hover:border-destructive/50 rounded-xl"
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
        <div className="fixed bottom-4 left-4 right-4 lg:hidden z-50">
          <Button
            variant="success"
            onClick={onDownloadOrder}
            className="w-full h-14 text-base font-bold shadow-elevated rounded-2xl animate-bounce-gentle bg-gradient-to-r from-success to-success/80"
            size="touch"
          >
            <ShoppingCart className="h-5 w-5 mr-3" />
            Fazer Pedido ({totalOrderQuantity} itens)
          </Button>
        </div>
      )}
    </div>
  );
};