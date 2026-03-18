import { useOnboarding } from "./OnboardingContext";
import { useEffect, useState, useCallback } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Rect {
  top: number;
  left: number;
  width: number;
  height: number;
}

export default function TourOverlay() {
  const { activeTour, currentStepIndex, nextStep, prevStep, endTour } = useOnboarding();
  const [targetRect, setTargetRect] = useState<Rect | null>(null);
  const [tooltipStyle, setTooltipStyle] = useState<React.CSSProperties>({});

  const step = activeTour?.steps[currentStepIndex];

  const measure = useCallback(() => {
    if (!step) return;
    const el = document.querySelector(step.targetSelector);
    if (!el) {
      setTargetRect(null);
      return;
    }
    const r = el.getBoundingClientRect();
    const pad = 8;
    setTargetRect({
      top: r.top - pad + window.scrollY,
      left: r.left - pad + window.scrollX,
      width: r.width + pad * 2,
      height: r.height + pad * 2,
    });

    // Scroll into view
    el.scrollIntoView({ behavior: "smooth", block: "center" });

    // Position tooltip
    const placement = step.placement || "bottom";
    const tooltipW = 340;
    let style: React.CSSProperties = { position: "absolute", width: tooltipW, zIndex: 10002 };

    if (placement === "bottom") {
      style.top = r.bottom + pad + 12 + window.scrollY;
      style.left = Math.max(16, r.left + r.width / 2 - tooltipW / 2 + window.scrollX);
    } else if (placement === "top") {
      style.top = r.top - pad - 12 + window.scrollY;
      style.left = Math.max(16, r.left + r.width / 2 - tooltipW / 2 + window.scrollX);
      style.transform = "translateY(-100%)";
    } else if (placement === "right") {
      style.top = r.top + r.height / 2 + window.scrollY;
      style.left = r.right + pad + 12 + window.scrollX;
      style.transform = "translateY(-50%)";
    } else {
      style.top = r.top + r.height / 2 + window.scrollY;
      style.left = r.left - pad - 12 - tooltipW + window.scrollX;
      style.transform = "translateY(-50%)";
    }

    setTooltipStyle(style);
  }, [step]);

  useEffect(() => {
    if (!step) return;
    // Small delay to let DOM settle
    const timer = setTimeout(measure, 200);
    window.addEventListener("resize", measure);
    window.addEventListener("scroll", measure);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", measure);
      window.removeEventListener("scroll", measure);
    };
  }, [step, measure]);

  if (!activeTour || !step) return null;

  const totalSteps = activeTour.steps.length;
  const isLast = currentStepIndex === totalSteps - 1;

  return (
    <div className="fixed inset-0 z-[10000]" style={{ pointerEvents: "none" }}>
      {/* Backdrop with spotlight cutout using CSS */}
      <svg
        className="absolute inset-0 w-full h-full"
        style={{ pointerEvents: "auto", position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", zIndex: 10000 }}
        onClick={endTour}
      >
        <defs>
          <mask id="spotlight-mask">
            <rect width="100%" height="100%" fill="white" />
            {targetRect && (
              <rect
                x={targetRect.left - window.scrollX}
                y={targetRect.top - window.scrollY}
                width={targetRect.width}
                height={targetRect.height}
                rx="12"
                fill="black"
              />
            )}
          </mask>
        </defs>
        <rect
          width="100%"
          height="100%"
          fill="rgba(0,0,0,0.55)"
          mask="url(#spotlight-mask)"
        />
      </svg>

      {/* Spotlight ring */}
      {targetRect && (
        <div
          className="absolute rounded-xl ring-2 ring-primary/60 shadow-lg shadow-primary/20 animate-pulse"
          style={{
            pointerEvents: "none",
            position: "absolute",
            top: targetRect.top - window.scrollY,
            left: targetRect.left - window.scrollX,
            width: targetRect.width,
            height: targetRect.height,
            zIndex: 10001,
          }}
        />
      )}

      {/* Tooltip */}
      <div
        className="bg-card border border-border rounded-2xl shadow-2xl p-5 animate-in fade-in slide-in-from-bottom-2 duration-300"
        style={{
          ...tooltipStyle,
          position: "fixed",
          top: tooltipStyle.top ? Number(tooltipStyle.top) - window.scrollY : undefined,
          left: tooltipStyle.left ? Number(tooltipStyle.left) - window.scrollX : undefined,
          pointerEvents: "auto",
          zIndex: 10002,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between mb-2">
          <h4 className="text-sm font-semibold text-foreground">{step.title}</h4>
          <button onClick={endTour} className="text-muted-foreground hover:text-foreground transition-colors">
            <X size={16} />
          </button>
        </div>
        <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{step.content}</p>
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">
            {currentStepIndex + 1} / {totalSteps}
          </span>
          <div className="flex gap-2">
            {currentStepIndex > 0 && (
              <Button variant="ghost" size="sm" onClick={prevStep}>
                <ChevronLeft size={14} />
                Anterior
              </Button>
            )}
            <Button size="sm" onClick={nextStep}>
              {isLast ? "Concluir" : "Próximo"}
              {!isLast && <ChevronRight size={14} />}
            </Button>
          </div>
        </div>

        {/* Progress dots */}
        <div className="flex justify-center gap-1.5 mt-3">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all ${
                i === currentStepIndex ? "w-4 bg-primary" : "w-1.5 bg-muted-foreground/30"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
