import React, { useEffect, useMemo, useRef, useState } from "react";
import VisitorCounter from "./components/VisitorCounter.jsx";
import { HERO_VIDEO_URL } from "./config/media.js";
import { projects } from "./data/projects.js";

const contact = {
  email: "kovivarunjashwanthsai@gmail.com",
  linkedin: "https://www.linkedin.com/in/kovi-varun-jaswanth-sai-588599302/",
  github: "https://github.com/starker111",
  portfolio: "https://kovi-ai-automation-portfolio.vercel.app/",
};

const navItems = [
  { label: "Home", href: "#hero" },
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Certifications", href: "#certifications" },
  { label: "Resume", href: "#resume" },
  { label: "Contact", href: "#contact" },
];

const skillGroups = [
  {
    category: "Programming",
    skills: ["Python", "JavaScript", "SQL"],
  },
  {
    category: "AI / LLM",
    skills: [
      "OpenAI API",
      "Groq API",
      "Claude",
      "Gemini",
      "Ollama",
      "LangChain",
      "LlamaIndex",
      "Prompt Engineering",
      "RAG",
      "Function Calling",
      "JSON Output Parsing",
    ],
  },
  {
    category: "Agents and Automation",
    skills: [
      "Multi-Agent Systems",
      "Agentic Workflows",
      "n8n",
      "Make",
      "Zapier",
      "Webhooks",
      "REST APIs",
      "Workflow Orchestration",
    ],
  },
  {
    category: "Business Automation",
    skills: [
      "Lead Qualification",
      "Customer Engagement Workflows",
      "CRM Follow-up Automation",
      "Email Automation",
      "HR Automation",
      "Resume Screening",
      "Interview Scheduling",
    ],
  },
  {
    category: "Backend and Data",
    skills: [
      "FastAPI",
      "PostgreSQL",
      "MongoDB",
      "Pandas",
      "NumPy",
      "Scikit-learn",
      "Data Cleaning",
      "EDA",
      "Google BigQuery",
    ],
  },
  {
    category: "Frontend and Tools",
    skills: [
      "React.js",
      "Streamlit",
      "Tailwind CSS",
      "Responsive UI/UX",
      "Git",
      "GitHub",
      "VS Code",
      "ChromaDB",
      "FAISS",
      "PDF Text Extraction",
    ],
  },
];

const skillRows = [
  {
    label: "AI / LLM",
    direction: "left",
    skills: skillGroups[1].skills,
  },
  {
    label: "Agents and Automation",
    direction: "right",
    skills: skillGroups[2].skills,
  },
  {
    label: "Backend and Data",
    direction: "left",
    skills: skillGroups[4].skills,
  },
];

const capabilityCards = [
  {
    number: "01",
    title: "AI & LLM Systems",
    description:
      "Grounded assistants, RAG pipelines, agent workflows, local models, and practical LLM integrations.",
    tools: ["OpenAI", "Gemini", "Ollama", "LangChain", "RAG", "Agents"],
    example: "AI-Powered Document Intelligence System",
  },
  {
    number: "02",
    title: "Workflow Automation",
    description:
      "Reliable automations that connect business tools, route information, and reduce repeated manual work.",
    tools: ["n8n", "Make", "Zapier", "Gmail API", "Sheets API", "Webhooks"],
    example: "Autonomous Business Workflow Automation System",
  },
  {
    number: "03",
    title: "Engineering & APIs",
    description:
      "Backend and frontend systems for building maintainable automation products and internal tools.",
    tools: ["Python", "FastAPI", "React", "REST APIs", "JavaScript", "Pandas"],
    example: "Multi-Agent Research Automation",
  },
  {
    number: "04",
    title: "Data & Intelligence",
    description:
      "Storage, retrieval, classification, scoring, summaries, and reporting for AI-enabled operations.",
    tools: ["ChromaDB", "PostgreSQL", "MongoDB", "BigQuery", "Pandas"],
    example: "OpsPilot AI",
  },
];

