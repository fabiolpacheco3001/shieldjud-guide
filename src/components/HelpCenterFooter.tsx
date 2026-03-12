import shieldjudLogo from "@/assets/shieldjud-logo.png";

const HelpCenterFooter = () => {
  return (
    <footer className="w-full border-t border-border bg-card py-8 px-4 mt-12">
      <div className="container max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <img src={shieldjudLogo} alt="ShieldJud" className="h-7 logo-brand" />
          <span className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} ShieldJud. Todos os direitos reservados.
          </span>
        </div>
        <div className="flex items-center gap-6">
          <a
            href="/termos-de-uso"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Termos de Uso
          </a>
          <a
            href="/politica-de-privacidade"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Política de Privacidade
          </a>
        </div>
      </div>
    </footer>
  );
};

export default HelpCenterFooter;
