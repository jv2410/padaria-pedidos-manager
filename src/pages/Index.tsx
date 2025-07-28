import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Plus, Edit, Trash2, Package, ShoppingCart, FileDown, History, CalendarIcon, LogOut, User, CreditCard, Settings, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import jsPDF from 'jspdf';
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useAuth } from '@/components/AuthContext';
import { supabase } from '@/integrations/supabase/client';

interface Product {
  id: string;
  name: string;
  currentStock: number;
  orderQuantity: number;
  price?: number;
  unit?: 'UNIDADE' | 'FARDO' | 'CAIXA';
}

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

interface Supplier {
  id: string;
  name: string;
  products: Product[];
}

const initialSuppliers: Supplier[] = [
  {
    id: '1',
    name: 'CIERS',
    products: [
      { id: '1-1', name: 'RICCA FOLHADA', currentStock: 0, orderQuantity: 0 },
      { id: '1-2', name: 'BARRA AO LEITE', currentStock: 0, orderQuantity: 0 },
      { id: '1-3', name: 'BARRA MARFIM', currentStock: 0, orderQuantity: 0 },
      { id: '1-4', name: 'BRÓCOLIS CACAU', currentStock: 0, orderQuantity: 0 },
      { id: '1-5', name: 'CALDO GALINHA', currentStock: 0, orderQuantity: 0 },
      { id: '1-6', name: 'CEREJA', currentStock: 0, orderQuantity: 0 },
      { id: '1-7', name: 'CHANTILLY', currentStock: 0, orderQuantity: 0 },
      { id: '1-8', name: 'CHOCOLATE FORNEÁVEL', currentStock: 0, orderQuantity: 0 },
      { id: '1-9', name: 'CHOCOLATE FRACIONADO BRANCO', currentStock: 0, orderQuantity: 0 },
      { id: '1-10', name: 'CHOCOLATE FRACIONADO PRETO', currentStock: 0, orderQuantity: 0 },
      { id: '1-11', name: 'CHOCOLATE EM PÓ', currentStock: 0, orderQuantity: 0 },
      { id: '1-12', name: 'CREME DE CONFEITEIRO', currentStock: 0, orderQuantity: 0 },
      { id: '1-13', name: 'GELEIA NEUTRA', currentStock: 0, orderQuantity: 0 },
      { id: '1-14', name: 'GORDURA VEGETAL', currentStock: 0, orderQuantity: 0 },
      { id: '1-15', name: 'GOTAS DE CHOCOLATE', currentStock: 0, orderQuantity: 0 },
      { id: '1-16', name: 'GRANULADO', currentStock: 0, orderQuantity: 0 },
      { id: '1-17', name: 'BALDE DE PISTACHE', currentStock: 0, orderQuantity: 0 },
      { id: '1-18', name: 'NUTELLA', currentStock: 0, orderQuantity: 0 },
      { id: '1-19', name: 'NEGRESCO', currentStock: 0, orderQuantity: 0 },
      { id: '1-20', name: 'RICCA MASSA', currentStock: 0, orderQuantity: 0 },
      { id: '1-21', name: 'CHIPA', currentStock: 0, orderQuantity: 0 },
      { id: '1-22', name: 'GANACHE', currentStock: 0, orderQuantity: 0 },
      { id: '1-23', name: 'MANGA CONFEITEIRO', currentStock: 0, orderQuantity: 0 },
      { id: '1-24', name: 'ESSÊNCIA DE BAUNILHA', currentStock: 0, orderQuantity: 0 },
      { id: '1-25', name: 'AÇÚCAR BAUNILHA', currentStock: 0, orderQuantity: 0 },
      { id: '1-26', name: 'AÇÚCAR DE CONFEITEIRO', currentStock: 0, orderQuantity: 0 },
      { id: '1-27', name: 'BISTURI', currentStock: 0, orderQuantity: 0 },
      { id: '1-28', name: 'CANELA EM PÓ', currentStock: 0, orderQuantity: 0 },
      { id: '1-29', name: 'COCO SECO', currentStock: 0, orderQuantity: 0 },
      { id: '1-30', name: 'COCO FRESCO', currentStock: 0, orderQuantity: 0 },
      { id: '1-31', name: 'EMUSTAB', currentStock: 0, orderQuantity: 0 },
      { id: '1-32', name: 'ERVA DOCE', currentStock: 0, orderQuantity: 0 },
      { id: '1-33', name: 'ESSÊNCIA DE LARANJA', currentStock: 0, orderQuantity: 0 },
      { id: '1-34', name: 'NOZES', currentStock: 0, orderQuantity: 0 },
      { id: '1-35', name: 'PISTACHE', currentStock: 0, orderQuantity: 0 },
      { id: '1-36', name: 'AVELÃ', currentStock: 0, orderQuantity: 0 },
      { id: '1-37', name: 'FONDANT', currentStock: 0, orderQuantity: 0 },
      { id: '1-38', name: 'GERGELIM', currentStock: 0, orderQuantity: 0 },
      { id: '1-39', name: 'GLICOSE', currentStock: 0, orderQuantity: 0 },
      { id: '1-40', name: 'GOIABADA TABLETE', currentStock: 0, orderQuantity: 0 },
      { id: '1-41', name: 'LUVAS DE FORNO', currentStock: 0, orderQuantity: 0 },
      { id: '1-42', name: 'MAISENA', currentStock: 0, orderQuantity: 0 },
      { id: '1-43', name: 'MISTURA MUFFINS', currentStock: 0, orderQuantity: 0 },
      { id: '1-44', name: 'ORÉGANO', currentStock: 0, orderQuantity: 0 },
      { id: '1-45', name: 'CHOCO GIROS', currentStock: 0, orderQuantity: 0 },
      { id: '1-46', name: 'POLPA DE ABACAXI', currentStock: 0, orderQuantity: 0 },
      { id: '1-47', name: 'AMEIXA', currentStock: 0, orderQuantity: 0 },
      { id: '1-48', name: 'SICAO BRANCO', currentStock: 0, orderQuantity: 0 },
      { id: '1-49', name: 'SICAO PRETO', currentStock: 0, orderQuantity: 0 },
      { id: '1-50', name: 'CORANTES', currentStock: 0, orderQuantity: 0 },
      { id: '1-51', name: 'CARRAGENA', currentStock: 0, orderQuantity: 0 },
      { id: '1-52', name: 'PECTINA', currentStock: 0, orderQuantity: 0 },
      { id: '1-53', name: 'GOMA DE CHANTANA', currentStock: 0, orderQuantity: 0 },
      { id: '1-54', name: 'AÇÚCAR MASCAVO', currentStock: 0, orderQuantity: 0 },
    ]
  },
  {
    id: '2',
    name: 'BOM PRINCÍPIO',
    products: [
      { id: '2-1', name: 'RECHEIO DE UVA', currentStock: 0, orderQuantity: 0 },
      { id: '2-2', name: 'DOCE DE LEITE', currentStock: 0, orderQuantity: 0 },
      { id: '2-3', name: 'ABACAXI', currentStock: 0, orderQuantity: 0 },
      { id: '2-4', name: 'LEITE CONDENSADO', currentStock: 0, orderQuantity: 0 },
      { id: '2-5', name: 'DAMASCO', currentStock: 0, orderQuantity: 0 },
      { id: '2-6', name: 'MORANGO', currentStock: 0, orderQuantity: 0 },
      { id: '2-7', name: 'FRUTAS VERMELHAS', currentStock: 0, orderQuantity: 0 },
    ]
  },
  {
    id: '3',
    name: 'NESTLÉ',
    products: [
      { id: '3-1', name: 'LEITE CONDENSADO BASE', currentStock: 0, orderQuantity: 0 },
      { id: '3-2', name: 'BRIGADEIRO BASE', currentStock: 0, orderQuantity: 0 },
      { id: '3-3', name: 'CHOCOLATE BASE', currentStock: 0, orderQuantity: 0 },
    ]
  },
  {
    id: '4',
    name: 'ORQUÍDEA',
    products: [
      { id: '4-1', name: 'PÃO DE QUEIJO', currentStock: 0, orderQuantity: 0 },
      { id: '4-2', name: 'PÃO DE FIBRAS', currentStock: 0, orderQuantity: 0 },
      { id: '4-3', name: 'PÃO DE BATATA', currentStock: 0, orderQuantity: 0 },
      { id: '4-4', name: 'FUBÁ', currentStock: 0, orderQuantity: 0 },
      { id: '4-5', name: 'PÃO DE MANDIOQUINHA', currentStock: 0, orderQuantity: 0 },
    ]
  },
  {
    id: '5',
    name: 'JOHANN',
    products: [
      { id: '5-1', name: 'BOLO DE CHOCOLATE', currentStock: 0, orderQuantity: 0 },
      { id: '5-2', name: 'BOLO DE CENOURA', currentStock: 0, orderQuantity: 0 },
      { id: '5-3', name: 'BOLO DE MILHO', currentStock: 0, orderQuantity: 0 },
      { id: '5-4', name: 'BOLO DE LARANJA', currentStock: 0, orderQuantity: 0 },
      { id: '5-5', name: 'BOLO DE LEITE CONDENSADO', currentStock: 0, orderQuantity: 0 },
      { id: '5-6', name: 'BOLO NEUTRO', currentStock: 0, orderQuantity: 0 },
      { id: '5-7', name: 'SALSICHA 17CM', currentStock: 0, orderQuantity: 0 },
      { id: '5-8', name: 'BISCOITO MAIZENA', currentStock: 0, orderQuantity: 0 },
      { id: '5-9', name: 'PALMITO', currentStock: 0, orderQuantity: 0 },
      { id: '5-10', name: 'MAIONESE HELLMANS', currentStock: 0, orderQuantity: 0 },
      { id: '5-11', name: 'EXTRATO DE TOMATE', currentStock: 0, orderQuantity: 0 },
      { id: '5-12', name: 'AZEITE DE OLIVA', currentStock: 0, orderQuantity: 0 },
      { id: '5-13', name: 'FARINHA DE MILHO MÉDIA', currentStock: 0, orderQuantity: 0 },
      { id: '5-14', name: 'BOMBOM DESCASCADO', currentStock: 0, orderQuantity: 0 },
    ]
  },
  {
    id: '6',
    name: 'FRIMESA',
    products: [
      { id: '6-1', name: 'DOCE DE LEITE DE BALDE', currentStock: 0, orderQuantity: 0 },
    ]
  },
  {
    id: '7',
    name: 'MAXXI ATACADO',
    products: [
      { id: '7-1', name: 'ABACAXI EM CALDA', currentStock: 0, orderQuantity: 0 },
      { id: '7-2', name: 'AÇÚCAR', currentStock: 0, orderQuantity: 0 },
      { id: '7-3', name: 'AÇÚCAR CRISTAL', currentStock: 0, orderQuantity: 0 },
      { id: '7-4', name: 'MILHO LATA PEQUENA', currentStock: 0, orderQuantity: 0 },
      { id: '7-5', name: 'FARINHA DE MILHO MÉDIA', currentStock: 0, orderQuantity: 0 },
      { id: '7-6', name: 'FIGO EM CALDA', currentStock: 0, orderQuantity: 0 },
      { id: '7-7', name: 'PÊSSEGO EM CALDA', currentStock: 0, orderQuantity: 0 },
      { id: '7-8', name: 'SAL FINO', currentStock: 0, orderQuantity: 0 },
      { id: '7-9', name: 'SAL GROSSO', currentStock: 0, orderQuantity: 0 },
      { id: '7-10', name: 'VINAGRE TINTO', currentStock: 0, orderQuantity: 0 },
      { id: '7-11', name: 'CACHAÇA', currentStock: 0, orderQuantity: 0 },
    ]
  },
  {
    id: '8',
    name: 'CASA DO QUEIJO',
    products: [
      { id: '8-1', name: 'TOMATE SECO', currentStock: 0, orderQuantity: 0 },
      { id: '8-2', name: 'AZEITONAS', currentStock: 0, orderQuantity: 0 },
      { id: '8-3', name: 'QUEIJO RALADO', currentStock: 0, orderQuantity: 0 },
      { id: '8-4', name: 'RICOTA', currentStock: 0, orderQuantity: 0 },
      { id: '8-5', name: 'QUEIJO MINAS', currentStock: 0, orderQuantity: 0 },
    ]
  },
  {
    id: '9',
    name: 'MOINHO MOTASA',
    products: [
      { id: '9-1', name: 'FARINHA PRÉ', currentStock: 0, orderQuantity: 0 },
      { id: '9-2', name: 'FARINHA CONFEITARIA', currentStock: 0, orderQuantity: 0 },
    ]
  },
  {
    id: '10',
    name: 'VITA SALGADOS',
    products: [
      { id: '10-1', name: 'BOLINHA DE PALMITO', currentStock: 0, orderQuantity: 0 },
      { id: '10-2', name: 'BOLINHA DE PIZZA', currentStock: 0, orderQuantity: 0 },
      { id: '10-3', name: 'CALABRESINHA', currentStock: 0, orderQuantity: 0 },
      { id: '10-4', name: 'CROQUETE CARNE REQUEIJÃO', currentStock: 0, orderQuantity: 0 },
      { id: '10-5', name: 'CROQUETE FRANGO REQUEIJÃO', currentStock: 0, orderQuantity: 0 },
      { id: '10-6', name: 'ALMOFADINHA BRÓCOLIS', currentStock: 0, orderQuantity: 0 },
      { id: '10-7', name: 'ROSQUINHA', currentStock: 0, orderQuantity: 0 },
      { id: '10-8', name: 'MINI CHURROS', currentStock: 0, orderQuantity: 0 },
    ]
  },
  {
    id: '11',
    name: 'ITIBAN',
    products: [
      { id: '11-1', name: 'MINI PIZZA', currentStock: 0, orderQuantity: 0 },
      { id: '11-2', name: 'BOLINHO BACALHAU', currentStock: 0, orderQuantity: 0 },
      { id: '11-3', name: 'BOLINHO DE BATATA FRANGO', currentStock: 0, orderQuantity: 0 },
      { id: '11-4', name: 'BOLINHO DE BATATA COM CARNE', currentStock: 0, orderQuantity: 0 },
    ]
  },
  {
    id: '12',
    name: 'SANTA CLARA',
    products: [
      { id: '12-1', name: 'LEITE INTEGRAL', currentStock: 0, orderQuantity: 0 },
      { id: '12-2', name: 'LEITE SEMI', currentStock: 0, orderQuantity: 0 },
      { id: '12-3', name: 'LEITE DESNATADO', currentStock: 0, orderQuantity: 0 },
      { id: '12-4', name: 'LEITE ZERO', currentStock: 0, orderQuantity: 0 },
      { id: '12-5', name: 'BANHA', currentStock: 0, orderQuantity: 0 },
      { id: '12-6', name: 'NATA POTE', currentStock: 0, orderQuantity: 0 },
      { id: '12-7', name: 'CREAM CHEESE', currentStock: 0, orderQuantity: 0 },
    ]
  },
  {
    id: '13',
    name: 'SADIA',
    products: [
      { id: '13-1', name: 'PRESUNTO', currentStock: 0, orderQuantity: 0 },
      { id: '13-2', name: 'PEITO DE PERU', currentStock: 0, orderQuantity: 0 },
      { id: '13-3', name: 'PEITO DE FRANGO DEFUMADO', currentStock: 0, orderQuantity: 0 },
      { id: '13-4', name: 'SALAME ITALIANO', currentStock: 0, orderQuantity: 0 },
      { id: '13-5', name: 'BOLOGNA DEFUMADA', currentStock: 0, orderQuantity: 0 },
      { id: '13-6', name: 'MARGARINA SOFITTELLI 15KG', currentStock: 0, orderQuantity: 0 },
      { id: '13-7', name: 'MARGARINA QUALY COM SAL 250', currentStock: 0, orderQuantity: 0 },
      { id: '13-8', name: 'MARGARINA QUALY SEM SAL 250', currentStock: 0, orderQuantity: 0 },
    ]
  },
  {
    id: '14',
    name: 'AVE SERRA',
    products: [
      { id: '14-1', name: 'PEITO DE FRANGO CONGELADO', currentStock: 0, orderQuantity: 0 },
    ]
  },
  {
    id: '15',
    name: 'QUATÁ',
    products: [
      { id: '15-1', name: 'REQUEIJÃO CREMOSO BISNAGA', currentStock: 0, orderQuantity: 0 },
    ]
  },
  {
    id: '16',
    name: 'ROMENA',
    products: [
      { id: '16-1', name: 'MASSA DE PASTEL ROLO', currentStock: 0, orderQuantity: 0 },
      { id: '16-2', name: 'MASSA PIZZA BROTINHO', currentStock: 0, orderQuantity: 0 },
    ]
  },
  {
    id: '17',
    name: 'TIROLEZ',
    products: [
      { id: '17-1', name: 'CHEDDAR BISNAGA', currentStock: 0, orderQuantity: 0 },
      { id: '17-2', name: 'ÓLEO DE ALGODÃO', currentStock: 0, orderQuantity: 0 },
      { id: '17-3', name: 'QUEIJO RICOTA', currentStock: 0, orderQuantity: 0 },
    ]
  },
  {
    id: '18',
    name: 'MAJESTADE',
    products: [
      { id: '18-1', name: 'SALAME ITALIANO', currentStock: 0, orderQuantity: 0 },
    ]
  },
  {
    id: '19',
    name: 'POMERANO',
    products: [
      { id: '19-1', name: 'CALABRESA', currentStock: 0, orderQuantity: 0 },
      { id: '19-2', name: 'QUEIJO LANCHE', currentStock: 0, orderQuantity: 0 },
      { id: '19-3', name: 'QUEIJO MUSSARELA', currentStock: 0, orderQuantity: 0 },
      { id: '19-4', name: 'BALDE DE NATA', currentStock: 0, orderQuantity: 0 },
    ]
  },
  {
    id: '20',
    name: 'YEMA',
    products: [
      { id: '20-1', name: 'GORGONZOLA CREMOSO BISNAGA', currentStock: 0, orderQuantity: 0 },
    ]
  },
  {
    id: '21',
    name: 'BERSAGLIO',
    products: [
      { id: '21-1', name: 'BACON EM CUBOS', currentStock: 0, orderQuantity: 0 },
      { id: '21-2', name: 'FERMENTO SALGADO', currentStock: 0, orderQuantity: 0 },
      { id: '21-3', name: 'FERMENTO DOCE', currentStock: 0, orderQuantity: 0 },
      { id: '21-4', name: 'FERMENTO QUÍMICO', currentStock: 0, orderQuantity: 0 },
      { id: '21-5', name: 'MULTIMIX MAURY', currentStock: 0, orderQuantity: 0 },
    ]
  },
  {
    id: '22',
    name: 'PURE CLEANS',
    products: [
      { id: '22-1', name: 'TOUCAS', currentStock: 0, orderQuantity: 0 },
      { id: '22-2', name: 'PRODUTO VERDE', currentStock: 0, orderQuantity: 0 },
      { id: '22-3', name: 'PRODUTO ROXO', currentStock: 0, orderQuantity: 0 },
      { id: '22-4', name: 'SACO LIXO 130', currentStock: 0, orderQuantity: 0 },
      { id: '22-5', name: 'SACO LIXO 60', currentStock: 0, orderQuantity: 0 },
      { id: '22-6', name: 'SACO LIXO 20', currentStock: 0, orderQuantity: 0 },
      { id: '22-7', name: 'PAPEL HIGIÊNICO', currentStock: 0, orderQuantity: 0 },
      { id: '22-8', name: 'PAPEL TOALHA', currentStock: 0, orderQuantity: 0 },
      { id: '22-9', name: 'PAPEL TOALHA CAFÉ', currentStock: 0, orderQuantity: 0 },
      { id: '22-10', name: 'PERFUME BANHEIRO', currentStock: 0, orderQuantity: 0 },
      { id: '22-11', name: 'BALDES', currentStock: 0, orderQuantity: 0 },
      { id: '22-12', name: 'VASSOURAS', currentStock: 0, orderQuantity: 0 },
      { id: '22-13', name: 'PANOS DE PRATO', currentStock: 0, orderQuantity: 0 },
      { id: '22-14', name: 'PANOS DE CHÃO', currentStock: 0, orderQuantity: 0 },
      { id: '22-15', name: 'PANOS DE MESA', currentStock: 0, orderQuantity: 0 },
      { id: '22-16', name: 'PULVERIZADOR', currentStock: 0, orderQuantity: 0 },
      { id: '22-17', name: 'ESFREGÃO', currentStock: 0, orderQuantity: 0 },
    ]
  },
  {
    id: '23',
    name: 'FRAPORTI',
    products: [
      { id: '23-1', name: 'DETERGENTE', currentStock: 0, orderQuantity: 0 },
      { id: '23-2', name: 'ÁGUA SANITÁRIA', currentStock: 0, orderQuantity: 0 },
      { id: '23-3', name: 'ÁLCOOL', currentStock: 0, orderQuantity: 0 },
      { id: '23-4', name: 'ESPONJAS', currentStock: 0, orderQuantity: 0 },
      { id: '23-5', name: 'ESFREGÃO DE AÇO', currentStock: 0, orderQuantity: 0 },
      { id: '23-6', name: 'LUVAS DE VINIL M', currentStock: 0, orderQuantity: 0 },
      { id: '23-7', name: 'LUVAS DE VINIL G', currentStock: 0, orderQuantity: 0 },
      { id: '23-8', name: 'CANUDOS', currentStock: 0, orderQuantity: 0 },
    ]
  },
  {
    id: '24',
    name: 'EMBALAGENS KEVIN',
    products: [
      { id: '24-1', name: 'H10', currentStock: 0, orderQuantity: 0 },
      { id: '24-2', name: 'H20', currentStock: 0, orderQuantity: 0 },
      { id: '24-3', name: 'HF05', currentStock: 0, orderQuantity: 0 },
      { id: '24-4', name: 'HF02', currentStock: 0, orderQuantity: 0 },
      { id: '24-5', name: 'H35 LISA', currentStock: 0, orderQuantity: 0 },
      { id: '24-6', name: 'COPO DESCARTÁVEL', currentStock: 0, orderQuantity: 0 },
      { id: '24-7', name: 'ROCAMBOLE', currentStock: 0, orderQuantity: 0 },
      { id: '24-8', name: 'NP40 BAIXA', currentStock: 0, orderQuantity: 0 },
      { id: '24-9', name: 'SACO DE 5KG PÃO', currentStock: 0, orderQuantity: 0 },
      { id: '24-10', name: 'SACO DE 10KG PÃO', currentStock: 0, orderQuantity: 0 },
      { id: '24-11', name: 'SACO DE 15KG PÃO', currentStock: 0, orderQuantity: 0 },
      { id: '24-12', name: 'PF642A', currentStock: 0, orderQuantity: 0 },
      { id: '24-13', name: 'GARFO DESCARTÁVEL', currentStock: 0, orderQuantity: 0 },
      { id: '24-14', name: 'COLHER DESCARTÁVEL', currentStock: 0, orderQuantity: 0 },
      { id: '24-15', name: 'PALITO DE CAFÉ', currentStock: 0, orderQuantity: 0 },
      { id: '24-16', name: 'PALITO DE DENTE', currentStock: 0, orderQuantity: 0 },
      { id: '24-17', name: 'NP40 ALTA', currentStock: 0, orderQuantity: 0 },
      { id: '24-18', name: 'PEDRAS BRANCAS PAPEL', currentStock: 0, orderQuantity: 0 },
      { id: '24-19', name: 'S90 BISCOITOS', currentStock: 0, orderQuantity: 0 },
    ]
  },
  {
    id: '25',
    name: 'SULFENIX / MEIWA',
    products: [
      { id: '25-1', name: 'HM06', currentStock: 0, orderQuantity: 0 },
      { id: '25-2', name: 'HM06P', currentStock: 0, orderQuantity: 0 },
      { id: '25-3', name: 'CP 180', currentStock: 0, orderQuantity: 0 },
      { id: '25-4', name: 'TAMPA CP180', currentStock: 0, orderQuantity: 0 },
      { id: '25-5', name: 'CP300', currentStock: 0, orderQuantity: 0 },
      { id: '25-6', name: 'TAMPA CP300', currentStock: 0, orderQuantity: 0 },
    ]
  },
  {
    id: '26',
    name: 'EMULZIT',
    products: [
      { id: '26-1', name: 'AUSTRALIANO', currentStock: 0, orderQuantity: 0 },
      { id: '26-2', name: 'BROWNIE', currentStock: 0, orderQuantity: 0 },
      { id: '26-3', name: 'CIABATA', currentStock: 0, orderQuantity: 0 },
      { id: '26-4', name: 'ESPECIARIAS', currentStock: 0, orderQuantity: 0 },
      { id: '26-5', name: 'CARLEX', currentStock: 0, orderQuantity: 0 },
      { id: '26-6', name: 'AIPIM', currentStock: 0, orderQuantity: 0 },
    ]
  },
];

