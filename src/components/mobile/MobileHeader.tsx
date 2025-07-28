import React from 'react';
import { Button } from "@/components/ui/button";
import { LogOut, User, Menu, X } from "lucide-react";
import { useAuth } from '@/components/AuthContext';

interface MobileHeaderProps {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
  userName: string;
  establishmentName: string;
  onSignOut: () => void;
}

export const MobileHeader: React.FC<MobileHeaderProps> = ({
  isMobileMenuOpen,
  setIsMobileMenuOpen,
  userName,
  establishmentName,
  onSignOut
}) => {
  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border h-14 flex items-center justify-between px-4 lg:hidden">
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="h-9 w-9"
        >
          {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
        <h1 className="font-semibold text-lg text-foreground truncate max-w-40">{establishmentName}</h1>
      </div>
      
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2">
          <User className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-foreground truncate max-w-24">{userName}</span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={onSignOut}
          className="h-9 w-9"
        >
          <LogOut className="h-4 w-4" />
        </Button>
      </div>
    </header>
  );
};