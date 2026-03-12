import shieldjudLogo from "@/assets/shieldjud-logo.png";
import { useNavigate } from "react-router-dom";

const HelpCenterHeader = () => {
  const navigate = useNavigate();

  return (
    <header className="w-full bg-card border-b border-border px-4 py-3">
      <div className="container max-w-5xl mx-auto flex items-center gap-3 cursor-pointer" onClick={() => navigate("/")}>
        <img src={shieldjudLogo} alt="ShieldJud" className="h-7 logo-brand" />
        <span className="text-base font-semibold text-foreground">ShieldJud</span>
        <span className="text-sm font-medium text-muted-foreground">Central de Ajuda</span>
      </div>
    </header>
  );
};

export default HelpCenterHeader;
