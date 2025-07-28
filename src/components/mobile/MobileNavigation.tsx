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
    <div className="fixed inset-0 top-16 z-40 bg-gradient-warm backdrop-blur-sm lg:hidden animate-slide-up">
      <div className="flex flex-col h-full">
        {/* Navigation Items */}
        <div className="flex-1 p-6 space-y-3">
          {navItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <Button
                key={item.id}
                variant={activeTab === item.id ? "warm" : "ghost"}
                className={cn(
                  "w-full justify-start h-14 text-lg font-medium rounded-2xl transition-all duration-300 animate-slide-up touch-target",
                  activeTab === item.id && "shadow-elevated"
                )}
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => onTabChange(item.id)}
              >
                <Icon className="h-6 w-6 mr-4" />
                {item.label}
              </Button>
            );
          })}
        </div>

        {/* Subscription Section */}
        <div className="border-t border-border/50 p-6 space-y-4 bg-card/50 backdrop-blur-sm rounded-t-3xl">
          <div className="p-4 rounded-2xl bg-primary/10 border border-primary/20">
            <div className="font-semibold text-foreground text-base">Plano Atual</div>
            <div className="text-primary font-medium">
              {subscriptionInfo.tier} - {subscriptionInfo.status}
            </div>
          </div>
          
          <div className="space-y-3">
            <Button
              variant="outline"
              className="w-full justify-start h-12 rounded-xl touch-target"
              onClick={onManageSubscription}
            >
              <CreditCard className="h-5 w-5 mr-3" />
              Gerenciar Assinatura
            </Button>
            
            <Button
              variant="outline"
              className="w-full justify-start h-12 rounded-xl touch-target"
              onClick={onRefreshData}
            >
              <RefreshCw className="h-5 w-5 mr-3" />
              Atualizar Dados
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};