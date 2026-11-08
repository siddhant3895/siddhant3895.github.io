import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight, LockKeyhole } from "lucide-react";
import { RoleBadge, SectionLabel, StatusTag } from "@/components/site";
import { projects } from "@/content/site";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/work/$slug")({
  loader: ({ params }) => {
    const project = projects.find((p) => p.slug === params.slug);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ loaderData }) => {
    if (!loaderData)
      return {
        meta: [
          ...seo("Project unavailable", "This project is unavailable.").meta,
          { name: "robots", content: "noindex" },
        ],
      };
    const { project } = loaderData;
    return {
      meta: [
        ...seo(project.title, project.summary).meta,
        ...(project.image?.startsWith("https://")
          ? [
              { property: "og:image", content: project.image },
              { name: "twitter:image", content: project.image },
            ]
          : []),
      ],
    };
  },
  component: ProjectPage,
  notFoundComponent: () => (
    <div className="container-page py-32">
      <p className="label-mono">404</p>
      <h1 className="display mt-6 text-6xl">Project not found.</h1>
      <Link to="/work" className="mt-8 inline-flex items-center gap-2 link-underline">
        <ArrowLeft size={14} /> Back to work
      </Link>
    </div>
  ),
  errorComponent: () => <div className="container-page py-32">This project failed to load.</div>,
});

function List({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((i) => (
        <li key={i} className="flex gap-3">
          <span className="mt-2.5 h-px w-4 shrink-0 bg-foreground" aria-hidden />
          <span>{i}</span>
        </li>
      ))}
    </ul>
  );
}

function ProjectPage() {
  const { project: p } = Route.useLoaderData();
  const idx = projects.findIndex((x) => x.slug === p.slug);
  const nextP = projects[(idx + 1) % projects.length];
  const sections: [string, string[]][] = [
    ["Role & contributions", p.contribution],
    ["Technical decisions", p.decisions],
    ["Challenges", p.challenges],
    ["Scope & limitations", p.limitations],
    ["Next steps", p.next],
  ];
  return (
    <article>
      <section className="container-page pt-12 md:pt-20">
        <Link
          to="/work"
          className="inline-flex items-center gap-2 label-mono hover:text-foreground"
        >
          <ArrowLeft size={12} /> All work
        </Link>
        <div className="mt-10 flex flex-wrap items-center gap-3">
          <RoleBadge role={p.roleLabel} />
          {p.status !== p.roleLabel && <StatusTag>{p.status}</StatusTag>}
          {p.visibility && (
            <span className="label-mono inline-flex items-center gap-2">
              <LockKeyhole size={12} aria-hidden />
              {p.visibility}
            </span>
          )}
          <span className="label-mono">
            {p.year ? `${p.year} · ` : ""}
            {p.categories.join(" / ")}
          </span>
        </div>
        <h1 className="display mt-6 break-words text-5xl md:text-8xl animate-rise">{p.title}</h1>
        <p className="mt-6 max-w-2xl text-xl text-muted-foreground">{p.summary}</p>
        {p.image && (
          <figure className="img-zoom mt-12 aspect-[16/9] border border-hairline bg-muted">
            <img src={p.image} alt={p.imageAlt} className="h-full w-full object-cover" />
          </figure>
        )}
      </section>

      <section className="container-page mt-16 grid gap-12 md:grid-cols-12">
        <aside className="space-y-8 md:col-span-4">
          <div>
            <p className="label-mono">Role</p>
            <div className="mt-2">
              <RoleBadge role={p.roleLabel} />
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.role}</p>
            </div>
          </div>
          <div>
            <p className="label-mono">Category</p>
            <p className="mt-2 text-sm">{p.categories.join(" · ")}</p>
          </div>
          <div>
            <p className="label-mono">Stack</p>
            <ul className="mt-2 flex flex-wrap gap-2">
              {p.stack.map((s) => (
                <li key={s} className="rounded border border-hairline px-2 py-0.5 text-sm">
                  {s}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="label-mono">Links</p>
            {p.links.length ? (
              <ul className="mt-2 space-y-1.5">
                {p.links.map((l) => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 link-underline"
                    >
                      {l.label} <ArrowUpRight size={13} />
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-2 text-sm text-muted-foreground">
                {p.visibility === "Private"
                  ? "Private repository — no public link."
                  : "Links to be added."}
              </p>
            )}
          </div>
        </aside>
        <div className="space-y-14 md:col-span-7 md:col-start-6">
          <div>
            <SectionLabel n="01">Overview</SectionLabel>
            <p className="mt-6 text-lg leading-relaxed">{p.overview}</p>
          </div>
          <div>
            <SectionLabel n="02">Problem & context</SectionLabel>
            <p className="mt-6 leading-relaxed text-muted-foreground">{p.problem}</p>
          </div>
          {sections.map(([title, items], i) => (
            <div key={title}>
              <SectionLabel n={String(i + 3).padStart(2, "0")}>{title}</SectionLabel>
              <div className="mt-6 text-muted-foreground">
                <List items={items} />
              </div>
            </div>
          ))}
          {p.figures && p.figures.length > 0 && (
            <div>
              <SectionLabel n={String(sections.length + 3).padStart(2, "0")}>
                Figures & visual evidence
              </SectionLabel>
              <div className="mt-6 grid gap-6 sm:grid-cols-2">
                {p.figures.map((fig) => (
                  <figure key={fig.src} className="border border-hairline bg-card p-3">
                    <div className="img-zoom aspect-[4/3] border border-hairline bg-muted">
                      <img
                        src={fig.src}
                        alt={fig.alt}
                        loading="lazy"
                        className="h-full w-full object-contain"
                      />
                    </div>
                    <figcaption className="mt-3 text-xs leading-relaxed text-muted-foreground">
                      {fig.caption}
                    </figcaption>
                  </figure>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {nextP && (
        <section className="container-page mt-24">
          <Link
            to="/work/$slug"
            params={{ slug: nextP.slug }}
            className="group flex items-end justify-between border-y border-hairline py-10"
          >
            <div>
              <p className="label-mono">Next project · {nextP.roleLabel}</p>
              <p className="display mt-3 text-4xl md:text-6xl">{nextP.title}</p>
            </div>
            <ArrowUpRight
              size={36}
              className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </Link>
        </section>
      )}
    </article>
  );
}
