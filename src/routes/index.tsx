import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { ProjectCard, RoleBadge, SectionLabel, StatusTag } from "@/components/site";
import { areasOfWork, currentFocus, projects, site } from "@/content/site";
import { posts } from "@/content/blog";
import { ArticleEntry } from "@/components/blog";
import { images } from "@/content/images";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () => seo(site.positioning, site.tagline),
  component: Home,
});

function Home() {
  const selectedProjects = projects.filter((p) => p.featured).slice(0, 4);
  const openSourceProjects = projects.filter((p) => p.categories.includes("Open Source"));
  const projectLayouts = [
    "md:col-span-7",
    "md:col-span-5 md:mt-28",
    "md:col-span-5",
    "md:col-span-6 md:col-start-7 md:mt-20",
  ];
  const projectAspects = ["aspect-[4/3]", "aspect-[4/3]", "aspect-[4/5]", "aspect-[4/3]"];

  return (
    <>
      {/* Hero */}
      <section className="container-page pt-14 md:pt-24">
        <div className="grid gap-6 md:grid-cols-12">
          <div className="md:col-span-3">
            <p className="label-mono">{site.positioning}</p>
            <p className="mt-2 font-mono text-xs text-muted-foreground">@{site.githubHandle}</p>
          </div>
          <h1 className="display text-[clamp(2.8rem,8.2vw,7.5rem)] md:col-span-9 animate-rise">
            Building software. Maintaining open source. Exploring systems.
          </h1>
        </div>
        <div className="mt-12 grid gap-8 border-t border-hairline pt-8 md:grid-cols-12">
          <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground md:col-span-6 md:col-start-4">
            I am {site.name} — a software developer, open-source maintainer, and independent
            researcher. My work spans full-stack web platforms and data ingestion pipelines,
            maintaining developer tools under Hall of Codes, and modeling physical systems through
            computational simulation.
          </p>
          <div className="flex flex-wrap gap-3 md:col-span-3 md:justify-end md:self-start">
            <Link
              to="/work"
              className="inline-flex h-10 items-center gap-2 rounded-md bg-primary px-4 text-sm text-primary-foreground transition-opacity hover:opacity-85"
            >
              Selected work
              <ArrowRight size={14} />
            </Link>
            <a
              href={site.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-10 items-center gap-2 rounded-md border border-hairline px-4 text-sm transition-colors hover:bg-accent"
            >
              GitHub <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
      </section>

      {/* Areas of Work */}
      <section className="container-page mt-28">
        <div className="flex items-end justify-between">
          <SectionLabel n="01">Areas of work</SectionLabel>
          <Link to="/about" className="inline-flex items-center gap-1.5 text-sm link-underline">
            Engineering philosophy <ArrowUpRight size={14} />
          </Link>
        </div>
        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {areasOfWork.map((area) => (
            <div
              key={area.n}
              className="flex flex-col justify-between border border-hairline bg-card/60 p-6 md:p-8"
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className="label-mono">{area.n}</span>
                  <span className="label-mono text-foreground">{area.category}</span>
                </div>
                <h2 className="mt-4 text-2xl font-medium tracking-tight">{area.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {area.description}
                </p>
              </div>
              <ul className="mt-6 space-y-2 border-t border-hairline pt-4 text-xs text-muted-foreground">
                {area.highlights.map((item) => (
                  <li key={item} className="flex gap-2.5">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-foreground" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Selected work */}
      <section className="container-page mt-28">
        <div className="flex items-end justify-between">
          <SectionLabel n="02">Selected work</SectionLabel>
          <span className="label-mono">Independent · Open Source · Research</span>
        </div>
        <div className="mt-10 grid gap-x-8 gap-y-16 md:grid-cols-12">
          {selectedProjects.map((p, i) => (
            <div key={p.slug} className={projectLayouts[i]}>
              <ProjectCard
                p={p}
                index={i}
                aspect={projectAspects[i] ?? "aspect-[4/3]"}
                priority={i < 2}
              />
            </div>
          ))}
        </div>
        <Link
          to="/work"
          className="mt-16 flex items-center justify-between border-y border-hairline py-6 text-2xl tracking-tight transition-colors hover:bg-accent md:px-2"
        >
          <span>Explore full project archive ({projects.length})</span>
          <ArrowRight />
        </Link>
      </section>

      {/* Open Source & Maintainer Work */}
      <section className="container-page mt-28">
        <SectionLabel n="03">Open source & maintainer work</SectionLabel>
        <div className="mt-10 grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <h2 className="display text-4xl md:text-5xl">
              Stewarding shared codebases and shipping upstream.
            </h2>
            <p className="mt-6 leading-relaxed text-muted-foreground">
              Within the Hall of Codes open-source organization, I serve as a project maintainer on
              both Hall of Codes and DevPulse, and collaborate on shared engineering platforms such
              as WIDSP.
            </p>
            <div className="mt-4">
              <a
                href="https://github.com/hallofcodes"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-sm link-underline"
              >
                github.com/hallofcodes <ArrowUpRight size={14} />
              </a>
            </div>
            <div className="img-zoom mt-8 aspect-[16/10] border border-hairline bg-muted">
              <img
                src={images.wispHome}
                alt="Live WISP overview screen showing outbreak catalogue counts and latest official reports"
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
            <p className="mt-2 label-mono">
              Live screenshot — Worldwide Infectious Disease Surveillance Platform (WIDSP)
            </p>
          </div>

          <div className="divide-y divide-hairline border-y border-hairline md:col-span-6 md:col-start-7">
            {openSourceProjects.map((project) => (
              <div key={project.slug} className="py-7 first:pt-6 last:pb-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <RoleBadge role={project.roleLabel} />
                    {project.status !== project.roleLabel && (
                      <StatusTag>{project.status}</StatusTag>
                    )}
                  </div>
                  <span className="label-mono">{project.year}</span>
                </div>
                <h3 className="mt-3 text-2xl font-medium tracking-tight">
                  <Link
                    to="/work/$slug"
                    params={{ slug: project.slug }}
                    className="hover:underline"
                  >
                    {project.title}
                  </Link>
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {project.overview}
                </p>
                <div className="mt-4 flex flex-wrap items-center gap-4 text-xs">
                  <Link
                    to="/work/$slug"
                    params={{ slug: project.slug }}
                    className="inline-flex items-center gap-1 font-mono uppercase tracking-wider text-foreground link-underline"
                  >
                    Case study <ArrowRight size={12} />
                  </Link>
                  {project.links.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 font-mono uppercase tracking-wider text-muted-foreground hover:text-foreground"
                    >
                      {link.label} <ArrowUpRight size={12} />
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Current Focus */}
      <section className="container-page mt-28">
        <SectionLabel n="04">Current focus</SectionLabel>
        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {currentFocus.map((item) => (
            <div key={item.title} className="border-l border-hairline pl-6">
              <p className="label-mono">{item.area}</p>
              <h3 className="mt-2 text-xl font-medium tracking-tight">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.detail}</p>
              <Link
                to={item.href}
                className="mt-4 inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-foreground link-underline"
              >
                Inspect project <ArrowRight size={12} />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Blog */}
      <section className="container-page mt-28">
        <div className="flex items-center justify-between">
          <SectionLabel n="05">Blog</SectionLabel>
          <Link to="/blog" className="inline-flex items-center gap-2 text-sm link-underline">
            All articles <ArrowUpRight size={14} />
          </Link>
        </div>
        <ul className="mt-10 border-t border-hairline">
          {posts.map((post, i) => (
            <ArticleEntry key={post.slug} post={post} index={i} />
          ))}
        </ul>
      </section>
    </>
  );
}
