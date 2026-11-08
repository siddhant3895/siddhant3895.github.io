import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, SectionLabel } from "@/components/site";
import { now } from "@/content/site";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/now")({
  head: () => seo("Now", "What Siddhant is focused on and learning right now."),
  component: Now,
});

function Now() {
  const groups: [string, string[]][] = [
    ["Focus", now.focus],
    ["Learning", now.learning],
    ["Making", now.making],
  ];
  return (
    <>
      <PageHeader
        n="—"
        label="Now"
        title="What I'm doing now."
        intro={`Last updated ${now.updated}.`}
      />
      <section className="container-page mt-16 grid gap-12 md:grid-cols-3">
        {groups.map(([t, items], i) => (
          <div key={t}>
            <SectionLabel n={String(i + 1).padStart(2, "0")}>{t}</SectionLabel>
            <ul className="mt-6 space-y-4">
              {items.map((x) => (
                <li key={x} className="text-lg">
                  {x}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>
    </>
  );
}