const certifications = [
  "J.P. Morgan - Quantitative Research Job Simulation",
  "Claude 101",
  "Vista Equity Partners - AI in Action Job Simulation",
  "Tata - GenAI Powered Data Analytics Job Simulation",
  "AI Fluency for Small Businesses",
];

const systemsBoard = [
  {
    number: "01",
    title: "Inputs",
    description: "Raw information entering the system.",
    items: ["Emails", "PDFs", "Resumes", "Forms", "Documents"],
  },
  {
    number: "02",
    title: "Processing",
    description: "Automation prepares and routes the data.",
    items: ["n8n workflows", "APIs", "Python scripts", "Data cleaning", "Webhooks"],
  },
  {
    number: "03",
    title: "AI Layer",
    description: "LLMs add reasoning and decision-making.",
    items: ["RAG retrieval", "Classification", "Summarization", "Scoring", "LLM reasoning"],
  },
  {
    number: "04",
    title: "Outputs",
    description: "Useful results delivered to tools or people.",
    items: ["Google Sheets", "Email replies", "Shortlists", "Reports", "Dashboards"],
  },
];

const aboutStats = [
  { value: 5, suffix: "", label: "resume-backed AI projects", numeric: true },
  { value: 6, suffix: "", label: "skill categories", numeric: true },
  { value: "n8n + Python + RAG", label: "practical stack" },
  { value: "Hyderabad, India", label: "location" },
];

const education = [
  {
    title: "B.Tech in AI & Data Science",
    status: "Present",
    institution: "Guru Nanak Institutions Technical Campus",
    years: "2023 - 2027",
    score: "GPA: 7.0 / 10.0",
  },
];

const skills = [
  "AI Automation",
  "n8n",
  "Python",
  "RAG Systems",
  "LLMs",
  "APIs",
  "Gmail API",
  "Google Sheets",
  "ChromaDB",
  "React",
  "FastAPI",
];

const roleVariants = [
  "AI Automation Engineer",
  "Agentic AI Builder",
  "RAG Systems Builder",
  "Workflow Orchestration Builder",
];

function ArrowIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="M4 16 16 4M7 4h9v9" />
    </svg>
  );
}

function RoleCycle() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [activeRole, setActiveRole] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion) return undefined;

    const interval = window.setInterval(() => {
      setActiveRole((current) => (current + 1) % roleVariants.length);
    }, 2400);

    return () => window.clearInterval(interval);
  }, [prefersReducedMotion]);

  return (
    <div className="role-cycle" aria-label={`Current focus: ${roleVariants[activeRole]}`}>
      <span aria-hidden="true" />
      <strong key={roleVariants[activeRole]}>{roleVariants[activeRole]}</strong>
    </div>
  );
}

function SafeProjectImage({ src, alt, ...props }) {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setCurrentSrc(src);
    setHasError(false);
  }, [src]);

  if (!src || hasError) {
    return <div className="project-image-fallback">Preview coming soon.</div>;
  }

  return (
    <img
      {...props}
      src={currentSrc}
      alt={alt}
      onError={() => {
        setHasError(true);
      }}
    />
  );
}

function CountUpStat({ stat, index = 0 }) {
  return (
    <div className="about-stat" data-reveal style={{ transitionDelay: `${index * 70}ms` }}>
      <strong>{stat.value}{stat.suffix}</strong>
      <span>{stat.label}</span>
    </div>
  );
}

function SectionIntro({ index, label, title, text, inverse = false }) {
  return (
    <div className={`section-intro ${inverse ? "section-intro--inverse" : ""}`} data-reveal>
      <p className="section-kicker">
        <span>{index}</span>
        {label}
      </p>
      <div>
        <h2>{title}</h2>
        {text && <p className="section-description">{text}</p>}
      </div>
    </div>
  );
}

function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setPrefersReducedMotion(query.matches);

    updatePreference();
    query.addEventListener("change", updatePreference);
    return () => query.removeEventListener("change", updatePreference);
  }, []);

  return prefersReducedMotion;
}

