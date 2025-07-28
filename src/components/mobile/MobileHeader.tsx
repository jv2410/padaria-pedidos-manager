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
    <header className="sticky top-0 z-50 bg-gradient-warm backdrop-blur-md border-b border-border/50 h-16 flex items-center justify-between px-4 lg:hidden shadow-card">
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="h-10 w-10 rounded-xl hover:bg-primary/10 transition-all duration-300"
        >
          {isMobileMenuOpen ? <X className="h-5 w-5 text-primary" /> : <Menu className="h-5 w-5 text-primary" />}
        </Button>
        <h1 className="font-bold text-xl text-foreground truncate max-w-40 bg-gradient-primary bg-clip-text text-transparent">{establishmentName}</h1>
      </div>
      
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 bg-card/80 rounded-xl px-3 py-2 backdrop-blur-sm">
          <User className="h-4 w-4 text-primary" />
          <span className="text-sm font-medium text-foreground truncate max-w-24">{userName}</span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={onSignOut}
          className="h-10 w-10 rounded-xl hover:bg-destructive/10 hover:text-destructive transition-all duration-300"
        >
          <LogOut className="h-4 w-4" />
        </Button>
      </div>
    </header>
  );
};