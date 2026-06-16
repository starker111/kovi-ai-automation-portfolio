import React, { useEffect, useMemo, useRef, useState } from "react";

function ArrowIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="M4 16 16 4M7 4h9v9" />
    </svg>
  );
}

function isUsableUrl(value) {
  return typeof value === "string" && value.trim().length > 0;
}

function imageFallbackFor(src) {
  if (!src) return "";
  const interfaceMatch = src.match(/\/images\/projects\/interface\/(.+)-interface\.jpg$/);
  if (interfaceMatch) return `/images/projects/${interfaceMatch[1]}.jpg`;
  const workflowMatch = src.match(/\/images\/projects\/workflows\/(.+)-workflow\.jpg$/);
  if (workflowMatch) return `/images/projects/${workflowMatch[1]}-workflow.jpg`;
  const coverMatch = src.match(/\/images\/projects\/covers\/(.+)\.jpg$/);
  if (coverMatch) return `/projects/${coverMatch[1]}.png`;
  if (src.endsWith(".jpg")) return src.replace(/\.jpg$/, ".png");
  return "";
}

function videoFallbackFor(src) {
  if (!src) return "";
  if (src.startsWith("/videos/projects/")) {
    return src.replace("/videos/projects/", "/images/projects/");
  }
  return "";
}

function ProjectImage({ src, alt, className = "", fallbackText = "Preview coming soon.", ...props }) {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setCurrentSrc(src);
    setHasError(false);
  }, [src]);

  if (!src || hasError) {
    return <div className={`media-fallback ${className}`}>{fallbackText}</div>;
  }

  return (
    <img
      {...props}
      className={className}
      src={currentSrc}
      alt={alt}
      onError={() => {
        const fallback = imageFallbackFor(currentSrc);
        if (fallback && fallback !== currentSrc) {
          setCurrentSrc(fallback);
          return;
        }
        setHasError(true);
      }}
    />
  );
}

function ProjectVideo({ src, poster, title }) {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [status, setStatus] = useState(src ? "checking" : "error");

  useEffect(() => {
    setCurrentSrc(src);
    setStatus(src ? "checking" : "error");
  }, [src]);

  useEffect(() => {
    if (!currentSrc) return undefined;

    const controller = new AbortController();

    fetch(currentSrc, { method: "HEAD", signal: controller.signal })
      .then((response) => {
        if (response.ok) {
          setStatus("ready");
          return;
        }

        const fallback = videoFallbackFor(currentSrc);
        if (fallback && fallback !== currentSrc) {
          setCurrentSrc(fallback);
          return;
        }

        setStatus("error");
      })
      .catch((error) => {
        if (error.name === "AbortError") return;

        const fallback = videoFallbackFor(currentSrc);
        if (fallback && fallback !== currentSrc) {
          setCurrentSrc(fallback);
          return;
        }

        setStatus("error");
      });

    return () => controller.abort();
  }, [currentSrc]);

  if (!src || status === "error") {
    return <div className="media-fallback media-fallback--video">Demo coming soon.</div>;
  }

  if (status !== "ready") {
    return <div className="media-fallback media-fallback--video">Loading demo.</div>;
  }

  return (
    <video
      key={currentSrc}
      className="case-video"
      controls
      preload="metadata"
      poster={poster}
      aria-label={`${title} demo video`}
      onError={() => {
        const fallback = videoFallbackFor(currentSrc);
        if (fallback && fallback !== currentSrc) {
          setCurrentSrc(fallback);
          return;
        }
        setStatus("error");
      }}
    >
      <source src={currentSrc} type="video/mp4" />
    </video>
  );
}

