import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { SectionLabel, StatusTag } from "@/components/site";
import { research } from "@/content/site";
import { images } from "@/content/images";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/research")({
  head: () =>
    seo(
      "Research",
      "A MATLAB computational investigation into mechanical resonance inspired by Tesla's oscillator.",
    ),
  component: Research,
});

function Research() {
  return (
    <>
      <section className="container-page pt-16 md:pt-24">
        <SectionLabel n="—">Research</SectionLabel>
        <div className="mt-10 flex flex-wrap gap-3">
          <StatusTag>{research.status}</StatusTag>
          <span className="label-mono self-center">{research.kind}</span>
        </div>
        <h1
          className="display mt-8 max-w-6xl text-4xl md:text-7xl animate-rise"
          style={{ lineHeight: 1.02 }}
        >
          {research.title}
        </h1>
      </section>
      <section className="container-page mt-14">
        <figure className="img-zoom aspect-[21/9] border border-hairline bg-ink">
          <img
            src={images.hero}
            alt="Pendulum light trails (placeholder image, not a simulation output)"
            className="h-full w-full object-cover"
          />
        </figure>
        <figcaption className="mt-3 label-mono">
          Illustrative placeholder — not a figure from the study.
        </figcaption>
      </section>
      <section className="container-page mt-20 grid gap-12 md:grid-cols-12">
        <div className="md:col-span-7">
          <SectionLabel n="01">Abstract</SectionLabel>
          <p className="mt-6 text-xl leading-relaxed">{research.abstract}</p>
          <div className="mt-14">
            <SectionLabel n="02">Findings</SectionLabel>
            <p className="mt-6 text-muted-foreground">
              Results will be summarised here once the author publishes them. No results are claimed
              on this page.
            </p>
          </div>
        </div>
        <aside className="space-y-8 md:col-span-4 md:col-start-9">
          <div>
            <p className="label-mono">Methods</p>
            <ul className="mt-3 space-y-1">
              {research.methods.map((m) => (
                <li key={m}>{m}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="label-mono">Paper</p>
            {research.paperUrl ? (
              <a
                href={research.paperUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-flex items-center gap-1 link-underline"
              >
                Read paper <ArrowUpRight size={13} />
              </a>
            ) : (
              <p className="mt-3 text-muted-foreground">Not yet published online.</p>
            )}
          </div>
          <Link
            to="/work/$slug"
            params={{ slug: "tesla-oscillator" }}
            className="inline-flex items-center gap-1 link-underline"
          >
            Project case study <ArrowUpRight size={13} />
          </Link>
        </aside>
      </section>
    </>
  );
}
