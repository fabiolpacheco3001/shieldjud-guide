import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import HeroSearch from "@/components/HeroSearch";
import SectionCard from "@/components/SectionCard";
import PromotedArticles from "@/components/PromotedArticles";
import HelpCenterHeader from "@/components/HelpCenterHeader";
import HelpCenterFooter from "@/components/HelpCenterFooter";
import { sections } from "@/data/helpCenterData";
import { searchArticles } from "@/lib/articleLoader";
import { ArrowRight } from "lucide-react";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const searchResults = useMemo(() => {
    return searchArticles(searchQuery);
  }, [searchQuery]);

  const showSearch = searchQuery.trim().length > 0;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <HelpCenterHeader />
      <HeroSearch searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      {showSearch ? (
        <div className="container max-w-3xl mx-auto py-8 px-4">
          <p className="text-sm text-muted-foreground mb-4">
            {searchResults.length} resultado{searchResults.length !== 1 && "s"} encontrado{searchResults.length !== 1 && "s"}
          </p>
          {searchResults.length === 0 ? (
            <p className="text-muted-foreground">Nenhum artigo encontrado. Tente outros termos.</p>
          ) : (
            <div className="flex flex-col gap-3">
              {searchResults.map(({ article, matchType }) => (
                <button
                  key={article.slug}
                  onClick={() => navigate(`/artigo/${article.slug}`)}
                  className="flex items-center justify-between p-4 rounded-xl bg-card border border-border hover:border-primary/20 transition-all group text-left"
                >
                  <div>
                    <p className="font-medium text-foreground">{article.title}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-muted-foreground capitalize">
                        {article.section.replace(/-/g, " ")}
                      </span>
                      {matchType === "title" && (
                        <span className="text-xs bg-secondary text-secondary-foreground px-2 py-0.5 rounded-full">
                          título
                        </span>
                      )}
                      {matchType === "keyword" && (
                        <span className="text-xs bg-secondary text-secondary-foreground px-2 py-0.5 rounded-full">
                          palavra-chave
                        </span>
                      )}
                    </div>
                  </div>
                  <ArrowRight size={16} className="text-muted-foreground group-hover:text-secondary-foreground flex-shrink-0" />
                </button>
              ))}
            </div>
          )}
        </div>
      ) : (
        <>
          <div className="container max-w-5xl mx-auto py-12 px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {sections.map((section, i) => (
                <SectionCard key={section.id} section={section} index={i} />
              ))}
            </div>
          </div>
          <PromotedArticles />
        </>
      )}

      <div className="flex-1" />
      <HelpCenterFooter />
    </div>
  );
};

export default Index;
