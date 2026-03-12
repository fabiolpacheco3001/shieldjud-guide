import LegalDocumentPage from "@/components/LegalDocumentPage";
import type { DocumentVersion } from "@/components/LegalDocumentPage";

const versions: DocumentVersion[] = [
  {
    version: "1.0",
    date: "03/03/2026",
    label: "Termo de Uso — ShieldJud v1.0",
    downloadUrl: "/docs/termos-de-uso-v1.0.pdf",
    fileType: "pdf",
  },
];

const content = `## 1. OBJETO E NATUREZA JURÍDICA

1.1. O presente Termo regula o acesso e utilização do aplicativo ShieldJud – IA Jurídica para Análise Processual, solução tecnológica disponibilizada pela Softplan.

1.2. O ShieldJud consiste em sistema baseado em técnicas de inteligência artificial destinado a apoio técnico-analítico, com funcionalidades de:

- 1.2.1. leitura estruturada de processos;
- 1.2.2. análise de admissibilidade;
- 1.2.3. identificação de padrões indicativos de litigância abusiva;
- 1.2.4. mapeamento de convergência com precedentes;
- 1.2.5. organização visual estruturada;
- 1.2.6. interação conversacional contextualizada;
- 1.2.7. elaboração assistida de minutas.

1.3. O ShieldJud possui natureza estritamente assistiva, sendo vedada sua utilização como instrumento autônomo de tomada de decisão judicial ou administrativa.

## 2. ADERÊNCIA REGULATÓRIA E GOVERNANÇA DE IA

2.1. O ShieldJud foi desenvolvido em conformidade com a Resolução CNJ nº 615/2025, observando especialmente:

- 2.1.1. supervisão humana efetiva;
- 2.1.2. transparência e explicabilidade;
- 2.1.3. rastreabilidade de interações;
- 2.1.4. auditabilidade técnica;
- 2.1.5. prevenção de vieses discriminatórios;
- 2.1.6. vedação à decisão automatizada vinculante.

2.2. A Plataforma não:

- 2.2.1. substitui o magistrado ou operador do Direito;
- 2.2.2. realiza juízo decisório autônomo;
- 2.2.3. classifica pessoas com base em atributos pessoais;
- 2.2.4. realiza ranqueamento de partes ou previsão comportamental;
- 2.2.5. executa finalidades vedadas pelo art. 10 da Resolução 615/2025.

2.3. O usuário reconhece que:

- 2.3.1. permanece integralmente responsável por decisões adotadas;
- 2.3.2. deve revisar criticamente todos os outputs;
- 2.3.3. não pode delegar à IA o dever constitucional de fundamentação.

## 3. CATEGORIZAÇÃO DE RISCO E USO ADEQUADO

3.1. O ShieldJud destina-se a atividades de suporte à decisão, podendo ser enquadrado como ferramenta de risco controlado, conforme critérios da Resolução 615/2025.

3.2. É expressamente vedado:

- 3.2.1. utilizar a Plataforma para finalidades classificadas como risco excessivo;
- 3.2.2. submeter dados sigilosos sem anonimização adequada;
- 3.2.3. utilizar outputs como fundamento exclusivo de decisão judicial;
- 3.2.4. empregar a solução para profiling pessoal ou análise biométrica.

## 4. SUPERVISÃO HUMANA OBRIGATÓRIA

4.1. Toda utilização do Shield deve observar supervisão humana contínua.

4.2. O usuário compromete-se a:

- 4.2.1. revisar integralmente minutas geradas;
- 4.2.2. verificar citações normativas e precedentes;
- 4.2.3. validar aderência fática;
- 4.2.4. corrigir eventuais inconsistências.

4.3. A Softplan não se responsabiliza por decisões adotadas sem revisão humana adequada.

## 5. DADOS PESSOAIS E CONFORMIDADE COM A LGPD

5.1. O tratamento de dados pessoais observa a Lei nº 13.709/2018 (LGPD) e o Aviso de Privacidade do Shield.

5.2. Softplan atua como:

- 5.2.1. controladora dos dados cadastrais e de uso;
- 5.2.2. operadora em relação aos dados processuais inseridos pelo usuário.

5.3. Os dados processuais:

- 5.3.1. não são utilizados para treinamento de modelos;
- 5.3.2. não são incorporados a bases próprias;
- 5.3.3. não são compartilhados entre clientes;
- 5.3.4. não são utilizados para fins comerciais.

5.4. É responsabilidade exclusiva do usuário:

- 5.4.1. garantir base legal para inserção dos dados;
- 5.4.2. anonimizar dados sigilosos quando aplicável;
- 5.4.3. observar segredo de justiça;
- 5.4.4. cumprir normativas internas do tribunal ou órgão.

## 6. SEGURANÇA DA INFORMAÇÃO

6.1. A Plataforma adota:

- 6.1.1. criptografia em trânsito e repouso;
- 6.1.2. controle de acesso baseado em perfil;
- 6.1.3. registro de logs auditáveis;
- 6.1.4. segregação lógica entre clientes;
- 6.1.5. monitoramento contínuo;
- 6.1.6. práticas de privacy by design e privacy by default.

6.2. Em caso de incidente de segurança imputável à Softplan, serão observados os deveres legais de comunicação à autoridade competente e aos titulares.

## 7. PROPRIEDADE INTELECTUAL

7.1. São de titularidade exclusiva da Softplan: código-fonte; arquitetura; modelos algorítmicos; marca Shield; documentação técnica.

7.2. O usuário mantém titularidade sobre: documentos inseridos; dados próprios; minutas elaboradas a partir de suas interações.

7.3. É vedado ao usuário: engenharia reversa; uso dos outputs para treinamento de modelos concorrentes.

## 8. LIMITAÇÃO DE RESPONSABILIDADE

8.1. A Softplan não responde por: perdas de prazo; uso inadequado da ferramenta; decisões judiciais fundamentadas exclusivamente na IA; inserção indevida de dados sigilosos pelo usuário.

8.2. A responsabilidade final pela utilização do conteúdo gerado é exclusivamente do usuário.

8.3. A plataforma é disponibilizada "como está", podendo sofrer atualizações, ajustes ou descontinuações.

## 9. PLANOS E LIMITAÇÕES OPERACIONAIS

9.1. 1 (uma) transação corresponde a 1 (uma) petição inicial e até 40 anexos.

9.2. Créditos mensais não são cumulativos.

9.3. O plano Gabinete permite: 1 gestor + até 3 usuários; biblioteca compartilhada; controle centralizado de acessos.

9.4. Credenciais são pessoais e intransferíveis.

## 10. INTEGRAÇÃO COM TECNOLOGIAS DE TERCEIROS

10.1. O Shield poderá utilizar modelos de linguagem de terceiros, observadas as diretrizes do art. 19 e 20 da Resolução 615/2025.

10.2. Caso haja uso de tecnologia externa:

- 10.2.1. os dados não serão utilizados para treinamento externo;
- 10.2.2. cláusulas contratuais exigirão conformidade com legislação brasileira;
- 10.2.3. será assegurada rastreabilidade mínima necessária.

## 11. AUDITORIA E MONITORAMENTO

11.1. A Softplan poderá manter registros técnicos para: auditoria; melhoria de desempenho; prevenção de fraude; conformidade regulatória.

11.2. Quando aplicável, relatórios técnicos poderão ser disponibilizados à autoridade institucional contratante.

## 12. RESPONSABILIDADE DO USUÁRIO

12.1. É obrigação do usuário:

- 12.1.1. apresentar informações verdadeiras e se responsabilizar pelas possíveis consequências de erros e omissões;
- 12.1.2. observar o estabelecido no presente termo;
- 12.1.3. manter o sigilo da senha, que deve ser pessoal e intransferível;
- 12.1.4. reparação de todos e quaisquer danos, diretos ou indiretos (inclusive decorrentes de violação de quaisquer direitos de terceiros, inclusive direitos de propriedade intelectual, de sigilo e de personalidade), que sejam a partir de seu acesso ao aplicativo;
- 12.1.5. respeitar todos os direitos de propriedade intelectual e os decorrentes da proteção de marcas, patentes e/ou desenhos industriais, depositados ou registrados, bem como todos os direitos referentes a terceiros que porventura estejam, ou estiverem de alguma forma, disponíveis no serviço;
- 12.1.6. não utilização do serviço para finalidades comerciais, publicitárias ou qualquer outra que contrarie a finalidade para a qual foi concebido, conforme definido neste documento, sob pena de sujeição às sanções cabíveis na Lei nº 9.610, de 19 de fevereiro de 1998, que protege os direitos autorais no Brasil.

12.2. O usuário assume toda e qualquer responsabilidade, de caráter civil e/ou criminal, pela utilização indevida das informações, textos, gráficos, marcas, imagens, enfim, todo e qualquer direito de propriedade intelectual ou industrial do serviço.

## 13. SUSPENSÃO E RESCISÃO

13.1. A Softplan poderá suspender contas em caso de: violação regulatória; uso ilícito; tentativa de exploração técnica; qualquer espécie de inadimplemento por parte do usuário; descumprimento da Resolução CNJ 615/2025.

## 14. DISPOSIÇÕES FINAIS

14.1. A utilização do Shield implica ciência de que se trata de ferramenta de apoio analítico.

14.2. O magistrado ou operador do Direito permanece integralmente responsável pelo ato decisório.

14.3. Estes Termos são regidos pela legislação brasileira.

14.4. Este Termos de Uso regulam o acesso e utilização do aplicativo Shield, disponibilizado no marketplace da Softplan.

14.5. Ao acessar, contratar ou utilizar o Shield, o usuário declara que leu, compreendeu e concorda integralmente com estes Termos.

14.6. Caso não concorde com qualquer disposição aqui prevista, o usuário não deverá utilizar o aplicativo.

14.7. O uso deste serviço está condicionado à aceitação / ciência dos termos e das políticas associadas. O usuário deverá ler tais termos e políticas, certificar-se de havê-los entendido, estar consciente de todas as condições estabelecidas no Termo de Uso e se comprometer a cumpri-las.

14.8. Fica eleito o foro da comarca de Florianópolis/SC.`;

const TermosDeUso = () => (
  <LegalDocumentPage
    title="Termo de Uso — Shield"
    lastUpdate="03 de março de 2026"
    currentVersion="1.0"
    content={content}
    versions={versions}
  />
);

export default TermosDeUso;
