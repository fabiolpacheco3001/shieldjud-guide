export interface Article {
  title: string;
  section: string;
  slug: string;
  content: string;
  promoted?: boolean;
}

export interface Section {
  id: string;
  title: string;
  description: string;
  icon: string;
  articles: Article[];
}

export const sections: Section[] = [
  {
    id: "comecando",
    title: "Começando",
    description: "Artigos introdutórios sobre o ShieldJud, como funciona e seus limites.",
    icon: "Rocket",
    articles: [
      {
        title: "O que é o ShieldJud?",
        section: "comecando",
        slug: "o-que-e-o-shieldjud",
        promoted: true,
        content: `O **ShieldJud** é uma plataforma de análise jurídica assistida por inteligência artificial. Ela foi projetada para ajudar usuários a compreender processos judiciais com mais rapidez, gerando automaticamente artefatos analíticos a partir dos documentos processuais enviados.\n\nO ShieldJud não substitui o trabalho de profissionais do direito, mas atua como uma ferramenta de apoio para acelerar a leitura, organização e compreensão de peças processuais.`,
      },
      {
        title: "Para que serve o ShieldJud?",
        section: "comecando",
        slug: "para-que-serve",
        content: `O ShieldJud serve para:\n\n- **Analisar processos judiciais** de forma automatizada\n- **Gerar artefatos analíticos** como análise de admissibilidade, convergência com precedentes e mais\n- **Organizar sua biblioteca** de processos analisados\n- **Conversar sobre o processo** via chat com IA\n- **Gerar minutas assistidas** e podcasts do processo`,
      },
      {
        title: "Quais são os limites do ShieldJud?",
        section: "comecando",
        slug: "limites-do-shieldjud",
        content: `É importante entender que o ShieldJud:\n\n- **Não substitui aconselhamento jurídico** profissional\n- **Não garante precisão absoluta** nas análises — toda IA pode cometer erros\n- **Depende da qualidade dos documentos** enviados para gerar bons artefatos\n- **Opera dentro de limites de uso** definidos pelo plano contratado\n\nRecomendamos sempre revisar os artefatos gerados antes de utilizá-los em decisões profissionais.`,
      },
    ],
  },
  {
    id: "captura-de-processos",
    title: "Captura de Processos",
    description: "Como enviar processos para análise, incluindo upload e boas práticas.",
    icon: "Upload",
    articles: [
      {
        title: "Como enviar processos para análise",
        section: "captura-de-processos",
        slug: "como-enviar-processos",
        promoted: true,
        content: `Existem duas formas principais de enviar processos para o ShieldJud:\n\n1. **Upload manual**: Faça upload de arquivos PDF diretamente na plataforma\n2. **Extensão do Chrome**: Capture processos diretamente de portais judiciais\n\nPara o upload manual, acesse a área de captura e arraste seus arquivos ou clique para selecionar.`,
      },
      {
        title: "Boas práticas para envio de documentos",
        section: "captura-de-processos",
        slug: "boas-praticas-envio",
        content: `Para obter os melhores resultados nas análises:\n\n- **Envie documentos legíveis**: PDFs digitalizados com boa resolução\n- **Prefira PDFs com texto pesquisável** (OCR) em vez de imagens\n- **Inclua todas as peças relevantes** do processo\n- **Evite arquivos corrompidos** ou protegidos por senha\n- **Respeite os limites de tamanho** do seu plano`,
      },
    ],
  },
  {
    id: "extensao-chrome",
    title: "Extensão do Chrome",
    description: "Como instalar e usar a extensão para capturar processos de portais judiciais.",
    icon: "Globe",
    articles: [
      {
        title: "Como instalar a extensão do Chrome",
        section: "extensao-chrome",
        slug: "instalar-extensao",
        promoted: true,
        content: `Para instalar a extensão ShieldJud:\n\n1. Acesse a **Chrome Web Store**\n2. Pesquise por "ShieldJud"\n3. Clique em **Adicionar ao Chrome**\n4. Confirme a instalação na caixa de diálogo\n5. O ícone do ShieldJud aparecerá na barra de extensões\n\nA extensão é compatível com navegadores baseados em Chromium (Chrome, Edge, Brave).`,
      },
      {
        title: "Como conectar a extensão à sua conta",
        section: "extensao-chrome",
        slug: "conectar-extensao-conta",
        content: `Após instalar a extensão:\n\n1. Clique no ícone do ShieldJud na barra de extensões\n2. Insira seu **e-mail e senha** cadastrados na plataforma\n3. Clique em **Conectar**\n4. A extensão ficará vinculada à sua conta\n\nVocê só precisa fazer login uma vez. A sessão permanece ativa.`,
      },
      {
        title: "Capturando processos com a extensão",
        section: "extensao-chrome",
        slug: "captura-extensao",
        content: `Com a extensão conectada:\n\n1. Acesse o portal judicial desejado (ex: PJe, e-SAJ, PROJUDI)\n2. Navegue até o processo que deseja capturar\n3. Clique no ícone do ShieldJud\n4. Selecione **Capturar Processo**\n5. O processo será enviado para sua biblioteca automaticamente`,
      },
      {
        title: "Captura em lote",
        section: "extensao-chrome",
        slug: "captura-em-lote",
        content: `A captura em lote permite enviar múltiplos processos de uma vez:\n\n1. Na listagem do portal judicial, selecione os processos desejados\n2. Clique no ícone do ShieldJud\n3. Selecione **Captura em Lote**\n4. Confirme os processos selecionados\n5. Acompanhe o progresso na plataforma\n\n**Nota**: A captura em lote está disponível em planos específicos.`,
      },
      {
        title: "Problemas comuns na extensão",
        section: "extensao-chrome",
        slug: "problemas-extensao",
        content: `**A extensão não aparece na barra:**\n- Verifique se está fixada (clique no ícone de quebra-cabeça do Chrome)\n\n**Erro ao fazer login:**\n- Confirme que está usando as mesmas credenciais da plataforma\n- Tente desinstalar e reinstalar a extensão\n\n**Processo não é capturado:**\n- Verifique se o portal é compatível\n- Recarregue a página e tente novamente\n- Verifique sua conexão com a internet`,
      },
    ],
  },
  {
    id: "biblioteca",
    title: "Biblioteca do Usuário",
    description: "Organize, busque e gerencie seus processos analisados.",
    icon: "BookOpen",
    articles: [
      {
        title: "Organizando seus processos",
        section: "biblioteca",
        slug: "organizando-processos",
        content: `A Biblioteca é o espaço onde todos os seus processos analisados ficam armazenados. Você pode:\n\n- **Criar pastas** para organizar por tema, cliente ou tipo de processo\n- **Adicionar tags** para facilitar a busca\n- **Favoritar processos** importantes\n- **Ordenar** por data, nome ou status de análise`,
      },
      {
        title: "Busca e filtros",
        section: "biblioteca",
        slug: "busca-e-filtros",
        promoted: true,
        content: `Use a barra de busca para encontrar processos por:\n\n- **Número do processo**\n- **Nome das partes**\n- **Palavras-chave** no conteúdo\n- **Tags** atribuídas\n\nOs filtros avançados permitem refinar por data, status de análise, tipo de processo e mais.`,
      },
      {
        title: "Histórico de análises",
        section: "biblioteca",
        slug: "historico-analises",
        content: `Cada processo mantém um histórico completo das análises realizadas:\n\n- Data e hora de cada análise\n- Artefatos gerados em cada execução\n- Versões anteriores dos artefatos\n\nIsso permite acompanhar a evolução das análises ao longo do tempo.`,
      },
      {
        title: "Exclusão e arquivamento",
        section: "biblioteca",
        slug: "exclusao-arquivamento",
        content: `Você pode gerenciar seus processos de duas formas:\n\n- **Arquivar**: Move o processo para uma área separada, mantendo os dados\n- **Excluir**: Remove permanentemente o processo e todos os artefatos associados\n\n**Atenção**: A exclusão é irreversível. Recomendamos arquivar processos que não são mais necessários no momento.`,
      },
    ],
  },
  {
    id: "analises-artefatos",
    title: "Análises e Artefatos",
    description: "Entenda os artefatos analíticos gerados automaticamente pelo sistema.",
    icon: "BarChart3",
    articles: [
      {
        title: "Análise de Admissibilidade",
        section: "analises-artefatos",
        slug: "analise-admissibilidade",
        promoted: true,
        content: `A **Análise de Admissibilidade** verifica automaticamente se o processo atende aos requisitos formais e processuais para ser conhecido e julgado.\n\nO artefato identifica:\n- Pressupostos processuais\n- Condições da ação\n- Tempestividade\n- Legitimidade das partes\n- Interesse processual`,
      },
      {
        title: "Análise de Litigância Abusiva",
        section: "analises-artefatos",
        slug: "litigancia-abusiva",
        content: `Este artefato identifica indicadores de litigância abusiva ou temerária, analisando:\n\n- Padrões de repetição processual\n- Inconsistências nas alegações\n- Indicadores de má-fé processual\n- Histórico das partes`,
      },
      {
        title: "Convergência com Precedentes",
        section: "analises-artefatos",
        slug: "convergencia-precedentes",
        content: `O artefato de **Convergência com Precedentes** cruza os argumentos do processo com jurisprudência relevante:\n\n- Identifica precedentes do STF e STJ aplicáveis\n- Analisa convergência ou divergência com a tese apresentada\n- Sugere precedentes que fortalecem ou enfraquecem a argumentação`,
      },
      {
        title: "Análise Consolidada",
        section: "analises-artefatos",
        slug: "analise-consolidada",
        content: `A **Análise Consolidada** é um resumo executivo que reúne os principais pontos de todos os artefatos gerados:\n\n- Visão geral do processo\n- Pontos fortes e fracos identificados\n- Riscos mapeados\n- Recomendações gerais`,
      },
      {
        title: "Mapa de Raciocínio Jurídico",
        section: "analises-artefatos",
        slug: "mapa-raciocinio",
        content: `O **Mapa de Raciocínio Jurídico** apresenta visualmente a estrutura argumentativa do processo:\n\n- Conexão entre premissas e conclusões\n- Fluxo lógico dos argumentos\n- Identificação de lacunas argumentativas\n- Visualização interativa`,
      },
      {
        title: "Minuta Assistida",
        section: "analises-artefatos",
        slug: "minuta-assistida",
        content: `A **Minuta Assistida** gera rascunhos de peças processuais com base na análise do processo:\n\n- Geração automática de minutas\n- Fundamentação baseada nos precedentes identificados\n- Personalização e edição pelo usuário\n\n**Importante**: Toda minuta deve ser revisada por um profissional antes do uso.`,
      },
      {
        title: "Podcast do Processo",
        section: "analises-artefatos",
        slug: "podcast-processo",
        content: `O **Podcast do Processo** transforma a análise em um áudio narrado:\n\n- Resumo em formato de podcast\n- Ideal para ouvir durante deslocamentos\n- Disponível para download\n- Narração clara e objetiva dos principais pontos`,
      },
    ],
  },
  {
    id: "chat-conversacional",
    title: "Chat Conversacional",
    description: "Faça perguntas sobre seus processos analisados usando IA.",
    icon: "MessageCircle",
    articles: [
      {
        title: "Como usar o chat do processo",
        section: "chat-conversacional",
        slug: "como-usar-chat",
        promoted: true,
        content: `O **Chat Conversacional** permite que você faça perguntas diretamente sobre o processo analisado:\n\n1. Abra um processo na sua biblioteca\n2. Clique na aba **Chat**\n3. Digite sua pergunta em linguagem natural\n4. A IA responderá com base no conteúdo do processo\n\nExemplos de perguntas:\n- "Quais são os pedidos do autor?"\n- "Existe algum risco de inadmissibilidade?"\n- "Quais precedentes foram citados na petição inicial?"`,
      },
      {
        title: "Dicas para melhores respostas",
        section: "chat-conversacional",
        slug: "dicas-chat",
        content: `Para obter respostas mais precisas:\n\n- **Seja específico** nas perguntas\n- **Referencie peças processuais** quando possível\n- **Faça perguntas diretas** em vez de genéricas\n- **Use o contexto** de perguntas anteriores na conversa\n\nO chat mantém o contexto da conversa, então você pode fazer perguntas de acompanhamento.`,
      },
    ],
  },
  {
    id: "planos-assinaturas",
    title: "Planos e Assinaturas",
    description: "Informações sobre planos, limites e gestão da assinatura.",
    icon: "CreditCard",
    articles: [
      {
        title: "Planos disponíveis",
        section: "planos-assinaturas",
        slug: "planos-disponiveis",
        content: `O ShieldJud oferece diferentes planos para atender às suas necessidades:\n\n- **Gratuito**: Acesso limitado para experimentar a plataforma\n- **Profissional**: Para uso individual com mais análises e artefatos\n- **Equipe**: Para escritórios e equipes com recursos compartilhados\n- **Empresarial**: Solução personalizada para grandes organizações\n\nCada plano tem limites específicos de processos, análises e artefatos.`,
      },
      {
        title: "Como gerenciar sua assinatura",
        section: "planos-assinaturas",
        slug: "gerenciar-assinatura",
        content: `Para gerenciar sua assinatura:\n\n1. Acesse **Configurações** no menu principal\n2. Clique em **Plano e Assinatura**\n3. Visualize seu plano atual e uso\n4. Faça upgrade, downgrade ou cancele\n\nAlterações de plano são aplicadas no próximo ciclo de cobrança.`,
      },
    ],
  },
  {
    id: "seguranca-privacidade",
    title: "Segurança e Privacidade",
    description: "Como seus documentos e dados são protegidos no ShieldJud.",
    icon: "Shield",
    articles: [
      {
        title: "Como seus dados são protegidos",
        section: "seguranca-privacidade",
        slug: "protecao-dados",
        promoted: true,
        content: `O ShieldJud adota medidas rigorosas de segurança:\n\n- **Criptografia em trânsito** (TLS/SSL) e em repouso\n- **Armazenamento seguro** em infraestrutura de nuvem certificada\n- **Controle de acesso** por autenticação segura\n- **Logs de auditoria** para rastreamento de ações\n- **Conformidade** com a LGPD (Lei Geral de Proteção de Dados)\n\nSeus documentos são acessíveis apenas por você e não são compartilhados com terceiros.`,
      },
      {
        title: "Política de armazenamento",
        section: "seguranca-privacidade",
        slug: "politica-armazenamento",
        content: `Sobre o armazenamento de seus documentos:\n\n- Documentos são armazenados pelo tempo em que sua conta estiver ativa\n- Processos excluídos são removidos permanentemente em até 30 dias\n- Backups são realizados regularmente\n- Você pode solicitar a exclusão de todos os seus dados a qualquer momento`,
      },
    ],
  },
  {
    id: "problemas-comuns",
    title: "Problemas Comuns",
    description: "Soluções para dúvidas frequentes e problemas técnicos.",
    icon: "HelpCircle",
    articles: [
      {
        title: "Não consigo fazer login",
        section: "problemas-comuns",
        slug: "problema-login",
        content: `Se você não consegue fazer login:\n\n1. **Verifique suas credenciais** — confirme e-mail e senha\n2. **Redefina sua senha** clicando em "Esqueci minha senha"\n3. **Verifique seu e-mail** — pode haver uma confirmação pendente\n4. **Limpe o cache** do navegador\n5. **Tente outro navegador**\n\nSe o problema persistir, entre em contato com o suporte.`,
      },
      {
        title: "Análise não é gerada",
        section: "problemas-comuns",
        slug: "analise-nao-gerada",
        content: `Se uma análise não está sendo gerada:\n\n- **Verifique o formato** do arquivo (deve ser PDF)\n- **Confirme que o arquivo não está corrompido**\n- **Verifique seu limite de análises** no plano atual\n- **Aguarde** — processos grandes podem levar mais tempo\n- **Tente reenviar** o processo\n\nAnalises complexas podem levar alguns minutos para serem concluídas.`,
      },
      {
        title: "Página carrega lentamente",
        section: "problemas-comuns",
        slug: "pagina-lenta",
        content: `Para melhorar o desempenho:\n\n- **Verifique sua conexão** com a internet\n- **Limpe o cache** do navegador\n- **Desative extensões** que possam interferir\n- **Use um navegador atualizado** (Chrome, Firefox, Edge)\n- **Tente em modo anônimo** para descartar conflitos\n\nSe o problema persistir em diferentes dispositivos, pode ser uma questão temporária do servidor.`,
      },
    ],
  },
];

export function getAllArticles(): Article[] {
  return sections.flatMap((s) => s.articles);
}

export function getPromotedArticles(): Article[] {
  return getAllArticles().filter((a) => a.promoted);
}

export function getArticleBySlug(slug: string): Article | undefined {
  return getAllArticles().find((a) => a.slug === slug);
}

export function getSectionById(id: string): Section | undefined {
  return sections.find((s) => s.id === id);
}
