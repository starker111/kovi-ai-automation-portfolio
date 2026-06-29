export const projects = [
  {
    number: "01",
    title: "Multi-Agent Research Automation System",
    slug: "multi-agent-research-automation-system",
    category: "Research",
    tags: ["Research", "Workflow", "AI Agents"],
    description:
      "Engineered a 3-agent pipeline that generates structured markdown research reports in about 4 seconds for medium-complexity queries.",
    problem: "Manual research workflows are slow, inconsistent, and hard to reuse across repeated queries.",
    system:
      "Researcher, Summarizer, and Formatter agents coordinate through n8n webhooks, Groq LLM calls, Google Sheets logging, and a React interface.",
    outcome:
      "Recruiters can see a production-style agent workflow with history, markdown rendering, copy actions, and downloadable reports.",
    stack: ["n8n", "Groq API", "React", "Google Sheets", "Webhooks", "JavaScript"],
    cardImage: "/images/projects/covers/multi-agent-research.jpg",
    liveUrl: "https://multi-agent-research-automation.vercel.app/",
    github: "https://github.com/starker111/Multi-Agent-Research-Automation",
  },
  {
    number: "02",
    title: "Autonomous Business Workflow Automation System",
    slug: "autonomous-business-workflow-automation-system",
    category: "Workflow",
    tags: ["Workflow", "Email", "Business Automation"],
    description:
      "Built an AI email classification and routing workflow, then validated correct routing on a 70-email test batch.",
    problem:
      "Customer emails can pile up across intents, making routing, prioritization, and reporting difficult for business users.",
    system:
      "n8n, Python, Ollama, Gmail API, and Google Sheets classify intent, route messages, log results, and expose plain-English analytics.",
    outcome:
      "Demonstrates a business-ready automation pattern for email operations without requiring users to inspect raw workflow logs.",
    stack: ["n8n", "Python", "Ollama", "Gmail API", "Google Sheets"],
    cardImage: "/images/projects/covers/email-classification.jpg",
    liveUrl: "https://autonomous-business-workflow-bot.vercel.app/",
    github: "https://github.com/starker111/Autonomous-Business-Workflow-Bot",
  },
  {
    number: "03",
    title: "HireFlow AI - AI Recruitment Automation Agent",
    slug: "hireflow-ai-recruitment-automation-agent",
    category: "HR Automation",
    tags: ["Workflow", "HR Automation", "Resume Screening"],
    description:
      "Built an AI recruitment agent that screens and ranks 20 resumes within 5 seconds per trigger against a job description.",
    problem:
      "Recruiters need faster resume triage without hallucinated skill matches or unsupported candidate recommendations.",
    system:
      "Gmail PDF extraction, Google Sheets, Google Calendar, LLM scoring, and JavaScript logic produce evidence-required candidate evaluations.",
    outcome:
      "Returns matched skills, missing skills, score, recommendation, and recruiter summary with a rubric designed to prevent fake matches.",
    stack: ["n8n", "Gmail API", "Google Sheets", "Google Calendar", "LLMs", "JavaScript"],
    cardImage: "/_archive/projects-root/resume-screening.jpg",
    liveUrl: "",
    github: "",
  },
  {
    number: "04",
    title: "AI-Powered Document Intelligence System",
    slug: "ai-powered-document-intelligence-system",
    category: "RAG",
    tags: ["RAG", "Document AI", "Embeddings"],
    description:
      "Built a RAG system for PDFs up to 40 pages with source-grounded question answering and confidence guardrails.",
    problem:
      "Document Q&A needs grounded answers, visible retrieval behavior, and fallback handling when evidence is weak.",
    system:
      "Python, LlamaIndex, FastAPI, React, ChromaDB, SentenceSplitter, and VectorStoreIndex power chunking, indexing, retrieval, and responses.",
    outcome:
      "Shows practical RAG engineering with source-node similarity inspection before accepting generated answers.",
    stack: ["Python", "LlamaIndex", "FastAPI", "React", "ChromaDB", "RAG"],
    cardImage: "/images/projects/covers/document-rag.jpg",
    liveUrl: "https://document-intelligence-rag-iota.vercel.app/",
    github: "https://github.com/starker111/document-intelligence-rag",
  },
  {
    number: "05",
    title: "OpsPilot AI - Autonomous SRE and FinOps Command Center",
    slug: "opspilot-ai-autonomous-sre-finops-command-center",
    category: "Ops AI",
    tags: ["Ops AI", "SRE", "FinOps", "Automation"],
    description:
      "Designed an autonomous SRE and FinOps command center for incident simulation, root cause analysis, cost impact, and reports.",
    problem:
      "Reliability and cloud-cost decisions need fast incident context, cost visibility, and next-best-action recommendations.",
    system:
      "Agentic AI workflows simulate incidents, run health checks, estimate cost impact, and generate downloadable incident reports.",
    outcome:
      "Demonstrates agentic AI support for DevOps reliability, incident response, and cloud cost-optimization workflows.",
    stack: ["Agentic AI", "Cloud Monitoring", "Cost Analysis"],
    cardImage: "/images/projects/covers/opspilot-ai.png",
    liveUrl: "https://opspilot-ai-coral.vercel.app/",
    github: "",
  },
];

export default projects;