export default function ProjectCaseStudyModal({ project, onClose }) {
  const closeButtonRef = useRef(null);
  const panelRef = useRef(null);
  const titleId = project ? `project-title-${project.slug}` : undefined;

  const actions = useMemo(() => {
    if (!project) return [];

    return [
      isUsableUrl(project.github) && {
        label: "Source Code",
        type: "link",
        href: project.github,
      },
      isUsableUrl(project.demoVideo) && {
        label: "Watch Demo",
        type: "jump",
        target: `project-${project.slug}-demo-video`,
      },
      isUsableUrl(project.workflowPreview) && {
        label: "Workflow Preview",
        type: "jump",
        target: `project-${project.slug}-workflow-preview`,
      },
      isUsableUrl(project.liveDemo) && {
        label: "Live Demo",
        type: "link",
        href: project.liveDemo,
      },
    ].filter(Boolean);
  }, [project]);

  useEffect(() => {
    if (!project) return undefined;

    closeButtonRef.current?.focus();
    document.body.classList.add("modal-open");

    const closeOnEscape = (event) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.classList.remove("modal-open");
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [project, onClose]);

  if (!project) return null;

  const stack = project.stack ?? [];

  const scrollToModalSection = (targetId) => {
    const panel = panelRef.current;
    const target = panel?.querySelector(`#${targetId}`);

    if (!panel || !target) return;

    panel.scrollTo({
      top: Math.max(0, target.offsetTop - 84),
      behavior: "smooth",
    });
  };

  return (
    <div className="project-modal" role="dialog" aria-modal="true" aria-labelledby={titleId}>
      <button
        className="project-modal-backdrop"
        type="button"
        aria-label="Close project case study"
        onClick={onClose}
      />
      <div className="project-modal-panel" ref={panelRef}>
        <div className="project-modal-top">
          <p><span>{project.number}</span>{project.category}</p>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Close project case study"
          >
            Close
          </button>
        </div>

        <header className="case-header">
          <h2 id={titleId}>{project.title}</h2>
          <p className="project-modal-summary">{project.description}</p>
          {actions.length > 0 && (
            <div className="case-actions" aria-label={`${project.title} actions`}>
              {actions.map((action) => (
                action.type === "link" ? (
                  <a key={action.label} href={action.href} target="_blank" rel="noopener noreferrer">
                    {action.label} <ArrowIcon />
                  </a>
                ) : (
                  <button key={action.label} type="button" onClick={() => scrollToModalSection(action.target)}>
                    {action.label} <ArrowIcon />
                  </button>
                )
              ))}
            </div>
          )}
        </header>

        <section className="case-section case-section--media" style={{ "--case-delay": "40ms" }}>
          <p className="case-label">Interface Preview</p>
          <div className="case-media-frame case-study-preview">
            <ProjectImage
              src={project.interfacePreview || project.cardImage}
              alt={`${project.title} interface preview`}
              fallbackText="Interface preview coming soon."
              width="1536"
              height="1024"
              loading="eager"
              decoding="async"
            />
          </div>
        </section>

        <div className="case-summary-grid">
          <section className="case-summary-card" style={{ "--case-delay": "80ms" }}>
            <p className="case-label">Problem</p>
            <p>{project.problem}</p>
          </section>
          <section className="case-summary-card" style={{ "--case-delay": "120ms" }}>
            <p className="case-label">What it solves</p>
            <p>{project.solves}</p>
          </section>
          <section className="case-summary-card" style={{ "--case-delay": "160ms" }}>
            <p className="case-label">What's included</p>
            <p>{project.included}</p>
          </section>
          <section className="case-summary-card" style={{ "--case-delay": "200ms" }}>
            <p className="case-label">How I built it</p>
            <p>{project.howBuilt}</p>
          </section>
        </div>

        <section className="case-section case-section--flow" style={{ "--case-delay": "240ms" }}>
          <p className="case-label">System Flow</p>
          <div className="workflow-steps">
            {project.workflow.map((step, index) => (
              <React.Fragment key={step}>
                <div className="workflow-step" style={{ "--step-delay": `${index * 70}ms` }}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <p>{step}</p>
                </div>
                {index < project.workflow.length - 1 && <i aria-hidden="true">-&gt;</i>}
              </React.Fragment>
            ))}
          </div>
        </section>

        {isUsableUrl(project.workflowPreview) && (
          <section
            className="case-section case-section--media"
            id={`project-${project.slug}-workflow-preview`}
            style={{ "--case-delay": "280ms" }}
          >
            <p className="case-label">Workflow Preview</p>
            <div className="case-media-frame workflow-preview-frame">
              <ProjectImage
                src={project.workflowPreview}
                alt={`${project.title} workflow preview`}
                width="1536"
                height="1024"
                loading="lazy"
                decoding="async"
              />
            </div>
          </section>
        )}

        {isUsableUrl(project.demoVideo) && (
          <section
            className="case-section case-section--media"
            id={`project-${project.slug}-demo-video`}
            style={{ "--case-delay": "320ms" }}
          >
            <p className="case-label">Demo Video</p>
            <div className="case-media-frame">
              <ProjectVideo
                src={project.demoVideo}
                poster={project.interfacePreview || project.cardImage}
                title={project.title}
              />
            </div>
          </section>
        )}

        <section className="case-section" style={{ "--case-delay": "360ms" }}>
          <p className="case-label">Stack</p>
          <div className="project-modal-stack" aria-label={`${project.title} tech stack`}>
            {stack.map((tool) => <span key={tool}>{tool}</span>)}
          </div>
        </section>

        <section className="case-outcome" style={{ "--case-delay": "400ms" }}>
          <p className="case-label">Outcome</p>
          <p>{project.outcome}</p>
        </section>
      </div>
    </div>
  );
}