const Index = () => {
  const [suppliers, setSuppliers] = useState<Supplier[]>(initialSuppliers);
  const [activeTab, setActiveTab] = useState('1');
  const [isSupplierDialogOpen, setIsSupplierDialogOpen] = useState(false);
  const [isProductDialogOpen, setIsProductDialogOpen] = useState(false);
  const [isEditProductDialogOpen, setIsEditProductDialogOpen] = useState(false);
  const [isHistoryDialogOpen, setIsHistoryDialogOpen] = useState(false);
  const [editingSupplier, setEditingSupplier] = useState<Supplier | null>(null);
  const [editingSupplierId, setEditingSupplierId] = useState<string>('');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [newSupplierName, setNewSupplierName] = useState('');
  const [newProductName, setNewProductName] = useState('');
  const [editProductName, setEditProductName] = useState('');
  const [purchaseHistory, setPurchaseHistory] = useState<PurchaseHistory[]>([]);
  const [currentSupplierHistory, setCurrentSupplierHistory] = useState<PurchaseHistory[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const { toast } = useToast();
  const { user, signOut, subscription, checkSubscription, session } = useAuth();

  const handleManageSubscription = async () => {
    if (!subscription.subscribed) {
      // Redireciona para a landing page para assinar
      window.location.href = '/';
      return;
    }

    try {
      const { data, error } = await supabase.functions.invoke('customer-portal', {
        headers: {
          Authorization: `Bearer ${session?.access_token}`,
        },
      });

      if (error) {
        console.error('Error creating portal session:', error);
        toast({
          title: "Erro",
          description: "Erro ao abrir portal de gerenciamento.",
          variant: "destructive",
        });
        return;
      }

      // Abre o portal do Stripe em nova aba
      window.open(data.url, '_blank');
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Erro",
        description: "Erro ao abrir portal de gerenciamento.",
        variant: "destructive",
      });
    }
  };

  const handleSignOut = async () => {
    await signOut();
    toast({
      title: "Logout realizado",
      description: "Você foi desconectado com sucesso.",
    });
  };

  const handleSupplierEdit = (supplier: Supplier) => {
    setEditingSupplier(supplier);
    setNewSupplierName(supplier.name);
    setIsSupplierDialogOpen(true);
  };

  const handleSupplierSave = () => {
    if (editingSupplier) {
      setSuppliers(prev => prev.map(s => 
        s.id === editingSupplier.id ? { ...s, name: newSupplierName } : s
      ));
      toast({
        title: "Fornecedor atualizado",
        description: "Nome do fornecedor alterado com sucesso!",
      });
    } else {
      const newSupplier: Supplier = {
        id: Date.now().toString(),
        name: newSupplierName,
        products: []
      };
      setSuppliers(prev => [...prev, newSupplier]);
      toast({
        title: "Fornecedor adicionado",
        description: "Novo fornecedor criado com sucesso!",
      });
    }
    setIsSupplierDialogOpen(false);
    setEditingSupplier(null);
    setNewSupplierName('');
  };

  const handleSupplierDelete = (supplierId: string) => {
    setSuppliers(prev => prev.filter(s => s.id !== supplierId));
    toast({
      title: "Fornecedor removido",
      description: "Fornecedor excluído com sucesso!",
      variant: "destructive",
    });
    if (activeTab === supplierId) {
      setActiveTab(suppliers[0]?.id || '1');
    }
  };

  const handleProductAdd = (supplierId: string) => {
    setEditingSupplierId(supplierId);
    setIsProductDialogOpen(true);
  };

  const handleProductSave = () => {
    const newProduct: Product = {
      id: `${editingSupplierId}-${Date.now()}`,
      name: newProductName,
      currentStock: 0,
      orderQuantity: 0
    };
    
    setSuppliers(prev => prev.map(s =>
      s.id === editingSupplierId 
        ? { ...s, products: [...s.products, newProduct] }
        : s
    ));
    
    toast({
      title: "Produto adicionado",
      description: "Novo produto adicionado com sucesso!",
    });
    
    setIsProductDialogOpen(false);
    setNewProductName('');
    setEditingSupplierId('');
  };

  const handleProductEdit = (supplierId: string, product: Product) => {
    setEditingSupplierId(supplierId);
    setEditingProduct(product);
    setEditProductName(product.name);
    setIsEditProductDialogOpen(true);
  };

  const handleProductEditSave = () => {
    setSuppliers(prev => prev.map(s =>
      s.id === editingSupplierId
        ? {
            ...s,
            products: s.products.map(p =>
              p.id === editingProduct?.id ? { ...p, name: editProductName } : p
            )
          }
        : s
    ));
    
    toast({
      title: "Produto atualizado",
      description: "Nome do produto alterado com sucesso!",
    });
    
    setIsEditProductDialogOpen(false);
    setEditProductName('');
    setEditingProduct(null);
    setEditingSupplierId('');
  };

  const handleProductDelete = (supplierId: string, productId: string) => {
    setSuppliers(prev => prev.map(s =>
      s.id === supplierId
        ? { ...s, products: s.products.filter(p => p.id !== productId) }
        : s
    ));
    toast({
      title: "Produto removido",
      description: "Produto excluído com sucesso!",
      variant: "destructive",
    });
  };

  const handleStockChange = (supplierId: string, productId: string, value: number) => {
    setSuppliers(prev => prev.map(s =>
      s.id === supplierId
        ? {
            ...s,
            products: s.products.map(p =>
              p.id === productId ? { ...p, currentStock: Math.max(0, value) } : p
            )
          }
        : s
    ));
  };

  const handlePriceChange = (supplierId: string, productId: string, value: number) => {
    setSuppliers(prev => prev.map(s =>
      s.id === supplierId
        ? {
            ...s,
            products: s.products.map(p =>
              p.id === productId ? { ...p, price: value } : p
            )
          }
        : s
    ));
  };


  const handleUnitChange = (supplierId: string, productId: string, value: 'UNIDADE' | 'FARDO' | 'CAIXA') => {
    setSuppliers(prev => prev.map(s =>
      s.id === supplierId
        ? {
            ...s,
            products: s.products.map(p =>
              p.id === productId ? { ...p, unit: value } : p
            )
          }
        : s
    ));
  };


  const handleShowHistory = (supplier: Supplier) => {
    let supplierHistory = purchaseHistory.filter(h => h.supplierId === supplier.id);
    
    // Filter by selected date if date is selected
    if (selectedDate) {
      const selectedDateStr = selectedDate.toLocaleDateString('pt-BR');
      supplierHistory = supplierHistory.filter(h => h.date === selectedDateStr);
    }
    
    setCurrentSupplierHistory(supplierHistory);
    setIsHistoryDialogOpen(true);
  };

  const handleOrderChange = (supplierId: string, productId: string, value: number) => {
    setSuppliers(prev => prev.map(s =>
      s.id === supplierId
        ? {
            ...s,
            products: s.products.map(p =>
              p.id === productId ? { ...p, orderQuantity: Math.max(0, value) } : p
            )
          }
        : s
    ));
  };

  const getTotalOrderItems = (supplier: Supplier) => {
    return supplier.products.filter(p => p.orderQuantity > 0).length;
  };

  const handleDownloadPDF = (supplier: Supplier) => {
    const orderItems = supplier.products.filter(p => p.orderQuantity > 0);
    
    if (orderItems.length === 0) {
      toast({
        title: "Nenhum item no pedido",
        description: "Adicione itens ao pedido antes de gerar o PDF.",
        variant: "destructive",
      });
      return;
    }

    const doc = new jsPDF();
    
    // Header
    doc.setFontSize(20);
    doc.text('PEDIDO - PÃO DA NONA', 20, 20);
    
    doc.setFontSize(16);
    doc.text(`Fornecedor: ${supplier.name}`, 20, 35);
    
    doc.setFontSize(12);
    doc.text(`Data: ${new Date().toLocaleDateString('pt-BR')}`, 20, 45);
    
    // Table header
    doc.setFontSize(12);
    doc.text('PRODUTO', 20, 60);
    doc.text('QTD PEDIDO', 110, 60);
    doc.text('UNIDADE', 160, 60);
    
    // Draw line under header
    doc.line(20, 65, 190, 65);
    
    // Table content
    let yPosition = 75;
    orderItems.forEach((product) => {
      if (yPosition > 270) {
        doc.addPage();
        yPosition = 20;
      }
      
      doc.setFontSize(10);
      doc.text(product.name, 20, yPosition);
      doc.text(product.orderQuantity.toString(), 110, yPosition);
      doc.text(product.unit || 'UNIDADE', 160, yPosition);
      yPosition += 10;
    });
    
    // Footer
    doc.setFontSize(10);
    doc.text(`Total de itens: ${orderItems.length}`, 20, yPosition + 10);
    
    // Save to history
    const currentDate = new Date().toLocaleDateString('pt-BR');
    const totalPrice = orderItems.reduce((sum, item) => sum + (item.price || 0) * item.orderQuantity, 0);
    
    const newPurchase: PurchaseHistory = {
      id: `${supplier.id}-${Date.now()}`,
      supplierId: supplier.id,
      supplierName: supplier.name,
      date: currentDate,
      products: orderItems.map(item => ({
        name: item.name,
        quantity: item.orderQuantity,
        stock: item.currentStock,
        price: item.price,
        unit: item.unit
      })),
      total: totalPrice
    };
    
    setPurchaseHistory(prev => [newPurchase, ...prev]);
    
    // Clear order quantities after saving to history
    setSuppliers(prev => prev.map(s =>
      s.id === supplier.id
        ? {
            ...s,
            products: s.products.map(p => ({ ...p, orderQuantity: 0 }))
          }
        : s
    ));
    
    // Save PDF
    doc.save(`pedido-${supplier.name.toLowerCase().replace(/\s+/g, '-')}-${new Date().toISOString().split('T')[0]}.pdf`);
    
    toast({
      title: "PDF gerado",
      description: "Pedido baixado com sucesso!",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header com informações do usuário */}
        <div className="mb-6 flex justify-between items-center bg-white/70 backdrop-blur-sm rounded-lg p-4 shadow-sm">
          <div className="flex items-center gap-4">
            <ShoppingCart className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-xl font-bold text-foreground">OrderFlow Pro</h1>
              <p className="text-sm text-muted-foreground">Sistema de gestão de fornecedores</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm">
              <User className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">{user?.email}</span>
            </div>
            <Button variant="outline" size="sm" onClick={handleSignOut}>
              <LogOut className="h-4 w-4 mr-2" />
              Sair
            </Button>
          </div>
        </div>

        {/* Card de Status da Assinatura */}
        <Card className="mb-6 border-primary/20 bg-gradient-to-r from-primary/5 to-primary/10">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-full ${subscription.subscribed ? 'bg-green-100' : 'bg-orange-100'}`}>
                  <CreditCard className={`h-5 w-5 ${subscription.subscribed ? 'text-green-600' : 'text-orange-600'}`} />
                </div>
                <div>
                  <CardTitle className="text-lg">
                    Status da Assinatura
                  </CardTitle>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">
                      {subscription.subscribed 
                        ? `Plano ${subscription.subscription_tier} ativo` 
                        : 'Nenhuma assinatura ativa'
                      }
                    </p>
                    {subscription.is_trialing && subscription.trial_end && (
                      <p className="text-xs text-orange-600 font-medium">
                        🎁 Trial até: {new Date(subscription.trial_end).toLocaleDateString('pt-BR')}
                      </p>
                    )}
                    {subscription.subscription_tier === "Admin" && (
                      <p className="text-xs text-blue-600 font-medium">
                        👑 Acesso de Criador
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={checkSubscription}
                  disabled={!session}
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Atualizar
                </Button>
                {subscription.subscription_tier !== "Admin" && (
                  <Button
                    variant={subscription.subscribed ? "outline" : "default"}
                    size="sm"
                    onClick={handleManageSubscription}
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    {subscription.subscribed ? 'Gerenciar' : 'Assinar'}
                  </Button>
                )}
              </div>
            </div>
          </CardHeader>
          {subscription.subscribed && subscription.subscription_end && (
            <CardContent className="pt-0">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CalendarIcon className="h-4 w-4" />
                <span>
                  Próxima cobrança: {new Date(subscription.subscription_end).toLocaleDateString('pt-BR')}
                </span>
              </div>
            </CardContent>
          )}
        </Card>

        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-4 mb-2">
            <h1 className="text-4xl font-bold text-gray-800">
              🍞 PEDIDOS PÃO DA NONA LTDA
            </h1>
            <Button variant="outline" size="sm">
              <Edit className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-gray-600">Gerencie seus fornecedores e produtos de forma intuitiva</p>
        </div>

        <div className="mb-6 flex gap-4">
          <Dialog open={isSupplierDialogOpen} onOpenChange={setIsSupplierDialogOpen}>
            <DialogTrigger asChild>
              <Button 
                onClick={() => {
                  setEditingSupplier(null);
                  setNewSupplierName('');
                }}
                className="bg-green-600 hover:bg-green-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                Novo Fornecedor
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {editingSupplier ? 'Editar Fornecedor' : 'Novo Fornecedor'}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="supplierName">Nome do Fornecedor</Label>
                  <Input
                    id="supplierName"
                    value={newSupplierName}
                    onChange={(e) => setNewSupplierName(e.target.value)}
                    placeholder="Digite o nome do fornecedor"
                  />
                </div>
                <div className="flex gap-2">
                  <Button onClick={handleSupplierSave} disabled={!newSupplierName.trim()}>
                    Salvar
                  </Button>
                  <Button variant="outline" onClick={() => setIsSupplierDialogOpen(false)}>
                    Cancelar
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-6 lg:grid-cols-13 gap-1 h-auto p-2 bg-white/50 backdrop-blur-sm rounded-lg mb-6">
            {suppliers.map((supplier) => (
              <TabsTrigger
                key={supplier.id}
                value={supplier.id}
                className="text-xs p-2 data-[state=active]:bg-orange-500 data-[state=active]:text-white relative"
              >
                {supplier.name}
                {getTotalOrderItems(supplier) > 0 && (
                  <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs h-5 w-5 rounded-full p-0 flex items-center justify-center">
                    {getTotalOrderItems(supplier)}
                  </Badge>
                )}
              </TabsTrigger>
            ))}
          </TabsList>

          {suppliers.map((supplier) => (
            <TabsContent key={supplier.id} value={supplier.id}>
              <Card className="shadow-lg">
                <CardHeader className="bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-t-lg">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-2xl flex items-center gap-2">
                      <Package className="w-6 h-6" />
                      {supplier.name}
                    </CardTitle>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => handleShowHistory(supplier)}
                        className="bg-purple-600 hover:bg-purple-700 text-white"
                      >
                        <History className="w-4 h-4 mr-1" />
                        Histórico
                      </Button>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            size="sm"
                            variant="secondary"
                            className={cn(
                              "bg-indigo-600 hover:bg-indigo-700 text-white",
                              !selectedDate && "text-white"
                            )}
                          >
                            <CalendarIcon className="w-4 h-4 mr-1" />
                            {selectedDate ? format(selectedDate, "dd/MM/yyyy") : "Data"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={selectedDate}
                            onSelect={setSelectedDate}
                            initialFocus
                            className={cn("p-3 pointer-events-auto")}
                          />
                        </PopoverContent>
                      </Popover>
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => handleDownloadPDF(supplier)}
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                      >
                        <FileDown className="w-4 h-4 mr-1" />
                        PDF
                      </Button>
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => handleSupplierEdit(supplier)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleSupplierDelete(supplier.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => handleProductAdd(supplier.id)}
                      >
                        <Plus className="w-4 h-4 mr-1" />
                        Produto
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  {supplier.products.length === 0 ? (
                    <div className="text-center py-8">
                      <Package className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                      <p className="text-gray-500">Nenhum produto cadastrado</p>
                      <Button
                        onClick={() => handleProductAdd(supplier.id)}
                        className="mt-4"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Adicionar Primeiro Produto
                      </Button>
                    </div>
                  ) : (
                    <div className="grid gap-4">
                      {supplier.products.map((product) => (
                        <div
                          key={product.id}
                          className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-800">{product.name}</h3>
                          </div>
                          
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                              <Label className="text-sm text-gray-600">Estoque:</Label>
                              <Input
                                type="number"
                                min="0"
                                value={product.currentStock}
                                onChange={(e) => handleStockChange(supplier.id, product.id, parseInt(e.target.value) || 0)}
                                className="w-20 text-center"
                              />
                            </div>
                            
                            <div className="flex items-center gap-2">
                              <Label className="text-sm text-gray-600">Pedido:</Label>
                              <Input
                                type="number"
                                min="0"
                                value={product.orderQuantity}
                                onChange={(e) => handleOrderChange(supplier.id, product.id, parseInt(e.target.value) || 0)}
                                className="w-20 text-center border-orange-300 focus:border-orange-500"
                              />
                            </div>
                            
                            <div className="flex items-center gap-2">
                              <Label className="text-sm text-gray-600">Valor 1:</Label>
                              <Input
                                type="number"
                                min="0"
                                step="0.01"
                                value={product.price || ''}
                                onChange={(e) => handlePriceChange(supplier.id, product.id, parseFloat(e.target.value) || 0)}
                                className="w-24 text-center"
                                placeholder="R$"
                              />
                            </div>
                            
                            
                            <div className="flex items-center gap-2">
                              <Label className="text-sm text-gray-600">Unidade:</Label>
                              <Select
                                value={product.unit || ''}
                                onValueChange={(value: 'UNIDADE' | 'FARDO' | 'CAIXA') => handleUnitChange(supplier.id, product.id, value)}
                              >
                                <SelectTrigger className="w-28">
                                  <SelectValue placeholder="Selecione" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="UNIDADE">UNIDADE</SelectItem>
                                  <SelectItem value="FARDO">FARDO</SelectItem>
                                  <SelectItem value="CAIXA">CAIXA</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            
                            <Button
                              size="sm"
                              variant="secondary"
                              onClick={() => handleProductEdit(supplier.id, product)}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleProductDelete(supplier.id, product.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {supplier.products.some(p => p.orderQuantity > 0) && (
                    <div className="mt-6 p-4 bg-orange-50 rounded-lg border-l-4 border-orange-500">
                      <h4 className="font-semibold text-orange-800 mb-2 flex items-center gap-2">
                        <ShoppingCart className="w-4 h-4" />
                        Resumo do Pedido
                      </h4>
                      <div className="space-y-1">
                        {supplier.products
                          .filter(p => p.orderQuantity > 0)
                          .map(product => (
                            <div key={product.id} className="flex justify-between text-sm">
                              <span>{product.name}</span>
                              <span className="font-semibold">{product.orderQuantity}</span>
                            </div>
                          ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>

        <Dialog open={isProductDialogOpen} onOpenChange={setIsProductDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Adicionar Novo Produto</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="productName">Nome do Produto</Label>
                <Input
                  id="productName"
                  value={newProductName}
                  onChange={(e) => setNewProductName(e.target.value)}
                  placeholder="Digite o nome do produto"
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={handleProductSave} disabled={!newProductName.trim()}>
                  Adicionar
                </Button>
                <Button variant="outline" onClick={() => setIsProductDialogOpen(false)}>
                  Cancelar
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <Dialog open={isEditProductDialogOpen} onOpenChange={setIsEditProductDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Editar Nome do Produto</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="editProductName">Nome do Produto</Label>
                <Input
                  id="editProductName"
                  value={editProductName}
                  onChange={(e) => setEditProductName(e.target.value)}
                  placeholder="Digite o nome do produto"
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={handleProductEditSave} disabled={!editProductName.trim()}>
                  Salvar
                </Button>
                <Button variant="outline" onClick={() => setIsEditProductDialogOpen(false)}>
                  Cancelar
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <Dialog open={isHistoryDialogOpen} onOpenChange={setIsHistoryDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Histórico de Compras</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              {currentSupplierHistory.length === 0 ? (
                <div className="text-center py-8">
                  <History className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                  <p className="text-gray-500">Nenhum histórico de compras encontrado</p>
                </div>
              ) : (
                 <div className="space-y-4 max-h-96 overflow-y-auto">
                   {currentSupplierHistory.map((purchase) => (
                     <div key={purchase.id} className="p-4 bg-gray-50 rounded-lg">
                       <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2 gap-1">
                         <h4 className="font-semibold text-gray-800">{purchase.supplierName}</h4>
                         <span className="text-sm text-gray-600">{purchase.date}</span>
                       </div>
                       <div className="space-y-2">
                         {purchase.products.map((product, index) => (
                           <div key={index} className="space-y-1">
                             <div className="font-medium text-sm">{product.name}</div>
                             <div className="flex flex-wrap gap-2 text-xs sm:text-sm">
                               <span className="bg-white px-2 py-1 rounded border">Estoque: {product.stock}</span>
                               <span className="bg-white px-2 py-1 rounded border">Pedido: {product.quantity}</span>
                               <span className="bg-white px-2 py-1 rounded border">Unidade: {product.unit || 'UNIDADE'}</span>
                               {product.price && <span className="bg-white px-2 py-1 rounded border">R$ {product.price.toFixed(2)}</span>}
                             </div>
                           </div>
                          ))}
                        </div>
                      <div className="mt-2 pt-2 border-t border-gray-200">
                        <div className="flex justify-between font-semibold">
                          <span>Total:</span>
                          <span>R$ {purchase.total.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <div className="flex justify-end">
                <Button variant="outline" onClick={() => setIsHistoryDialogOpen(false)}>
                  Fechar
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Index;
