import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import HelpCenterHeader from "@/components/HelpCenterHeader";
import HelpCenterFooter from "@/components/HelpCenterFooter";
import { getArticleBySlug, getSectionById } from "@/data/helpCenterData";

const ArticlePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const article = getArticleBySlug(slug || "");

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <HelpCenterHeader />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-muted-foreground">Artigo não encontrado.</p>
        </div>
        <HelpCenterFooter />
      </div>
    );
  }

  const section = getSectionById(article.section);

  // Simple markdown-like rendering
  const renderContent = (content: string) => {
    return content.split("\n").map((line, i) => {
      if (line.startsWith("## ")) {
        return (
          <h2 key={i} className="text-xl font-display font-bold text-foreground mt-6 mb-3">
            {line.replace("## ", "")}
          </h2>
        );
      }
      if (line.startsWith("- **")) {
        const match = line.match(/- \*\*(.+?)\*\*:?\s*(.*)/);
        if (match) {
          return (
            <li key={i} className="text-foreground mb-2 ml-4 list-disc">
              <strong>{match[1]}</strong>
              {match[2] && <>: {match[2]}</>}
            </li>
          );
        }
      }
      if (line.startsWith("- ")) {
        return (
          <li key={i} className="text-foreground mb-2 ml-4 list-disc">
            {line.replace("- ", "")}
          </li>
        );
      }
      if (/^\d+\.\s/.test(line)) {
        const text = line.replace(/^\d+\.\s/, "");
        // Handle bold within numbered list
        const parts = text.split(/\*\*(.+?)\*\*/g);
        return (
          <li key={i} className="text-foreground mb-2 ml-4 list-decimal">
            {parts.map((part, j) => (j % 2 === 1 ? <strong key={j}>{part}</strong> : part))}
          </li>
        );
      }
      if (line.trim() === "") return <div key={i} className="h-3" />;
      // Handle inline bold
      const parts = line.split(/\*\*(.+?)\*\*/g);
      return (
        <p key={i} className="text-foreground leading-relaxed mb-2">
          {parts.map((part, j) => (j % 2 === 1 ? <strong key={j}>{part}</strong> : part))}
        </p>
      );
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <HelpCenterHeader />
      <div className="container max-w-3xl mx-auto py-10 px-4">
        <button
          onClick={() => (section ? navigate(`/secao/${section.id}`) : navigate("/"))}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft size={16} />
          {section ? `Voltar para ${section.title}` : "Voltar"}
        </button>

        <article
          className="bg-card rounded-2xl p-6 md:p-10 border border-border"
          style={{ boxShadow: "var(--card-shadow)" }}
        >
          {section && (
            <span className="text-xs font-medium text-secondary-foreground bg-secondary px-3 py-1 rounded-full">
              {section.title}
            </span>
          )}
          <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground mt-4 mb-6">
            {article.title}
          </h1>
          <div className="prose-sm">{renderContent(article.content)}</div>
        </article>
      </div>
      <div className="flex-1" />
      <HelpCenterFooter />
    </div>
  );
};

export default ArticlePage;
