import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Users, FileText, BarChart3, Check, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Landing = () => {
  const features = [
    {
      icon: <ShoppingCart className="h-6 w-6" />,
      title: "Gestão de Fornecedores",
      description: "Organize seus fornecedores com produtos predefinidos e personalizáveis"
    },
    {
      icon: <FileText className="h-6 w-6" />,
      title: "Pedidos Automatizados",
      description: "Gere PDFs de pedidos automaticamente com controle de estoque"
    },
    {
      icon: <BarChart3 className="h-6 w-6" />,
      title: "Histórico Completo",
      description: "Acompanhe todo o histórico de compras e pedidos realizados"
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Multi-usuário",
      description: "Cada usuário tem seus próprios dados isolados e seguros"
    }
  ];

  const plans = [
    {
      name: "Básico",
      price: "R$ 29,90",
      period: "/mês",
      description: "Ideal para pequenos negócios",
      features: [
        "Até 10 fornecedores",
        "Geração de PDFs",
        "Controle de estoque básico",
        "Histórico de pedidos",
        "Suporte por email"
      ],
      popular: false
    },
    {
      name: "Profissional",
      price: "R$ 59,90",
      period: "/mês",
      description: "Para empresas em crescimento",
      features: [
        "Fornecedores ilimitados",
        "Relatórios avançados",
        "Análise de tendências",
        "Exportação de dados",
        "Suporte prioritário",
        "Personalização completa"
      ],
      popular: true
    },
    {
      name: "Enterprise",
      price: "R$ 99,90",
      period: "/mês",
      description: "Para grandes organizações",
      features: [
        "Tudo do Profissional",
        "Multi-usuários (equipe)",
        "API de integração",
        "Log de atividades",
        "Suporte 24/7",
        "Backup automático"
      ],
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingCart className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold text-foreground">OrderFlow Pro</span>
          </div>
          <Link to="/auth">
            <Button>
              Entrar <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <Badge variant="secondary" className="mb-4">
            🚀 Sistema completo de gestão
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            Gerencie seus fornecedores
            <span className="text-primary block">de forma inteligente</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Sistema SaaS completo para controle de estoque, fornecedores e pedidos. 
            Mais de 26 fornecedores pré-cadastrados prontos para usar.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/auth">
              <Button size="lg" className="w-full sm:w-auto">
                Começar gratuitamente
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              Ver demonstração
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Funcionalidades Poderosas
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Tudo que você precisa para gerenciar fornecedores e pedidos de forma eficiente
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <div className="mx-auto mb-4 p-3 rounded-full bg-primary/10 text-primary w-fit">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Planos Simples e Transparentes
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Escolha o plano ideal para o seu negócio. Todos incluem dados ilimitados e suporte.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {plans.map((plan, index) => (
              <Card key={index} className={`relative ${plan.popular ? 'border-primary shadow-lg scale-105' : ''}`}>
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary">
                    Mais Popular
                  </Badge>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                    <span className="text-muted-foreground">{plan.period}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link to="/auth" className="block">
                    <Button 
                      className="w-full" 
                      variant={plan.popular ? "default" : "outline"}
                    >
                      Começar agora
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12 px-4">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <ShoppingCart className="h-6 w-6 text-primary" />
            <span className="text-lg font-semibold">OrderFlow Pro</span>
          </div>
          <p className="text-muted-foreground">
            © 2024 OrderFlow Pro. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;