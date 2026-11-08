import { Link } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { ArrowUpRight, LockKeyhole, Menu, X } from "lucide-react";
import { nav, site, type Project, type RoleLabel } from "@/content/site";

export function Header() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  return (
    <header className="sticky top-0 z-40 border-b border-hairline bg-background/90 backdrop-blur-sm">
      <div className="container-page flex h-14 items-center justify-between">
        <Link
          to="/"
          className="group inline-flex items-center gap-2.5 font-mono text-xs uppercase tracking-wider text-foreground transition-colors hover:text-muted-foreground"
          onClick={() => setOpen(false)}
        >
          <span className="inline-block h-2 w-2 rounded-full bg-foreground" aria-hidden />
          <span>{site.wordmark}</span>
          <span className="hidden text-muted-foreground sm:inline">/ {site.positioning}</span>
        </Link>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex gap-6 text-sm">
            {nav.map((n) => (
              <li key={n.to}>
                <Link
                  to={n.to}
                  className="text-muted-foreground transition-colors hover:text-foreground"
                  activeProps={{ className: "text-foreground font-medium" }}
                >
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <button
          className="md:hidden -mr-2 p-2"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      {open && (
        <nav
          id="mobile-nav"
          aria-label="Mobile"
          className="md:hidden border-t border-hairline bg-background"
        >
          <ul className="container-page py-4">
            {nav.map((n, i) => (
              <li key={n.to} className="border-b border-hairline last:border-0">
                <Link
                  to={n.to}
                  onClick={() => setOpen(false)}
                  className="flex items-baseline gap-4 py-3 text-2xl tracking-tight"
                >
                  <span className="label-mono">{String(i + 1).padStart(2, "0")}</span>
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}

export function Footer() {
  return (
    <footer className="mt-32 border-t border-hairline">
      <div className="container-page grid gap-10 py-14 md:grid-cols-12">
        <div className="md:col-span-7">
          <p className="label-mono">{site.positioning}</p>
          <p className="display mt-4 text-3xl md:text-5xl">
            Building software, maintaining open source, and exploring systems.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-6 text-sm">
            <Link to="/contact" className="inline-flex items-center gap-1.5 link-underline">
              Get in touch <ArrowUpRight size={14} />
            </Link>
            <a
              href={site.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground"
            >
              GitHub (@{site.githubHandle}) <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
        <ul className="grid grid-cols-2 gap-3 text-sm md:col-span-4 md:col-start-9 md:self-end">
          {nav.map((n) => (
            <li key={n.to}>
              <Link to={n.to} className="text-muted-foreground hover:text-foreground">
                {n.label}
              </Link>
            </li>
          ))}
          <li>
            <a
              href={site.github}
              target="_blank"
              rel="noreferrer"
              className="text-muted-foreground hover:text-foreground"
            >
              GitHub ↗
            </a>
          </li>
          {site.email && (
            <li>
              <a
                href={`mailto:${site.email}`}
                className="text-muted-foreground hover:text-foreground"
              >
                Email ↗
              </a>
            </li>
          )}
        </ul>
      </div>
      <div className="container-page flex flex-col gap-2 border-t border-hairline py-5 label-mono sm:flex-row sm:items-center sm:justify-between">
        <span>{site.name}</span>
        <span>{site.positioning}</span>
      </div>
    </footer>
  );
}

export function SectionLabel({ n, children }: { n: string; children: ReactNode }) {
  return (
    <div className="flex items-center gap-3 border-t border-hairline pt-4 label-mono">
      <span className="text-foreground">{n}</span>
      <span>{children}</span>
    </div>
  );
}

export function PageHeader({
  n,
  label,
  title,
  intro,
}: {
  n: string;
  label: string;
  title: ReactNode;
  intro?: ReactNode;
}) {
  return (
    <section className="container-page pt-16 md:pt-24">
      <SectionLabel n={n}>{label}</SectionLabel>
      <h1 className="display mt-10 max-w-5xl text-5xl md:text-8xl animate-rise">{title}</h1>
      {intro && <p className="mt-8 max-w-2xl text-lg text-muted-foreground">{intro}</p>}
    </section>
  );
}

export function StatusTag({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-hairline px-2.5 py-0.5 font-mono text-[0.68rem] uppercase tracking-wider">
      <span className="h-1.5 w-1.5 rounded-full bg-foreground" aria-hidden />
      {children}
    </span>
  );
}

export function RoleBadge({ role }: { role: RoleLabel }) {
  const tone =
    role === "Maintainer"
      ? "border-foreground bg-foreground text-background"
      : "border-hairline bg-secondary/60 text-foreground";
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-mono text-[0.68rem] uppercase tracking-wider ${tone}`}
    >
      {role}
    </span>
  );
}

export function ProjectCard({
  p,
  index,
  aspect = "aspect-[4/3]",
  priority,
}: {
  p: Project;
  index: number;
  aspect?: string;
  priority?: boolean;
}) {
  return (
    <article className="group flex flex-col">
      <Link to="/work/$slug" params={{ slug: p.slug }} className="block">
        <div className={`img-zoom ${aspect} border border-hairline bg-muted`}>
          {p.image ? (
            <img
              src={p.image}
              alt={p.imageAlt}
              loading={priority ? "eager" : "lazy"}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full flex-col justify-between p-6 text-muted-foreground">
              <div className="flex items-center justify-between gap-2">
                <span className="label-mono">{p.categories.join(" · ")}</span>
                {p.visibility === "Private" && <LockKeyhole size={16} aria-hidden />}
              </div>
              <div>
                <p className="font-mono text-xs uppercase tracking-wider text-foreground">
                  {p.title}
                </p>
                <p className="mt-2 label-mono">
                  {p.visibility === "Private"
                    ? "Private repository · Ongoing development"
                    : `${p.roleLabel} · ${p.status}`}
                </p>
              </div>
            </div>
          )}
        </div>
        <div className="mt-4 flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0 flex-1 basis-48">
            <p className="label-mono">
              {String(index + 1).padStart(2, "0")}
              {p.year ? ` · ${p.year}` : ""}
              {` · ${p.categories.join(" / ")}`}
            </p>
            <h3 className="mt-1.5 break-words text-xl font-medium tracking-tight group-hover:underline">
              {p.title}
            </h3>
          </div>
          <div className="flex shrink-0 flex-wrap items-center gap-2">
            <RoleBadge role={p.roleLabel} />
            {p.status !== p.roleLabel && <StatusTag>{p.status}</StatusTag>}
            <ArrowUpRight
              size={18}
              className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden
            />
          </div>
        </div>
        <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">{p.summary}</p>
      </Link>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-hairline pt-3">
        <ul className="flex flex-wrap gap-1.5" aria-label={`${p.title} technologies`}>
          {p.stack.slice(0, 4).map((tech) => (
            <li
              key={tech}
              className="rounded border border-hairline px-2 py-0.5 font-mono text-[0.68rem] text-muted-foreground"
            >
              {tech}
            </li>
          ))}
        </ul>
        {p.links.length > 0 ? (
          <div className="flex flex-wrap items-center gap-3 text-xs">
            {p.links.slice(0, 2).map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 font-mono text-[0.7rem] uppercase tracking-wider text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label} <ArrowUpRight size={12} aria-hidden />
              </a>
            ))}
          </div>
        ) : (
          <span className="label-mono">
            {p.visibility === "Private" ? "Private repo" : "Case study"}
          </span>
        )}
      </div>
    </article>
  );
}
