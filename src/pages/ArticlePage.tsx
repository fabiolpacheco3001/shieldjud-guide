import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useMemo } from "react";
import { ArrowLeft, Lightbulb, AlertTriangle, Info } from "lucide-react";
import HelpCenterHeader from "@/components/HelpCenterHeader";
import HelpCenterFooter from "@/components/HelpCenterFooter";
import ArticleFeedback from "@/components/ArticleFeedback";
import { getSectionById } from "@/data/helpCenterData";
import { getArticleBySlug } from "@/lib/articleLoader";
import { trackArticleView } from "@/lib/articleViews";

/** Parse inline markdown: **bold**, `code`, [link](url) */
const renderInline = (text: string) => {
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g);
  return parts.map((part, j) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={j}>{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code key={j} className="bg-muted text-foreground px-1.5 py-0.5 rounded text-sm font-mono">
          {part.slice(1, -1)}
        </code>
      );
    }
    const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (linkMatch) {
      return (
        <a
          key={j}
          href={linkMatch[2]}
          target={linkMatch[2].startsWith("http") ? "_blank" : undefined}
          rel={linkMatch[2].startsWith("http") ? "noopener noreferrer" : undefined}
          className="text-primary underline underline-offset-2 hover:text-primary/80 transition-colors"
        >
          {linkMatch[1]}
        </a>
      );
    }
    return part;
  });
};

/** Extract headings for TOC */
function extractHeadings(content: string) {
  const headings: { level: number; text: string; id: string }[] = [];
  for (const line of content.split("\n")) {
    const match = line.match(/^(#{2,3})\s+(.+)/);
    if (match) {
      const text = match[2].trim();
      const id = text
        .toLowerCase()
        .replace(/[^\w\sà-ú]/g, "")
        .replace(/\s+/g, "-");
      headings.push({ level: match[1].length, text, id });
    }
  }
  return headings;
}

/** Detect callout blocks */
function parseCallout(line: string) {
  const calloutMatch = line.match(/^>\s*(💡|⚠️|ℹ️|🔔|Dica:|Atenção:|Aviso:|Info:|Importante:)\s*(.*)/i);
  if (!calloutMatch) return null;
  const indicator = calloutMatch[1].toLowerCase();
  const text = calloutMatch[2] || "";
  if (indicator.includes("💡") || indicator.includes("dica")) return { type: "tip" as const, text };
  if (indicator.includes("⚠") || indicator.includes("atenção") || indicator.includes("aviso") || indicator.includes("importante")) return { type: "warning" as const, text };
  return { type: "info" as const, text };
}

const calloutStyles = {
  tip: { bg: "bg-accent/30", border: "border-accent", icon: Lightbulb, label: "Dica" },
  warning: { bg: "bg-destructive/10", border: "border-destructive/40", icon: AlertTriangle, label: "Atenção" },
  info: { bg: "bg-primary/10", border: "border-primary/30", icon: Info, label: "Informação" },
};

const ArticlePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const article = getArticleBySlug(slug || "");

  useEffect(() => {
    if (slug) trackArticleView(slug);
  }, [slug]);

  const headings = useMemo(
    () => (article ? extractHeadings(article.content) : []),
    [article]
  );

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

  const renderContent = (content: string) => {
    return content.split("\n").map((line, i) => {
      if (line.trim() === "---") {
        return <hr key={i} className="my-4 border-border" />;
      }

      const callout = parseCallout(line);
      if (callout) {
        const style = calloutStyles[callout.type];
        const Icon = style.icon;
        return (
          <div key={i} className={`${style.bg} border-l-4 ${style.border} rounded-r-lg p-3 my-3 flex gap-3 items-start`}>
            <Icon size={16} className="mt-0.5 shrink-0 text-foreground" />
            <div>
              <span className="font-semibold text-foreground text-sm">{style.label}</span>
              <p className="text-foreground text-sm mt-0.5">{renderInline(callout.text)}</p>
            </div>
          </div>
        );
      }

      if (line.startsWith("> ")) {
        return (
          <blockquote key={i} className="border-l-4 border-muted-foreground/30 pl-4 py-0.5 my-2 text-muted-foreground italic">
            {renderInline(line.slice(2))}
          </blockquote>
        );
      }

      if (line.startsWith("## ")) {
        const text = line.replace("## ", "");
        const id = text.toLowerCase().replace(/[^\w\sà-ú]/g, "").replace(/\s+/g, "-");
        return (
          <h2 key={i} id={id} className="text-xl font-display font-bold text-foreground mt-6 mb-2 scroll-mt-20">
            {text}
          </h2>
        );
      }

      if (line.startsWith("### ")) {
        const text = line.replace("### ", "");
        const id = text.toLowerCase().replace(/[^\w\sà-ú]/g, "").replace(/\s+/g, "-");
        return (
          <h3 key={i} id={id} className="text-lg font-display font-bold text-foreground mt-4 mb-1.5 scroll-mt-20">
            {text}
          </h3>
        );
      }

      if (line.startsWith("- **")) {
        const match = line.match(/- \*\*(.+?)\*\*:?\s*(.*)/);
        if (match) {
          return (
            <li key={i} className="text-foreground mb-1 ml-4 list-disc">
              <strong>{match[1]}</strong>
              {match[2] && <>{match[2].startsWith(":") ? match[2] : `: ${match[2]}`}</>}
            </li>
          );
        }
      }

      if (line.startsWith("- ")) {
        return (
          <li key={i} className="text-foreground mb-1 ml-4 list-disc">
            {renderInline(line.replace("- ", ""))}
          </li>
        );
      }

      if (/^\d+\.\s/.test(line)) {
        const text = line.replace(/^\d+\.\s/, "");
        return (
          <li key={i} className="text-foreground mb-1 ml-4 list-decimal">
            {renderInline(text)}
          </li>
        );
      }

      if (line.trim() === "") return <div key={i} className="h-1.5" />;

      return (
        <p key={i} className="text-foreground leading-relaxed mb-1">
          {renderInline(line)}
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
          <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground mt-4 mb-4">
            {article.title}
          </h1>

          {headings.length >= 3 && (
            <nav className="bg-muted/50 border border-border rounded-xl p-4 mb-6">
              <p className="text-sm font-semibold text-foreground mb-2">Neste artigo</p>
              <ul className="space-y-1">
                {headings.map((h, i) => (
                  <li key={i} className={h.level === 3 ? "ml-4" : ""}>
                    <a
                      href={`#${h.id}`}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {h.text}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          )}

          <div className="prose-sm">{renderContent(article.content)}</div>

          {/* Feedback: like/dislike + comments */}
          <ArticleFeedback slug={slug || ""} />
        </article>
      </div>
      <div className="flex-1" />
      <HelpCenterFooter />
    </div>
  );
};

export default ArticlePage;
