import React from 'react';
import { Button } from "@/components/ui/button";
import { Package, History, Settings, CreditCard, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";

interface MobileNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  isOpen: boolean;
  subscriptionInfo: {
    tier: string;
    status: string;
    expiresAt: string | null;
  };
  onManageSubscription: () => void;
  onRefreshData: () => void;
}

export const MobileNavigation: React.FC<MobileNavigationProps> = ({
  activeTab,
  onTabChange,
  isOpen,
  subscriptionInfo,
  onManageSubscription,
  onRefreshData
}) => {
  if (!isOpen) return null;

  const navItems = [
    { id: 'suppliers', label: 'Fornecedores', icon: Package },
    { id: 'history', label: 'Histórico', icon: History },
  ];

  return (
    <div className="fixed inset-0 top-14 z-40 bg-background lg:hidden">
      <div className="flex flex-col h-full">
        {/* Navigation Items */}
        <div className="flex-1 p-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Button
                key={item.id}
                variant={activeTab === item.id ? "default" : "ghost"}
                className={cn(
                  "w-full justify-start h-12 text-base",
                  activeTab === item.id && "bg-primary text-primary-foreground"
                )}
                onClick={() => onTabChange(item.id)}
              >
                <Icon className="h-5 w-5 mr-3" />
                {item.label}
              </Button>
            );
          })}
        </div>

        {/* Subscription Section */}
        <div className="border-t border-border p-4 space-y-3">
          <div className="text-sm">
            <div className="font-medium text-foreground">Plano Atual</div>
            <div className="text-muted-foreground">
              {subscriptionInfo.tier} - {subscriptionInfo.status}
            </div>
          </div>
          
          <div className="space-y-2">
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={onManageSubscription}
            >
              <CreditCard className="h-4 w-4 mr-2" />
              Gerenciar Assinatura
            </Button>
            
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={onRefreshData}
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Atualizar Dados
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};