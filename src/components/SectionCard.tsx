import { useNavigate } from "react-router-dom";
import { icons } from "lucide-react";
import type { Section } from "@/data/helpCenterData";

interface SectionCardProps {
  section: Section;
  index: number;
}

const SectionCard = ({ section, index }: SectionCardProps) => {
  const navigate = useNavigate();
  const IconComponent = icons[section.icon as keyof typeof icons];

  return (
    <div
      className="section-icon-card flex flex-col items-center text-center"
      style={{ animationDelay: `${index * 0.06}s` }}
      onClick={() => navigate(`/secao/${section.id}`)}
    >
      <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center mb-4">
        {IconComponent && (
          <IconComponent className="text-secondary-foreground" size={32} />
        )}
      </div>
      <h3 className="font-display font-semibold text-lg text-foreground mb-2">
        {section.title}
      </h3>
      <p className="text-sm text-muted-foreground leading-relaxed">
        {section.description}
      </p>
      <span className="mt-3 text-xs font-medium text-secondary-foreground">
        {section.articles.length} {section.articles.length === 1 ? "artigo" : "artigos"}
      </span>
    </div>
  );
};

export default SectionCard;
