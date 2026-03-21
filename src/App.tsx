import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { OnboardingProvider } from "@/components/onboarding/OnboardingContext";
import TourOverlay from "@/components/onboarding/TourOverlay";
import OnboardingChecklist from "@/components/onboarding/OnboardingChecklist";
import Index from "./pages/Index.tsx";
import SectionPage from "./pages/SectionPage.tsx";
import ArticlePage from "./pages/ArticlePage.tsx";
import TermosDeUso from "./pages/TermosDeUso.tsx";
import PoliticaDePrivacidade from "./pages/PoliticaDePrivacidade.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <OnboardingProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/secao/:sectionId" element={<SectionPage />} />
            <Route path="/artigo/:slug" element={<ArticlePage />} />
            <Route path="/termos-de-uso" element={<TermosDeUso />} />
            <Route path="/politica-de-privacidade" element={<PoliticaDePrivacidade />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        <TourOverlay />
        <OnboardingChecklist />
      </OnboardingProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
