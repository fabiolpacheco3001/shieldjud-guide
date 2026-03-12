import HelpCenterHeader from "@/components/HelpCenterHeader";
import HelpCenterFooter from "@/components/HelpCenterFooter";

const TermosDeUso = () => (
  <div className="min-h-screen flex flex-col bg-background">
    <HelpCenterHeader />
    <div className="container max-w-3xl mx-auto py-10 px-4">
      <article className="bg-card rounded-2xl p-6 md:p-10 border border-border" style={{ boxShadow: "var(--card-shadow)" }}>
        <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-6">Termos de Uso</h1>
        <p className="text-foreground leading-relaxed mb-4">
          Estes Termos de Uso regulam o acesso e utilização da plataforma ShieldJud. Ao utilizar o serviço, o usuário concorda com as condições aqui estabelecidas.
        </p>
        <p className="text-muted-foreground text-sm">Última atualização: Março de 2026</p>
      </article>
    </div>
    <div className="flex-1" />
    <HelpCenterFooter />
  </div>
);

export default TermosDeUso;
