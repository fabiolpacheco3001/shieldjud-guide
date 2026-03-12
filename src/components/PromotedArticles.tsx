import { useNavigate } from "react-router-dom";
import { Star, ArrowRight } from "lucide-react";
import { getPromotedArticles } from "@/data/helpCenterData";

const PromotedArticles = () => {
  const promoted = getPromotedArticles();
  const navigate = useNavigate();

  return (
    <div className="w-full py-12 px-4">
      <div className="container max-w-5xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center">
            <Star className="text-secondary-foreground" size={20} />
          </div>
          <h2 className="text-2xl font-display font-bold text-foreground">
            Artigos Promovidos
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {promoted.map((article) => (
            <button
              key={article.slug}
              onClick={() => navigate(`/artigo/${article.slug}`)}
              className="flex items-center justify-between p-5 rounded-xl bg-card border border-border hover:border-primary/20 transition-all group text-left"
              style={{ boxShadow: "var(--card-shadow)" }}
            >
              <div>
                <p className="font-medium text-foreground group-hover:text-secondary-foreground transition-colors">
                  {article.title}
                </p>
                <p className="text-xs text-muted-foreground mt-1 capitalize">
                  {article.section.replace(/-/g, " ")}
                </p>
              </div>
              <ArrowRight
                size={18}
                className="text-muted-foreground group-hover:text-secondary-foreground transition-colors flex-shrink-0 ml-4"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PromotedArticles;
