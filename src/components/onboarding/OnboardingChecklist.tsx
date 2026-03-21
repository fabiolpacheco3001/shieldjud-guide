import { useState } from "react";
import { useOnboarding, Tour } from "./OnboardingContext";
import { CheckCircle2, Circle, Play, RotateCcw, X, Rocket, ChevronDown, MessageCircleWarning, ArrowLeft, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import SupportForm from "@/components/SupportForm";

const tours: Record<string, Tour> = {
  "search-tour": {
    id: "search-tour",
    name: "Pesquisa",
    steps: [
      {
        targetSelector: '[data-onboarding="hero-search"]',
        title: "Barra de Pesquisa",
        content: "Aqui você pode pesquisar por qualquer artigo da central de ajuda. Digite um termo e veja os resultados em tempo real.",
        placement: "bottom",
      },
      {
        targetSelector: '[data-onboarding="hero-title"]',
        title: "Bem-vindo à Central",
        content: "Esta é a Central de Ajuda do ShieldJud. Aqui você encontra todas as informações sobre a plataforma.",
        placement: "bottom",
      },
    ],
  },
  "section-tour": {
    id: "section-tour",
    name: "Seções",
    steps: [
      {
        targetSelector: '[data-onboarding="section-card-0"]',
        title: "Categorias de Conteúdo",
        content: "Os artigos estão organizados em seções. Cada card leva para uma categoria específica de conteúdo.",
        placement: "bottom",
      },
      {
        targetSelector: '[data-onboarding="section-card-1"]',
        title: "Outras Seções",
        content: "Explore as diferentes seções para encontrar o que precisa. Cada uma cobre um aspecto da plataforma.",
        placement: "bottom",
      },
      {
        targetSelector: '[data-onboarding="section-card-2"]',
        title: "Extensão Chrome",
        content: "Temos seções sobre a extensão do Chrome, biblioteca, análises e muito mais!",
        placement: "bottom",
      },
    ],
  },
  "promoted-tour": {
    id: "promoted-tour",
    name: "Artigos Promovidos",
    steps: [
      {
        targetSelector: '[data-onboarding="promoted-articles"]',
        title: "Artigos em Destaque",
        content: "Estes são os artigos mais importantes, selecionados pela equipe para facilitar seu início.",
        placement: "top",
      },
      {
        targetSelector: '[data-onboarding="most-accessed"]',
        title: "Mais Acessados",
        content: "Aqui ficam os artigos mais populares, baseados em visualizações dos usuários.",
        placement: "top",
      },
    ],
  },
};

export default function OnboardingChecklist() {
  const { checklistOpen, setChecklistOpen, checklistItems, startTour, resetChecklist } = useOnboarding();
  const [showSupport, setShowSupport] = useState(false);

  const completedCount = checklistItems.filter((i) => i.completed).length;
  const progress = (completedCount / checklistItems.length) * 100;
  const allDone = completedCount === checklistItems.length;

  return (
    <>
      {/* Floating trigger button */}
      <button
        onClick={() => setChecklistOpen(!checklistOpen)}
        className="fixed bottom-6 right-6 z-[9999] h-14 w-14 rounded-full bg-primary text-primary-foreground shadow-xl hover:shadow-2xl hover:scale-105 transition-all flex items-center justify-center group"
        aria-label="Abrir onboarding"
      >
        {checklistOpen ? (
          <ChevronDown size={24} className="transition-transform" />
        ) : (
          <>
            <Rocket size={22} />
            {completedCount < checklistItems.length && (
              <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-destructive text-destructive-foreground text-[10px] font-bold flex items-center justify-center">
                {checklistItems.length - completedCount}
              </span>
            )}
          </>
        )}
      </button>

      {/* Checklist panel */}
      {checklistOpen && (
        <div className="fixed bottom-24 right-6 z-[9998] w-[360px] max-h-[70vh] bg-card border border-border rounded-2xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom-4 fade-in duration-300">
          {showSupport ? (
            <>
              {/* Support Header */}
              <div className="p-5 pb-3 bg-gradient-to-br from-destructive/10 to-destructive/5">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
                    <MessageCircleWarning size={18} className="text-destructive" />
                    Reportar problema
                  </h3>
                  <button onClick={() => setShowSupport(false)} className="text-muted-foreground hover:text-foreground">
                    <ArrowLeft size={16} />
                  </button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Ao enviar, seu app de e-mail abrirá com o relato pronto.
                </p>
              </div>
              {/* Support Form */}
              <div className="p-4">
                <SupportForm onSuccess={() => setShowSupport(false)} />
              </div>
            </>
          ) : (
            <>
              {/* Header */}
              <div className="p-5 pb-3 bg-gradient-to-br from-primary/10 to-accent/5">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
                    <Rocket size={18} className="text-primary" />
                    Primeiros Passos
                  </h3>
                  <button onClick={() => setChecklistOpen(false)} className="text-muted-foreground hover:text-foreground">
                    <X size={16} />
                  </button>
                </div>
                <p className="text-xs text-muted-foreground mb-3">
                  Complete as tarefas abaixo para conhecer a central.
                </p>
                <div className="flex items-center gap-3">
                  <Progress value={progress} className="h-2 flex-1" />
                  <span className="text-xs font-medium text-muted-foreground">
                    {completedCount}/{checklistItems.length}
                  </span>
                </div>
              </div>

              {/* Items */}
              <div className="p-3 space-y-1 overflow-y-auto max-h-[40vh]">
                {checklistItems.map((item) => (
                  <div
                    key={item.id}
                    className={`flex items-start gap-3 p-3 rounded-xl transition-colors ${
                      item.completed ? "bg-muted/50 opacity-70" : "hover:bg-muted/40"
                    }`}
                  >
                    <div className="mt-0.5">
                      {item.completed ? (
                        <CheckCircle2 size={18} className="text-primary" />
                      ) : (
                        <Circle size={18} className="text-muted-foreground" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-medium ${item.completed ? "line-through text-muted-foreground" : "text-foreground"}`}>
                        {item.title}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">{item.description}</p>
                    </div>
                    {!item.completed && item.tourId && tours[item.tourId] && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 text-xs text-primary hover:text-primary-foreground hover:bg-primary shrink-0"
                        onClick={() => startTour(tours[item.tourId!])}
                      >
                        <Play size={12} />
                        Iniciar
                      </Button>
                    )}
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="p-3 pt-1 border-t border-border">
                {allDone ? (
                  <div className="text-center py-2">
                    <p className="text-sm font-medium text-primary">🎉 Parabéns! Tudo concluído!</p>
                    <Button variant="ghost" size="sm" className="mt-1 text-xs" onClick={resetChecklist}>
                      <RotateCcw size={12} />
                      Refazer
                    </Button>
                  </div>
                ) : (
                  <p className="text-[11px] text-muted-foreground text-center py-1">
                    Clique em "Iniciar" para um tour guiado
                  </p>
                )}
                <button
                  onClick={() => setShowSupport(true)}
                  className="w-full mt-2 flex items-center justify-center gap-2 py-2 rounded-lg text-xs text-muted-foreground hover:text-destructive hover:bg-destructive/5 transition-colors"
                >
                  <MessageCircleWarning size={14} />
                  Reportar um problema
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}
