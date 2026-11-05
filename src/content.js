// Todo o texto do site, em PT e EN. As seções só leem daqui.
export var WHATSAPP_NUMERO = "5583988117940";
export var WHATSAPP_EXIBICAO = "+55 83 98811-7940";
export var EMAIL_CONTATO = "admin@sw3.tec.br";

export function whatsappUrl(texto) {
  return "https://wa.me/" + WHATSAPP_NUMERO + "?text=" + encodeURIComponent(texto);
}

export var content = {
  pt: {
    meta: {
      title: "SW3 Innovations — Software com IA que funciona em produção",
      description: "A SW3 constrói e mantém agentes de IA no WhatsApp, integrações com CRM e plataformas sob medida para empresas com operação pesada.",
    },
    nav: [
      { l: "O que fazemos", h: "#servicos" },
      { l: "Casos", h: "#casos" },
      { l: "Como trabalhamos", h: "#como-trabalhamos" },
      { l: "Pós-entrega", h: "#planos" },
      { l: "Contato", h: "#contato" },
    ],
    langSwitch: { label: "EN", href: "/en" },
    whatsappText: "Oi, vim do site da SW3. Quero falar sobre um problema:",
    hero: {
      eyebrow: "SW3 Innovations · Software e IA",
      title: ["Software com IA", "que funciona em produção."],
      subtitle: "Agentes de IA no WhatsApp, integrações com CRM e plataformas sob medida para empresas com operação pesada. A SW3 constrói, coloca no ar e cuida depois da entrega.",
      cta: "Mande o problema",
      secondary: "Ver casos",
      note: "Quando fizer sentido, mostramos um esboço da solução antes de fechar.",
    },
    services: {
      badge: "O que fazemos",
      title: "Três frentes de trabalho",
      subtitle: "Do diagnóstico à operação, com escopo definido antes de começar.",
      items: [
        {
          title: "Agentes de IA no WhatsApp",
          desc: "Atendimento que responde pela base de conhecimento da sua empresa, passa para um humano com o histórico da conversa e registra os leads no seu CRM. Também entregamos em white label para agências e parceiros de CRM.",
          points: ["WhatsApp Business Cloud API oficial", "Passagem para humano com contexto", "Integração com HubSpot, Kommo ou RD Station", "Métricas de volume e custo por conversa"],
        },
        {
          title: "Resgate de apps feitos com IA",
          desc: "Seu app nasceu no Lovable, Bolt, Cursor ou Replit e agora precisa aguentar usuários reais. Revisamos segurança, dados e deploy, corrigimos o que trava e deixamos pronto para produção.",
          points: ["Revisão de segurança e dados", "Testes automatizados", "Deploy e monitoramento", "Código e documentação com você"],
        },
        {
          title: "Plataformas sob medida",
          desc: "Sistemas para operações específicas: orçamento e pedido, desenho técnico, conciliação financeira e fluxos com IA no meio do processo.",
          points: ["Java/Spring Boot, Python ou Node.js", "Web em React", "PostgreSQL", "IA com regras de reserva quando a confiança é baixa"],
        },
      ],
    },
    cases: {
      badge: "Casos",
      title: "Projetos entregues",
      subtitle: "Sistemas que a SW3 construiu.",
      challengeLabel: "Desafio",
      solutionLabel: "Solução",
      stackLabel: "Stack",
      items: [
        {
          id: "industria-vidro",
          label: "Indústria de vidro",
          tagline: "De planilha a sistema completo",
          sector: "Indústria",
          challenge: "A operação comercial rodava em planilhas e WhatsApp manual. Pedidos se perdiam e não havia visão do funil de vendas.",
          solution: "Sistema web com automação de pedidos, painel de vendas em tempo real e notificações automáticas por WhatsApp.",
          stack: ["React", "Node.js", "n8n", "PostgreSQL", "WhatsApp API"],
        },
        {
          id: "orcamento-temperado",
          label: "Orçamento de vidro temperado",
          tagline: "Desenho técnico e análise de foto com IA",
          sector: "Indústria · B2B",
          solution: "Backend em Spring Boot com backoffice de CRM e uma API de desenho técnico com IA: consultor por chat e análise de foto do local da instalação.",
          stack: ["Java", "Spring Boot"],
        },
        {
          id: "click-vidro",
          label: "Click Vidro",
          tagline: "Pedidos entre vidraçarias e fábricas",
          sector: "SaaS",
          solution: "Plataforma de orçamento e pedido para vidraçarias e fábricas, em produção com pagamentos reais via Pix e avisos automáticos de status do pedido no WhatsApp.",
          stack: ["Pix", "WhatsApp API"],
        },
      ],
    },
    how: {
      badge: "Como trabalhamos",
      title: "Sem surpresa no meio do caminho",
      steps: [
        { title: "Conversa", desc: "Você descreve o problema pelo WhatsApp ou por e-mail." },
        { title: "Esboço", desc: "Com o problema bem definido, mostramos um esboço da solução, como protótipo, fluxo ou desenho, antes do contrato." },
        { title: "Proposta", desc: "Escopo, prazo e preço definidos por escrito." },
        { title: "Entrega", desc: "Construção com testes automatizados. Você recebe o código, o sistema no ar e a documentação de operação." },
        { title: "Depois", desc: "Correções pós-lançamento e planos de suporte, operação ou evolução." },
      ],
      principle: "Avaliação antes de afirmação: todo número que mostramos tem fonte.",
    },
    plans: {
      badge: "Após a entrega",
      title: "Sistema sempre atualizado",
      subtitle: "Manutenção, operação ou evolução contínua.",
      price: "Sob consulta",
      cta: "Falar sobre plano",
      ctaText: "Oi, vim do site da SW3. Quero falar sobre um plano pós-entrega.",
      categories: [
        { title: "Suporte e manutenção", plans: [
          { name: "Básico", feat: "Bugs + monitoramento · SLA 48h" },
          { name: "Pro", feat: "Bugs + segurança + melhorias · SLA 24h" },
          { name: "Enterprise", feat: "Suporte dedicado · SLA 4h" },
        ] },
        { title: "Serviço gerenciado", plans: [
          { name: "Basic", feat: "Hospedagem + backups" },
          { name: "Pro", feat: "Hospedagem + evoluções + relatório" },
          { name: "Full", feat: "Operação completa" },
        ] },
        { title: "Horas mensais", plans: [
          { name: "10h / mês", feat: "Funcionalidades e integrações" },
          { name: "20h / mês", feat: "Funcionalidades + refatoração" },
          { name: "40h / mês", feat: "Meio desenvolvedor dedicado" },
        ] },
      ],
    },
    contact: {
      badge: "Contato",
      title: "Mande o problema.",
      subtitle: "Conte o que precisa resolver. Respondemos com as perguntas certas e, quando fizer sentido, com um esboço da solução.",
      whatsapp: "WhatsApp",
      email: "E-mail",
      company: ["SW3 Innovations Brasil LTDA", "CNPJ 64.948.554/0001-06", "Campina Grande — PB, Brasil"],
    },
    footer: {
      tagline: "Software com IA que funciona em produção.",
      rights: "© 2026 SW3 Innovations Brasil LTDA.",
    },
    floating: "WhatsApp",
  },

  en: {
    meta: {
      title: "SW3 Innovations — AI software that holds up in production",
      description: "SW3 builds and runs WhatsApp AI agents, CRM integrations and custom platforms for operations-heavy businesses.",
    },
    nav: [
      { l: "What we do", h: "#servicos" },
      { l: "Work", h: "#casos" },
      { l: "How we work", h: "#como-trabalhamos" },
      { l: "After launch", h: "#planos" },
      { l: "Contact", h: "#contato" },
    ],
    langSwitch: { label: "PT", href: "/" },
    whatsappText: "Hi, I found SW3 through your website. I'd like to talk about a problem:",
    hero: {
      eyebrow: "SW3 Innovations · Software and AI",
      title: ["AI software", "that holds up in production."],
      subtitle: "WhatsApp AI agents, CRM integrations and custom platforms for operations-heavy businesses. SW3 builds them, ships them and runs them after launch.",
      cta: "Send us the problem",
      secondary: "See our work",
      note: "When it makes sense, we show you a sketch of the solution before you sign.",
    },
    services: {
      badge: "What we do",
      title: "Three lines of work",
      subtitle: "From diagnosis to operations, with the scope agreed before we start.",
      items: [
        {
          title: "WhatsApp AI agents",
          desc: "An agent that answers from your company's knowledge base, hands off to a human with the full conversation and logs every lead in your CRM. Also available white label for agencies and CRM partners.",
          points: ["Official WhatsApp Business Cloud API", "Human handoff with context", "HubSpot, Kommo or RD Station integration", "Volume and cost-per-conversation metrics"],
        },
        {
          title: "Rescue for AI-built apps",
          desc: "Your app was built with Lovable, Bolt, Cursor or Replit and now has to handle real users. We review security, data and deployment, fix what breaks and make it production-ready.",
          points: ["Security and data review", "Automated tests", "Deployment and monitoring", "You keep the code and docs"],
        },
        {
          title: "Custom platforms",
          desc: "Systems for specific operations: quoting and ordering, technical drawing, financial reconciliation and workflows with AI inside the process.",
          points: ["Java/Spring Boot, Python or Node.js", "React web apps", "PostgreSQL", "AI with rule-based fallback when confidence is low"],
        },
      ],
    },
    cases: {
      badge: "Work",
      title: "Projects we've shipped",
      subtitle: "Systems SW3 has built.",
      challengeLabel: "Challenge",
      solutionLabel: "Solution",
      stackLabel: "Stack",
      items: [
        {
          id: "industria-vidro",
          label: "Glass manufacturer",
          tagline: "From spreadsheets to a full system",
          sector: "Manufacturing",
          challenge: "Sales ran on spreadsheets and manual WhatsApp messages. Orders got lost and there was no view of the sales pipeline.",
          solution: "A web system with order automation, a real-time sales dashboard and automatic WhatsApp notifications.",
          stack: ["React", "Node.js", "n8n", "PostgreSQL", "WhatsApp API"],
        },
        {
          id: "orcamento-temperado",
          label: "Tempered-glass quoting",
          tagline: "Technical drawing and photo analysis with AI",
          sector: "Manufacturing · B2B",
          solution: "A Spring Boot backend with a CRM back office and an AI technical-drawing API: a chat consultant and photo analysis of the installation site.",
          stack: ["Java", "Spring Boot"],
        },
        {
          id: "click-vidro",
          label: "Click Vidro",
          tagline: "Ordering between glass shops and factories",
          sector: "SaaS",
          solution: "A quoting and ordering platform for glass shops and factories, live with real Pix payments and automatic WhatsApp order-status updates.",
          stack: ["Pix", "WhatsApp API"],
        },
      ],
    },
    how: {
      badge: "How we work",
      title: "No surprises halfway through",
      steps: [
        { title: "Talk", desc: "You describe the problem on WhatsApp or by email." },
        { title: "Sketch", desc: "Once the problem is well defined, we show you a sketch of the solution, as a prototype, flow or drawing, before the contract." },
        { title: "Proposal", desc: "Scope, timeline and price agreed in writing." },
        { title: "Delivery", desc: "Built with automated tests. You get the code, the live system and the operations runbook." },
        { title: "After", desc: "Post-launch fixes and support, managed-service or retainer plans." },
      ],
      principle: "Evaluation before claims: every number we show has a source.",
    },
    plans: {
      badge: "After launch",
      title: "Always up to date",
      subtitle: "Maintenance, operations or continuous improvement.",
      price: "On request",
      cta: "Talk about a plan",
      ctaText: "Hi, I found SW3 through your website. I'd like to talk about a post-launch plan.",
      categories: [
        { title: "Support and maintenance", plans: [
          { name: "Basic", feat: "Bugs + monitoring · 48h SLA" },
          { name: "Pro", feat: "Bugs + security + improvements · 24h SLA" },
          { name: "Enterprise", feat: "Dedicated support · 4h SLA" },
        ] },
        { title: "Managed service", plans: [
          { name: "Basic", feat: "Hosting + backups" },
          { name: "Pro", feat: "Hosting + improvements + report" },
          { name: "Full", feat: "Full operations" },
        ] },
        { title: "Retainer", plans: [
          { name: "10h / month", feat: "Features and integrations" },
          { name: "20h / month", feat: "Features + refactoring" },
          { name: "40h / month", feat: "Half a dedicated developer" },
        ] },
      ],
    },
    contact: {
      badge: "Contact",
      title: "Send us the problem.",
      subtitle: "Tell us what you need to solve. We reply with the right questions and, when it makes sense, a sketch of the solution.",
      whatsapp: "WhatsApp",
      email: "Email",
      company: ["SW3 Innovations Brasil LTDA", "CNPJ 64.948.554/0001-06", "Campina Grande — PB, Brazil"],
    },
    footer: {
      tagline: "AI software that holds up in production.",
      rights: "© 2026 SW3 Innovations Brasil LTDA.",
    },
    floating: "WhatsApp",
  },
};
