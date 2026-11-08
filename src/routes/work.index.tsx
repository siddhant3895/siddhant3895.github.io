import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Search } from "lucide-react";
import { PageHeader, ProjectCard } from "@/components/site";
import { projects } from "@/content/site";
import { Button } from "@/components/ui/button";
import { filterProjects, workCategories, type WorkCategory } from "@/lib/projects";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/work/")({
  head: () =>
    seo(
      "Work",
      "Independent software systems, open-source maintenance at Hall of Codes and DevPulse, collaborative engineering, and computational research.",
    ),
  component: Work,
});

const categoryDescriptions: Record<WorkCategory, string> = {
  All: "All verified projects across independent software development, open-source maintenance, collaborative engineering, and computational research.",
  Independent:
    "Projects initiated and architected independently — full-stack platforms, data pipelines, and CLI utilities.",
  "Open Source":
    "Repositories where I serve as an active project maintainer (Hall of Codes, DevPulse) or upstream collaborator (WIDSP).",
  Research:
    "Independent mathematical modeling, numerical simulation in MATLAB, and reproducible technical research.",
};

function Work() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<WorkCategory>("All");
  const list = filterProjects(projects, q, cat);

  return (
    <>
      <PageHeader
        n="—"
        label="Work"
        title="Projects & open source."
        intro="Organized by independent engineering, open-source maintenance and collaboration, and computational research. Each entry documents the problem, implementation, and my exact role."
      />
      <section className="container-page mt-14">
        <div className="flex flex-col gap-4 border-y border-hairline py-4 md:flex-row md:items-center md:justify-between">
          <div role="group" aria-label="Filter by category" className="flex flex-wrap gap-2">
            {workCategories.map((c) => (
              <Button
                key={c}
                variant="outline"
                size="sm"
                aria-pressed={cat === c}
                onClick={() => setCat(c)}
                className={`rounded-full border px-3.5 py-1 text-sm transition-colors ${cat === c ? "border-foreground bg-foreground text-background" : "border-hairline hover:border-foreground"}`}
              >
                {c}
              </Button>
            ))}
          </div>
          <label className="relative block md:w-72">
            <span className="sr-only">Search projects</span>
            <Search
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              aria-hidden
            />
            <input
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search by project, role, or stack"
              className="h-9 w-full rounded-md border border-hairline bg-card pl-9 pr-3 text-sm outline-none focus:border-foreground"
            />
          </label>
        </div>
        <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
          <p className="label-mono" aria-live="polite">
            {list.length} {list.length === 1 ? "project" : "projects"}
            {cat !== "All" ? ` in ${cat}` : ""}
          </p>
          <p className="text-xs text-muted-foreground">{categoryDescriptions[cat]}</p>
        </div>
        {list.length === 0 ? (
          <div className="mt-10 border border-dashed border-hairline p-16 text-center text-muted-foreground">
            No projects match.{" "}
            <Button
              variant="link"
              className="px-0"
              onClick={() => {
                setQ("");
                setCat("All");
              }}
            >
              Clear filters
            </Button>
          </div>
        ) : (
          <div className="mt-8 grid gap-x-8 gap-y-14 md:grid-cols-2">
            {list.map((p) => (
              <ProjectCard key={p.slug} p={p} index={projects.indexOf(p)} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
