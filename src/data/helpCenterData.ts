export interface Article {
  title: string;
  section: string;
  slug: string;
  content: string;
  promoted?: boolean;
  keywords?: string[];
}

export interface Section {
  id: string;
  title: string;
  description: string;
  icon: string;
}

// Section definitions (articles are loaded dynamically from markdown files)
export const sections: Section[] = [
  {
    id: "comecando",
    title: "Começando",
    description: "Artigos introdutórios sobre o ShieldJud, como funciona e seus limites.",
    icon: "Rocket",
  },
  {
    id: "captura-processos",
    title: "Captura de Processos",
    description: "Como enviar processos para análise, incluindo upload e boas práticas.",
    icon: "Upload",
  },
  {
    id: "extensao-chrome",
    title: "Extensão do Chrome",
    description: "Como instalar e usar a extensão para capturar processos de portais judiciais.",
    icon: "Globe",
  },
  {
    id: "biblioteca-usuario",
    title: "Biblioteca do Usuário",
    description: "Organize, busque e gerencie seus processos analisados.",
    icon: "BookOpen",
  },
  {
    id: "analises-artefatos",
    title: "Análises e Artefatos",
    description: "Entenda os artefatos analíticos gerados automaticamente pelo sistema.",
    icon: "BrainCircuit",
  },
  {
    id: "chat",
    title: "Chat Conversacional",
    description: "Faça perguntas sobre seus processos analisados usando IA.",
    icon: "MessageCircle",
  },
  {
    id: "planos",
    title: "Planos e Assinaturas",
    description: "Informações sobre planos, limites e gestão da assinatura.",
    icon: "CreditCard",
  },
  {
    id: "seguranca",
    title: "Segurança e Privacidade",
    description: "Como seus documentos e dados são protegidos no ShieldJud.",
    icon: "Shield",
  },
  {
    id: "problemas",
    title: "Problemas Comuns",
    description: "Soluções para dúvidas frequentes e problemas técnicos.",
    icon: "CircleAlert",
  },
];

export function getSectionById(id: string): Section | undefined {
  return sections.find((s) => s.id === id);
}
