export const profile = {
  name: "Nishesh Kumar",
  role: "I shuffle signals until they mean something.",
  blurb:
    "Data, ML, and backend systems — with a soft spot for agents that can be evaluated, not just demoed.",
  location: "Building from India",
  email: "hello@nishesh.dev",
  github: "https://github.com",
  linkedin: "https://linkedin.com",
};

export const experiments = [
  {
    id: "sentinel",
    epoch: "01",
    title: "Sentinel",
    tag: "multi-agent",
    metric: "report → verify → remember",
    summary:
      "Give it a topic. It researches, writes, safety-checks, caches, and remembers. LangGraph pipeline on AWS with LLM-as-judge on every request.",
    stack: ["LangGraph", "FastAPI", "Bedrock", "pgvector", "Terraform"],
    accent: "#c8f542",
  },
  {
    id: "judge",
    epoch: "02",
    title: "Agent Judge",
    tag: "evals",
    metric: "score the scorer",
    summary:
      "A judging loop for agent outputs — because vibes are not a metric. Rubrics, traces, and the awkward truth of LLM-as-judge.",
    stack: ["Python", "LangSmith", "Evals"],
    accent: "#ff5e3a",
  },
  {
    id: "manim",
    epoch: "03",
    title: "Manim MCP",
    tag: "tooling",
    metric: "code → motion",
    summary:
      "An MCP server that takes Manim scripts and returns rendered animation. Math that actually moves.",
    stack: ["MCP", "Manim", "Python"],
    accent: "#7ad7ff",
  },
  {
    id: "nishos",
    epoch: "04",
    title: "nishOS",
    tag: "play",
    metric: "desktop in the browser",
    summary:
      "A tiny operating-system-shaped playground. Windows, widgets, and the joy of shipping something that feels alive.",
    stack: ["Next.js", "TypeScript"],
    accent: "#ffd24a",
  },
  {
    id: "wine",
    epoch: "05",
    title: "Wine Quality",
    tag: "classic ml",
    metric: "features → grade",
    summary:
      "A clean training loop on wine chemistry. Baseline models, honest metrics, no magic notebook screenshots.",
    stack: ["scikit-learn", "Python"],
    accent: "#e8a0ff",
  },
  {
    id: "vorithm",
    epoch: "06",
    title: "Vorithm",
    tag: "product",
    metric: "query → answer",
    summary:
      "Product work around retrieval and query flows — the unglamorous middle where models meet users.",
    stack: ["React Native", "LLMs"],
    accent: "#c8f542",
  },
];

export const skills = [
  { name: "Python", x: 18, y: 62, r: 18, cluster: "core" },
  { name: "PyTorch", x: 32, y: 28, r: 14, cluster: "ml" },
  { name: "scikit-learn", x: 22, y: 38, r: 12, cluster: "ml" },
  { name: "LangGraph", x: 58, y: 22, r: 16, cluster: "agents" },
  { name: "LangSmith", x: 72, y: 18, r: 12, cluster: "agents" },
  { name: "FastAPI", x: 48, y: 58, r: 14, cluster: "backend" },
  { name: "PostgreSQL", x: 62, y: 72, r: 13, cluster: "backend" },
  { name: "Redis", x: 74, y: 64, r: 11, cluster: "backend" },
  { name: "AWS", x: 84, y: 42, r: 15, cluster: "infra" },
  { name: "Terraform", x: 88, y: 58, r: 11, cluster: "infra" },
  { name: "Docker", x: 78, y: 32, r: 12, cluster: "infra" },
  { name: "TypeScript", x: 38, y: 78, r: 13, cluster: "core" },
  { name: "Next.js", x: 28, y: 86, r: 11, cluster: "core" },
  { name: "Evals", x: 52, y: 36, r: 15, cluster: "agents" },
  { name: "MLOps", x: 42, y: 48, r: 12, cluster: "infra" },
  { name: "SQL", x: 54, y: 82, r: 10, cluster: "backend" },
];

export const labNotes = [
  {
    id: "now",
    cell: "whoami",
    call: "nishesh.now()",
    lines: [
      "→ shipping agent evals that survive real traffic",
      "→ retrieval pipelines, MLOps hygiene, boring reliable glue",
      "→ currently open to data / ML / backend roles",
    ],
  },
  {
    id: "stack",
    cell: "how i work",
    call: "nishesh.method()",
    lines: [
      "→ baseline first, then earn the complexity",
      "→ every claim gets a metric, every metric gets a trace",
      "→ if it can't be measured, it ships behind a flag",
    ],
  },
  {
    id: "play",
    cell: "off hours",
    call: "nishesh.play()",
    lines: [
      "→ a fake OS in the browser (nishOS)",
      "→ an MCP server that renders math animations",
      "→ a judge that grades other judges",
    ],
  },
  {
    id: "wants",
    cell: "looking for",
    call: "nishesh.next()",
    lines: [
      "→ teams that read traces before they read vibes",
      "→ messy data, real users, honest evals",
      "→ ping me — the form below actually works",
    ],
  },
];

export const ticks = [
  "agent traces",
  "embedding drift",
  "guardrails",
  "latent space",
  "llm-as-judge",
  "feature stores",
  "redis cache",
  "pgvector",
  "red teaming",
  "dvc",
  "langgraph",
  "batch jobs",
];
