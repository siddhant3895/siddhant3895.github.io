import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { PageHeader, SectionLabel } from "@/components/site";
import { site } from "@/content/site";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/about")({
  head: () =>
    seo(
      "About",
      "Software developer, open-source maintainer, and independent researcher — how I approach engineering problems, maintain systems, and conduct computational research.",
    ),
  component: About,
});

const engineeringPrinciples = [
  {
    n: "01",
    title: "Understand the problem before writing code",
    body: [
      "Every useful system starts with understanding the underlying constraint rather than jumping straight to a framework. When building DistrictWatch (District Air Scope), the core challenge was not drawing charts—it was handling inconsistent pollutant units (µg/m³), missing ground-station coverage, and aligning hourly CPCB and OpenAQ observations with Indian Standard Time (UTC+05:30) reporting windows.",
      "Before implementing a feature, I trace where the data originates, how it can fail, and what assumptions the interface is making. If a district lacks active monitoring stations, the software should state that limitation clearly rather than interpolating a plausible-looking number.",
    ],
  },
  {
    n: "02",
    title: "Build and maintain understandable systems",
    body: [
      "Software spends far more time being read, debugged, and modified than being written for the first time. I favour architectures where responsibilities are separated cleanly: ingestion adapters validate external inputs, domain functions transform data deterministically, and UI components render predictable state.",
      "Where a simpler technical choice removes operational fragility, I take it. In PySentinel, using Python's built-in hashlib and standard I/O kept the static triage scanner dependency-free. In the Hall of Codes showcase, replacing runtime client-side GitHub API fetches with a typed static project catalog eliminated rate-limit failures and made builds reproducible.",
    ],
  },
  {
    n: "03",
    title: "Open-source maintenance and honest attribution",
    body: [
      "Working on shared codebases teaches discipline that solo projects rarely enforce. As a maintainer for Hall of Codes and DevPulse, my priority is keeping the existing system coherent—whether that means locking DevPulse's Flex project showcase strictly to verified WakaTime telemetry, removing deprecated workspace modules without breaking Prisma migrations, or reviewing pull requests for unintended side effects.",
      "Credibility in open source also requires being clear about authorship. Maintaining an organization repository, shipping targeted frontend improvements to a collaborative platform like WIDSP, and authoring an independent tool are distinct roles, and I document each accordingly.",
    ],
  },
  {
    n: "04",
    title: "Research, simulation, and learning through implementation",
    body: [
      "When I want to understand how a physical or computational mechanism actually behaves, I model it directly. In my study of Nikola Tesla's mechanical oscillator, I formulated a forced damped harmonic system in MATLAB to test historical resonance claims against quantitative damping and energy-accumulation constraints, publishing both the LaTeX manuscript and the simulation scripts on Zenodo.",
      "The same curiosity drives my reverse-engineering and tooling experiments—such as building socket-peek to observe which remote hosts a CLI command contacts behind an HTTP CONNECT proxy, or parsing raw PGN game trees in Python to study tactical patterns.",
    ],
  },
] as const;

const technicalStack = [
  ["Languages", "TypeScript, JavaScript, Python, MATLAB, C++, SQL, LaTeX, HTML/CSS"],
  ["Frontend & Web", "React, Next.js, TanStack Start & Router, Tailwind CSS, MapLibre GL, Vite"],
  ["Backend & Data", "FastAPI, Node.js, Prisma, PostgreSQL, MySQL, SQLite, pandas, REST APIs"],
  [
    "Research & Tooling",
    "MATLAB numerical modeling, Vitest, Python unittest, Git, GitHub Actions, Linux/CLI",
  ],
] as const;

function About() {
  return (
    <>
      <PageHeader
        n="—"
        label="About"
        title="How I approach software & engineering."
        intro="I am Siddhant — a software developer, open-source maintainer, and independent researcher focused on building reliable web applications, data pipelines, and numerical simulations."
      />

      {/* Editorial engineering philosophy */}
      <section className="container-page mt-20">
        <div className="grid gap-12 md:grid-cols-12">
          <aside className="md:col-span-4">
            <div className="border-t border-hairline pt-4">
              <p className="label-mono">Identity</p>
              <p className="mt-3 text-lg font-medium">{site.name}</p>
              <p className="mt-1 text-sm text-muted-foreground">{site.positioning}</p>
            </div>
            <div className="mt-8 border-t border-hairline pt-4">
              <p className="label-mono">Core Roles</p>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                <li>Software Developer — Independent Systems</li>
                <li>Open-Source Maintainer — Hall of Codes & DevPulse</li>
                <li>Independent Researcher — Computational Modeling</li>
              </ul>
            </div>
            <div className="mt-8 border-t border-hairline pt-4">
              <p className="label-mono">Links</p>
              <div className="mt-3 flex flex-col gap-2 text-sm">
                <a
                  href={site.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 link-underline"
                >
                  GitHub (@{site.githubHandle}) <ArrowUpRight size={14} />
                </a>
                <Link to="/work" className="inline-flex items-center gap-1.5 link-underline">
                  Project archive <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </aside>

          <div className="space-y-16 md:col-span-7 md:col-start-6">
            {engineeringPrinciples.map((section) => (
              <div key={section.n}>
                <SectionLabel n={section.n}>Engineering philosophy</SectionLabel>
                <h2 className="mt-5 text-2xl font-medium tracking-tight md:text-3xl">
                  {section.title}
                </h2>
                <div className="mt-4 space-y-4 text-base leading-relaxed text-muted-foreground">
                  {section.body.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Stack & Areas of Practice */}
      <section className="container-page mt-24">
        <SectionLabel n="05">Technical stack & domains</SectionLabel>
        <div className="mt-10 grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <h2 className="display text-3xl md:text-4xl">Tools chosen for the problem at hand.</h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              I work primarily in TypeScript and Python for web platforms, APIs, and data
              engineering, paired with MATLAB and LaTeX for mathematical modeling and technical
              documentation.
            </p>
          </div>
          <dl className="divide-y divide-hairline border-y border-hairline md:col-span-7 md:col-start-6">
            {technicalStack.map(([category, items]) => (
              <div key={category} className="grid gap-2 py-5 md:grid-cols-3">
                <dt className="font-mono text-xs uppercase tracking-wider text-foreground">
                  {category}
                </dt>
                <dd className="text-sm leading-relaxed text-muted-foreground md:col-span-2">
                  {items}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </>
  );
}