function scrollToSection(event, id) {
  const section = document.getElementById(id);
  if (!section) return;

  event.preventDefault();
  const top = section.getBoundingClientRect().top + window.scrollY;
  window.scrollTo({ top, behavior: "smooth" });
  window.setTimeout(() => {
    if (Math.abs(section.getBoundingClientRect().top) <= 8) return;

    window.scrollTo(0, top);
    document.documentElement.scrollTop = top;
    document.body.scrollTop = top;
  }, 450);
  window.history.pushState(null, "", `#${id}`);
}

function MenuOverlay({ open, onClose, activeSection }) {
  const firstLinkRef = useRef(null);

  useEffect(() => {
    if (open) firstLinkRef.current?.focus();
  }, [open]);

  return (
    <div
      className={`menu-overlay ${open ? "is-open" : ""}`}
      aria-hidden={!open}
      role="dialog"
      aria-modal="true"
      aria-label="Site navigation"
    >
      <div className="menu-shell">
        <div className="menu-brand">
          <img src="/branding/portfolio-logo-mark.png" alt="" width="56" height="56" />
          <p className="menu-label">Navigation</p>
        </div>
        <nav className="menu-nav">
          {navItems.map((item, index) => (
            <a
              ref={index === 0 ? firstLinkRef : null}
              href={item.href}
              key={item.label}
              onClick={(event) => {
                onClose();
                scrollToSection(event, item.href.slice(1));
              }}
              tabIndex={open ? 0 : -1}
              className={activeSection === item.href.slice(1) ? "is-active" : ""}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{item.label}</strong>
              <ArrowIcon />
            </a>
          ))}
        </nav>
        <div className="menu-footer">
          <p>AI Automation Engineer<br />Hyderabad, India</p>
          <div>
            <a href={`mailto:${contact.email}`} tabIndex={open ? 0 : -1}>
              Email
            </a>
            <a href={contact.linkedin} target="_blank" rel="noreferrer" tabIndex={open ? 0 : -1}>
              LinkedIn
            </a>
            <a href={contact.github} target="_blank" rel="noreferrer" tabIndex={open ? 0 : -1}>
              GitHub
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    document.body.classList.toggle("menu-open", menuOpen);

    const closeOnEscape = (event) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.classList.remove("menu-open");
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [menuOpen]);

  useEffect(() => {
    const updateScrolled = () => setScrolled(window.scrollY > 12);
    updateScrolled();
    window.addEventListener("scroll", updateScrolled, { passive: true });
    return () => window.removeEventListener("scroll", updateScrolled);
  }, []);

  useEffect(() => {
    const sections = ["hero", "work", "about", "skills", "certifications", "resume", "contact"]
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visibleEntry) setActiveSection(visibleEntry.target.id);
      },
      { rootMargin: "-32% 0px -58% 0px", threshold: [0.12, 0.35, 0.6] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const primaryNav = navItems.filter((item) => item.label !== "Home");

  return (
    <>
      <header className={`header ${menuOpen ? "header--menu-open" : ""} ${scrolled ? "header--scrolled" : ""}`}>
        <div className="header-inner">
          <a
            className="brand"
            href="#hero"
            aria-label="Kovi Varun home"
            onClick={(event) => {
              setMenuOpen(false);
              scrollToSection(event, "hero");
            }}
          >
            <img src="/branding/portfolio-logo-mark.png" alt="" width="38" height="38" />
            <span>KV</span>
            <small>AI Automation Engineer</small>
          </a>
          <nav className="desktop-nav" aria-label="Primary navigation">
            {primaryNav.map((item) => (
              <a
                className={activeSection === item.href.slice(1) ? "is-active" : ""}
                href={item.href}
                key={item.label}
                onClick={(event) => scrollToSection(event, item.href.slice(1))}
              >
                {item.label}
              </a>
            ))}
          </nav>
          <button
            className="menu-button"
            type="button"
            aria-expanded={menuOpen}
            aria-controls="site-menu"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            onClick={() => setMenuOpen((current) => !current)}
          >
            <span>{menuOpen ? "Close" : "Menu"}</span>
            <i aria-hidden="true" />
          </button>
        </div>
      </header>
      <div id="site-menu">
        <MenuOverlay open={menuOpen} onClose={() => setMenuOpen(false)} activeSection={activeSection} />
      </div>
    </>
  );
}

function Hero() {
  const heroPosterAlt = "Kovi Varun Jaswanth Sai AI Automation Engineer portfolio hero";

  return (
    <section className="hero" id="hero">
      <div className="container hero-grid">
        <div className="hero-content">
          <p className="eyebrow hero-reveal">
            Kovi Varun Jaswanth Sai / AI Automation Engineer / Hyderabad, Telangana, India
          </p>
          <div className="hero-reveal hero-reveal--delay-1">
            <RoleCycle />
          </div>
          <h1 className="hero-reveal hero-reveal--delay-1">
            Agentic AI
            <span>Automation Engineer</span>
          </h1>
          <p className="hero-subhead hero-reveal hero-reveal--delay-2">
            LLM agents, n8n workflows, RAG systems, and business process automation.
          </p>
          <p className="hero-copy hero-reveal hero-reveal--delay-2">
            B.Tech Artificial Intelligence and Data Science student graduating in 2027, focused
            on production-style AI systems using LLMs, APIs, vector search, and structured
            automation outputs.
          </p>
          <div className="hero-actions hero-reveal hero-reveal--delay-3">
            <a className="button button--dark" href="#work" onClick={(event) => scrollToSection(event, "work")}>
              View Work <ArrowIcon />
            </a>
            <a className="button button--light" href="/resume.pdf" download>
              Download Resume <ArrowIcon />
            </a>
            <a className="button button--light" href={contact.github} target="_blank" rel="noreferrer">
              GitHub <ArrowIcon />
            </a>
            <a className="button button--light" href={contact.linkedin} target="_blank" rel="noreferrer">
              LinkedIn <ArrowIcon />
            </a>
            <a className="button button--light" href={`mailto:${contact.email}`}>
              Email <ArrowIcon />
            </a>
          </div>
          <div className="hero-meta hero-reveal hero-reveal--delay-3">
            <span>Available for internships and roles</span>
            <span>2026 Portfolio</span>
            <span>Hyderabad, Telangana, India</span>
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-visitor-counter hero-reveal hero-reveal--delay-2">
            <VisitorCounter />
          </div>
          <div className="hero-video-panel hero-reveal hero-reveal--delay-2">
            {HERO_VIDEO_URL ? (
              <video
                className="hero-video"
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                poster="/images/hero-intro-poster.jpg"
                aria-hidden="true"
              >
                <source src={HERO_VIDEO_URL} type="video/mp4" />
              </video>
            ) : (
              <img
                className="hero-video-poster hero-video-fallback"
                src="/images/hero-intro-poster.jpg"
                alt={heroPosterAlt}
                width="1672"
                height="941"
                fetchPriority="high"
              />
            )}
          </div>
        </div>
      </div>
      <div className="hero-rule" aria-hidden="true">
        <span>Scroll to explore</span>
        <i />
      </div>
    </section>
  );
}

function ProjectCard({ project, index }) {
  const stack = project.stack ?? [];
  const hasProjectLink = Boolean(project.liveUrl);
  const openProject = () => {
    if (!hasProjectLink) return;
    window.open(project.liveUrl, "_blank", "noopener,noreferrer");
  };

  const openCardFromKeyboard = (event) => {
    if (event.target !== event.currentTarget) return;
    if (event.key !== "Enter" && event.key !== " ") return;

    event.preventDefault();
    openProject();
  };

  return (
    <div
      className={`project-card ${hasProjectLink ? "" : "project-card--static"}`}
      role={hasProjectLink ? "button" : undefined}
      aria-label={hasProjectLink ? `Launch ${project.title} interface` : undefined}
      tabIndex={hasProjectLink ? 0 : undefined}
      onClick={hasProjectLink ? openProject : undefined}
      onKeyDown={openCardFromKeyboard}
      style={{ "--project-delay": `${index * 80}ms` }}
    >
      <article>
        <div className="project-image">
          <SafeProjectImage
            src={project.cardImage}
            alt={`${project.title} project cover`}
            width="1536"
            height="1024"
            loading="lazy"
            decoding="async"
          />
          <span className="project-index">{project.number}</span>
          <span className="project-status">{hasProjectLink ? "Live interface" : "Resume project"}</span>
          {hasProjectLink && <span className="project-arrow"><ArrowIcon /></span>}
          <div className="project-overlay">
            <p>{project.outcome}</p>
            <div className="project-overlay-actions">
              {hasProjectLink && (
                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    openProject();
                  }}
                >
                  Launch interface <ArrowIcon />
                </button>
              )}
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(event) => event.stopPropagation()}
                >
                  Source Code <ArrowIcon />
                </a>
              )}
            </div>
          </div>
        </div>
        <div className="project-heading">
          <div>
            <p>{project.category}</p>
            <h3>{project.title}</h3>
          </div>
          <span>2026</span>
        </div>
        <p className="project-description">{project.description}</p>
        <div className="project-detail-grid" aria-label={`${project.title} project details`}>
          <p><span>Problem solved</span>{project.problem}</p>
          <p><span>What it does</span>{project.system}</p>
          <p><span>Recruiter outcome</span>{project.outcome}</p>
        </div>
        <ul className="tool-list" aria-label={`${project.title} tools`}>
          {stack.map((tool) => <li key={tool}>{tool}</li>)}
        </ul>
      </article>
    </div>
  );
}

