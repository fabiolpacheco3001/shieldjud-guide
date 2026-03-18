import React, { createContext, useContext, useState, useCallback } from "react";

export interface TourStep {
  targetSelector: string;
  title: string;
  content: string;
  placement?: "top" | "bottom" | "left" | "right";
}

export interface Tour {
  id: string;
  name: string;
  steps: TourStep[];
}

export interface ChecklistItem {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  tourId?: string;
}

interface OnboardingState {
  // Checklist
  checklistOpen: boolean;
  setChecklistOpen: (open: boolean) => void;
  checklistItems: ChecklistItem[];
  completeItem: (id: string) => void;
  resetChecklist: () => void;

  // Tour
  activeTour: Tour | null;
  currentStepIndex: number;
  startTour: (tour: Tour) => void;
  nextStep: () => void;
  prevStep: () => void;
  endTour: () => void;
}

const OnboardingContext = createContext<OnboardingState | null>(null);

const defaultChecklist: ChecklistItem[] = [
  {
    id: "search",
    title: "Faça uma pesquisa",
    description: "Use a barra de busca para encontrar um artigo.",
    completed: false,
    tourId: "search-tour",
  },
  {
    id: "explore-section",
    title: "Explore uma seção",
    description: "Clique em uma das categorias de conteúdo.",
    completed: false,
    tourId: "section-tour",
  },
  {
    id: "read-article",
    title: "Leia um artigo promovido",
    description: "Confira os artigos em destaque na página inicial.",
    completed: false,
    tourId: "promoted-tour",
  },
];

export function OnboardingProvider({ children }: { children: React.ReactNode }) {
  const [checklistOpen, setChecklistOpen] = useState(false);
  const [checklistItems, setChecklistItems] = useState<ChecklistItem[]>(defaultChecklist);
  const [activeTour, setActiveTour] = useState<Tour | null>(null);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const completeItem = useCallback((id: string) => {
    setChecklistItems((items) =>
      items.map((item) => (item.id === id ? { ...item, completed: true } : item))
    );
  }, []);

  const resetChecklist = useCallback(() => {
    setChecklistItems(defaultChecklist);
  }, []);

  const startTour = useCallback((tour: Tour) => {
    setActiveTour(tour);
    setCurrentStepIndex(0);
    setChecklistOpen(false);
  }, []);

  const nextStep = useCallback(() => {
    if (!activeTour) return;
    if (currentStepIndex < activeTour.steps.length - 1) {
      setCurrentStepIndex((i) => i + 1);
    } else {
      // Tour finished — mark related checklist item as complete
      const tourId = activeTour.id;
      setChecklistItems((items) =>
        items.map((item) => (item.tourId === tourId ? { ...item, completed: true } : item))
      );
      setActiveTour(null);
      setCurrentStepIndex(0);
    }
  }, [activeTour, currentStepIndex]);

  const prevStep = useCallback(() => {
    if (currentStepIndex > 0) setCurrentStepIndex((i) => i - 1);
  }, [currentStepIndex]);

  const endTour = useCallback(() => {
    setActiveTour(null);
    setCurrentStepIndex(0);
  }, []);

  return (
    <OnboardingContext.Provider
      value={{
        checklistOpen,
        setChecklistOpen,
        checklistItems,
        completeItem,
        resetChecklist,
        activeTour,
        currentStepIndex,
        startTour,
        nextStep,
        prevStep,
        endTour,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
}

export function useOnboarding() {
  const ctx = useContext(OnboardingContext);
  if (!ctx) throw new Error("useOnboarding must be inside OnboardingProvider");
  return ctx;
}
