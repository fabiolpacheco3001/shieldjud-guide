import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { icons } from "lucide-react";
import HelpCenterHeader from "@/components/HelpCenterHeader";
import HelpCenterFooter from "@/components/HelpCenterFooter";
import { getSectionById } from "@/data/helpCenterData";
import { getArticlesBySection } from "@/lib/articleLoader";

const SectionPage = () => {
  const { sectionId } = useParams<{ sectionId: string }>();
  const navigate = useNavigate();
  const section = getSectionById(sectionId || "");
  const articles = getArticlesBySection(sectionId || "");

  if (!section) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <HelpCenterHeader />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-muted-foreground">Seção não encontrada.</p>
        </div>
        <HelpCenterFooter />
      </div>
    );
  }

  const IconComponent = icons[section.icon as keyof typeof icons];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <HelpCenterHeader />
      <div className="container max-w-3xl mx-auto py-10 px-4">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft size={16} />
          Voltar à Central de Ajuda
        </button>

        <div className="flex items-center gap-4 mb-8">
          <div className="w-14 h-14 rounded-2xl bg-secondary flex items-center justify-center">
            {IconComponent && <IconComponent className="text-secondary-foreground" size={28} />}
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground">
              {section.title}
            </h1>
            <p className="text-muted-foreground text-sm mt-1">{section.description}</p>
          </div>
        </div>

        {articles.length === 0 ? (
          <p className="text-muted-foreground">Nenhum artigo disponível nesta seção ainda.</p>
        ) : (
          <div className="flex flex-col gap-3">
            {articles.map((article) => (
              <button
                key={article.slug}
                onClick={() => navigate(`/artigo/${article.slug}`)}
                className="flex items-center justify-between p-5 rounded-xl bg-card border border-border hover:border-primary/20 transition-all group text-left"
                style={{ boxShadow: "var(--card-shadow)" }}
              >
                <p className="font-medium text-foreground group-hover:text-secondary-foreground transition-colors">
                  {article.title}
                </p>
                <ArrowRight size={18} className="text-muted-foreground group-hover:text-secondary-foreground transition-colors flex-shrink-0 ml-4" />
              </button>
            ))}
          </div>
        )}
      </div>
      <div className="flex-1" />
      <HelpCenterFooter />
    </div>
  );
};

export default SectionPage;