function Work() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filters = [
    { label: "All", value: "All" },
    { label: "Research", value: "Research" },
    { label: "Workflow", value: "Workflow" },
    { label: "HR Automation", value: "HR Automation" },
    { label: "RAG", value: "RAG" },
    { label: "Ops AI", value: "Ops AI" },
  ];

  const normalize = (value) => String(value || "").trim().toLowerCase();

  const filteredProjects = useMemo(() => {
    if (activeFilter === "All") return projects;

    const active = normalize(activeFilter);

    return projects.filter((project) => {
      const categoryMatch = normalize(project.category) === active;
      const tagMatch = Array.isArray(project.tags)
        ? project.tags.some((tag) => normalize(tag) === active)
        : false;

      return categoryMatch || tagMatch;
    });
  }, [activeFilter]);

  return (
    <section className="section work" id="work">
      <div className="container">
        <SectionIntro
          index="01"
          label="Selected Work"
          title="Systems built for real operational work."
          text="A focused selection of AI workflows that research, retrieve, classify, and evaluate information."
        />
        <div className="project-filters" aria-label="Filter projects by category" data-reveal>
          {filters.map((filter) => (
            <button
              className={activeFilter === filter.value ? "is-active active" : ""}
              type="button"
              key={filter.value}
              aria-pressed={activeFilter === filter.value}
              onClick={() => setActiveFilter(filter.value)}
            >
              {filter.label}
            </button>
          ))}
        </div>
        <div className="project-grid">
          {filteredProjects.map((project, index) => (
            <ProjectCard
              project={project}
              key={project.slug}
              index={index}
            />
          ))}
        </div>
        {filteredProjects.length === 0 && (
          <p className="project-empty" role="status">No projects found for this filter.</p>
        )}
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="section about" id="about">
      <div className="container about-grid">
        <figure className="about-portrait portfolio-image-frame" data-reveal>
          <img
            src="/images/about-working.jpg"
            alt="Kovi Varun Jaswanth Sai working on AI automation systems"
            width="1672"
            height="941"
            loading="lazy"
            decoding="async"
          />
          <figcaption>
            <span>Kovi Varun Jaswanth Sai</span>
            <span>Hyderabad, India</span>
          </figcaption>
        </figure>
        <div className="about-copy" data-reveal>
          <p className="section-kicker"><span>02</span>About</p>
          <h2>Practical AI automation systems, not only demos.</h2>
          <p className="about-lead">
            I build practical AI automation systems that connect LLMs, n8n workflows, APIs,
            vector search, and structured outputs into workflows people can actually use.
          </p>
          <p className="about-secondary">
            My focus is agentic systems, RAG applications, and workflow orchestration for email
            automation, document intelligence, resume screening, and business process automation.
          </p>
          <div className="skill-tags" aria-label="Skills">
            {skills.map((skill) => <span key={skill}>{skill}</span>)}
          </div>
          <div className="about-stats">
            {aboutStats.map((stat, index) => (
              <CountUpStat stat={stat} index={index} key={stat.label} />
            ))}
          </div>
          <a
            className="inline-link"
            href="#contact"
            aria-label="Start a conversation"
            onClick={(event) => scrollToSection(event, "contact")}
          >
            Start a conversation <ArrowIcon />
          </a>
        </div>
      </div>
      <div className="container education-panel">
        <div className="education-header" data-reveal>
          <p className="section-kicker"><span>ED</span>Education</p>
          <h3>Education</h3>
        </div>
        <div className="education-grid">
          {education.map((item, index) => (
            <article
              className="education-card"
              data-reveal
              style={{ transitionDelay: `${index * 80}ms` }}
              key={`${item.title}-${item.institution}`}
            >
              <div>
                <span>{item.status}</span>
                <span>{item.years}</span>
              </div>
              <h3>{item.title}</h3>
              <p>{item.institution}</p>
              <strong>{item.score}</strong>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Capabilities() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const sectionRef = useRef(null);

  const handlePointerMove = (event) => {
    if (prefersReducedMotion || event.pointerType === "touch") return;

    const section = sectionRef.current;
    if (!section) return;

    const rect = section.getBoundingClientRect();
    section.style.setProperty("--cap-x", `${event.clientX - rect.left}px`);
    section.style.setProperty("--cap-y", `${event.clientY - rect.top}px`);
  };

  const handleCardPointerMove = (event) => {
    const card = event.currentTarget;
    const rect = card.getBoundingClientRect();
    card.style.setProperty("--card-x", `${event.clientX - rect.left}px`);
    card.style.setProperty("--card-y", `${event.clientY - rect.top}px`);
  };

  return (
    <section
      className="section capabilities capability-engine"
      id="skills"
      ref={sectionRef}
      onPointerMove={handlePointerMove}
    >
      <div className="capability-orbit" aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
        <i />
        <i />
      </div>
      <div className="container capability-shell">
        <div className="capability-header" data-reveal>
          <p className="section-kicker section-kicker--light"><span>03</span>Skills</p>
          <div>
            <h2>Skills grouped by how AI automation systems are built.</h2>
            <p>
              A practical stack for LLM agents, n8n workflows, RAG systems, business automation,
              APIs, data pipelines, and recruiter-facing interfaces.
            </p>
          </div>
        </div>

        <div className="skill-category-grid" data-reveal>
          {skillGroups.map((group) => (
            <article className="skill-category-card" key={group.category}>
              <h3>{group.category}</h3>
              <ul>
                {group.skills.map((skill) => <li key={skill}>{skill}</li>)}
              </ul>
            </article>
          ))}
        </div>

        <div className="capability-marquee" data-reveal>
          {skillRows.map((row) => (
            <div
              className={`skill-row skill-row--${row.direction}`}
              key={row.label}
              aria-label={row.label}
            >
              <div className="skill-track">
                {[0, 1].map((setIndex) => (
                  <div className="skill-set" aria-hidden={setIndex === 1} key={`${row.label}-${setIndex}`}>
                    {row.skills.map((skill) => (
                      <span className="skill-pill" key={`${row.label}-${setIndex}-${skill}`}>
                        {skill}
                      </span>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="capability-grid">
          {capabilityCards.map((capability, index) => (
            <article
              className="capability-card"
              key={capability.title}
              data-reveal
              onPointerMove={handleCardPointerMove}
              style={{ transitionDelay: `${index * 90}ms` }}
            >
              <div className="capability-card-top">
                <span className="capability-number">{capability.number}</span>
                <span className="capability-card-arrow"><ArrowIcon /></span>
              </div>
              <h3>{capability.title}</h3>
              <p>{capability.description}</p>
              <ul>
                {capability.tools.map((tool) => <li key={tool}>{tool}</li>)}
              </ul>
              <details className="capability-example">
                <summary>Example system</summary>
                <p>{capability.example}</p>
              </details>
            </article>
          ))}
        </div>

        <div className="systems-board">
          <div className="systems-board-header" data-reveal>
            <div>
              <span>AI Systems Board</span>
              <h3>AI Systems Board - How my automations work</h3>
            </div>
            <div>
              <p>
                This board shows the common pattern behind my projects: raw inputs come in,
                automation tools prepare the data, AI adds reasoning, and the final result goes
                into useful business outputs.
              </p>
              <p className="systems-board-example">
                Example: emails or PDFs enter the workflow, n8n and Python prepare the content,
                an LLM classifies or summarizes it, and the result is sent to Sheets, email,
                reports, or dashboards.
              </p>
            </div>
          </div>
          <div className="systems-board-grid">
            {systemsBoard.map((column, index) => (
              <div
                className="systems-column"
                key={column.title}
                data-reveal
                style={{ transitionDelay: `${index * 90}ms` }}
              >
                <span>{column.number}</span>
                <h4>{column.title}</h4>
                <p>{column.description}</p>
                <ul>
                  {column.items.map((item) => <li key={item}>{item}</li>)}
                </ul>
                {index < systemsBoard.length - 1 && <i className="systems-step-dot" aria-hidden="true" />}
              </div>
            ))}
            <div className="systems-connectors" aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
          </div>
          <div className="recruiter-takeaway" data-reveal>
            <span>Recruiter takeaway:</span>
            <p>
              I can turn repeated manual tasks into structured AI workflows that collect
              information, reason over it, and deliver useful outputs.
            </p>
          </div>
        </div>

        <p className="capability-close" data-reveal>
          I don&apos;t just list AI tools. I connect them into useful workflows, retrieval systems,
          automations, dashboards, and operational products.
        </p>
      </div>
    </section>
  );
}

function Resume() {
  return (
    <section className="section resume" id="resume">
      <div className="container resume-grid">
        <div data-reveal>
          <p className="section-kicker"><span>05</span>Resume</p>
          <h2>Experience and projects, distilled.</h2>
        </div>
        <div className="resume-copy" data-reveal>
          <p>
            A focused resume for AI automation, workflow engineering, RAG systems, and practical
            LLM projects.
          </p>
          <div className="resume-actions">
            <a className="button button--dark" href="/resume.pdf" target="_blank" rel="noreferrer">
              View Resume <ArrowIcon />
            </a>
            <a className="button button--light" href="/resume.pdf" download>
              Download Resume <ArrowIcon />
            </a>
          </div>
          <dl className="resume-meta">
            <div><dt>Focus</dt><dd>AI Automation</dd></div>
            <div><dt>Location</dt><dd>Hyderabad, India</dd></div>
            <div><dt>Format</dt><dd>PDF</dd></div>
          </dl>
        </div>
      </div>
    </section>
  );
}

function Certifications() {
  return (
    <section className="section certifications" id="certifications">
      <div className="container">
        <SectionIntro
          index="04"
          label="Certifications"
          title="Current certifications from the latest resume."
          text="The portfolio lists only the certifications included in the uploaded resume."
        />
        <div className="certification-grid" data-reveal>
          {certifications.map((certification, index) => (
            <article
              className="certification-card"
              key={certification}
              style={{ transitionDelay: `${index * 70}ms` }}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{certification}</h3>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    let didCopy = false;

    try {
      await navigator.clipboard.writeText(contact.email);
      didCopy = true;
    } catch {
      const textArea = document.createElement("textarea");
      textArea.value = contact.email;
      textArea.setAttribute("readonly", "");
      textArea.style.position = "fixed";
      textArea.style.opacity = "0";
      document.body.appendChild(textArea);
      textArea.select();
      didCopy = document.execCommand("copy");
      document.body.removeChild(textArea);
    }

    if (!didCopy) return;

    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer className="footer" id="contact">
      <div className="container footer-shell">
        <div className="footer-top" data-reveal>
          <p className="section-kicker section-kicker--light"><span>06</span>Contact</p>
          <h2 aria-label="Let's build useful AI systems.">
            {["Let's", "build", "useful", "AI", "systems."].map((word, index) => (
              <span style={{ transitionDelay: `${index * 90}ms` }} key={word}>{word}</span>
            ))}
          </h2>
        </div>
        <div className="footer-grid" data-reveal>
          <div>
            <span>Contact</span>
            <a href={`mailto:${contact.email}`}>{contact.email}</a>
            <div className="footer-actions">
              <button type="button" onClick={copyEmail}>{copied ? "Copied" : "Copy Email"}</button>
              <a href={`mailto:${contact.email}`}>Email Me</a>
            </div>
          </div>
          <div>
            <span>Profiles</span>
            <a href={contact.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
            <a href={contact.github} target="_blank" rel="noreferrer">GitHub</a>
            <a href="/resume.pdf" target="_blank" rel="noreferrer">Resume</a>
          </div>
          <div>
            <span>Focus</span>
            <p>AI Automation</p>
            <p>RAG Systems</p>
            <p>Workflow Engineering</p>
            <p>LLM Tools</p>
          </div>
          <div>
            <span>Location</span>
            <p>Hyderabad, India</p>
            <p>Open to internships and roles</p>
          </div>
        </div>
        <div className="footer-inner">
          <p className="footer-signature">
            <img src="/branding/portfolio-logo-mark.png" alt="" width="28" height="28" />
            &copy; 2026 Kovi Varun Jaswanth Sai
          </p>
          <p>AI Automation Engineer</p>
          <a href="#hero" onClick={(event) => scrollToSection(event, "hero")}>
            Back to top <span aria-hidden="true">up</span>
          </a>
        </div>
      </div>
      <div className={`copy-toast ${copied ? "is-visible" : ""}`} role="status" aria-live="polite">
        Copied
      </div>
    </footer>
  );
}

function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(maxScroll > 0 ? window.scrollY / maxScroll : 0);
    };

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  return <div className="scroll-progress" style={{ transform: `scaleX(${progress})` }} aria-hidden="true" />;
}

function GlobalCursor() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const cursorRef = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion || window.matchMedia("(pointer: coarse)").matches) return undefined;

    const cursor = cursorRef.current;
    if (!cursor) return undefined;

    const moveCursor = (event) => {
      cursor.style.opacity = "1";
      cursor.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0) translate(-50%, -50%)`;
      const target = event.target;
      const interactive = target.closest?.("a, button, summary, .project-card, .capability-card, .skill-pill");
      cursor.classList.toggle("is-expanded", Boolean(interactive));
      cursor.classList.toggle("is-light", Boolean(target.closest?.(".capabilities, .contact, .footer, .menu-overlay")));
    };

    const hideCursor = () => {
      cursor.style.opacity = "0";
    };

    window.addEventListener("pointermove", moveCursor);
    window.addEventListener("pointerleave", hideCursor);
    return () => {
      window.removeEventListener("pointermove", moveCursor);
      window.removeEventListener("pointerleave", hideCursor);
    };
  }, [prefersReducedMotion]);

  if (prefersReducedMotion) return null;

  return <div className="global-cursor" ref={cursorRef} aria-hidden="true" />;
}

function PageLoader() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion || sessionStorage.getItem("kv-loader-seen") === "true") return undefined;

    setVisible(true);
    sessionStorage.setItem("kv-loader-seen", "true");

    const timer = window.setTimeout(() => setVisible(false), 950);
    return () => window.clearTimeout(timer);
  }, [prefersReducedMotion]);

  if (!visible) return null;

  return (
    <div className="page-loader" aria-hidden="true">
      <img src="/branding/portfolio-logo-mark.png" alt="" width="96" height="96" />
    </div>
  );
}

export default function App() {
  useEffect(() => {
    const elements = document.querySelectorAll("[data-reveal]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <PageLoader />
      <ScrollProgress />
      <GlobalCursor />
      <Header />
      <main>
        <Hero />
        <Work />
        <About />
        <Capabilities />
        <Certifications />
        <Resume />
      </main>
      <Footer />
    </>
  );
}
