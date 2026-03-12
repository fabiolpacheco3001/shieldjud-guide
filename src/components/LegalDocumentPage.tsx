import { ArrowLeft, Download, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";
import HelpCenterHeader from "@/components/HelpCenterHeader";
import HelpCenterFooter from "@/components/HelpCenterFooter";

export interface DocumentVersion {
  version: string;
  date: string;
  label: string;
  downloadUrl: string;
  fileType: string;
}

interface LegalDocumentPageProps {
  title: string;
  lastUpdate: string;
  currentVersion: string;
  content: string;
  versions: DocumentVersion[];
}

function renderMarkdown(content: string) {
  return content.split("\n").map((line, i) => {
    if (line.startsWith("## ")) {
      return (
        <h2 key={i} className="text-xl font-display font-bold text-foreground mt-8 mb-3">
          {line.replace("## ", "")}
        </h2>
      );
    }
    if (line.startsWith("### ")) {
      return (
        <h3 key={i} className="text-lg font-display font-semibold text-foreground mt-6 mb-2">
          {line.replace("### ", "")}
        </h3>
      );
    }
    if (line.startsWith("- ")) {
      const text = line.replace("- ", "");
      const parts = text.split(/\*\*(.+?)\*\*/g);
      return (
        <li key={i} className="text-foreground mb-2 ml-6 list-disc">
          {parts.map((part, j) => (j % 2 === 1 ? <strong key={j}>{part}</strong> : part))}
        </li>
      );
    }
    if (/^\d+\.\s/.test(line)) {
      const text = line.replace(/^\d+\.\s/, "");
      const parts = text.split(/\*\*(.+?)\*\*/g);
      return (
        <li key={i} className="text-foreground mb-2 ml-6 list-decimal">
          {parts.map((part, j) => (j % 2 === 1 ? <strong key={j}>{part}</strong> : part))}
        </li>
      );
    }
    if (line.trim() === "") return <div key={i} className="h-3" />;
    const parts = line.split(/\*\*(.+?)\*\*/g);
    return (
      <p key={i} className="text-foreground leading-relaxed mb-2">
        {parts.map((part, j) => (j % 2 === 1 ? <strong key={j}>{part}</strong> : part))}
      </p>
    );
  });
}

const LegalDocumentPage = ({ title, lastUpdate, currentVersion, content, versions }: LegalDocumentPageProps) => {
  const navigate = useNavigate();

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

        <article
          className="bg-card rounded-2xl p-6 md:p-10 border border-border"
          style={{ boxShadow: "var(--card-shadow)" }}
        >
          <div className="flex items-center gap-3 mb-2">
            <span className="text-xs font-medium text-secondary-foreground bg-secondary px-3 py-1 rounded-full">
              Versão {currentVersion}
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground mt-3 mb-1">
            {title}
          </h1>
          <p className="text-sm text-muted-foreground mb-8">Última atualização: {lastUpdate}</p>

          <div className="prose-sm">{renderMarkdown(content)}</div>
        </article>

        {/* Version history */}
        <div className="mt-10">
          <h2 className="text-xl font-display font-bold text-foreground mb-4">
            Versões do documento
          </h2>
          <div className="flex flex-col gap-3">
            {versions.map((v) => (
              <a
                key={v.version}
                href={v.downloadUrl}
                download
                className="flex items-center justify-between p-4 rounded-xl bg-card border border-border hover:border-primary/20 transition-all group"
                style={{ boxShadow: "var(--card-shadow)" }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                    <FileText className="text-secondary-foreground" size={20} />
                  </div>
                  <div>
                    <p className="font-medium text-foreground group-hover:text-secondary-foreground transition-colors">
                      {v.label}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Versão {v.version} · {v.date} · {v.fileType.toUpperCase()}
                    </p>
                  </div>
                </div>
                <Download size={18} className="text-muted-foreground group-hover:text-secondary-foreground transition-colors flex-shrink-0" />
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="flex-1" />
      <HelpCenterFooter />
    </div>
  );
};

export default LegalDocumentPage;
