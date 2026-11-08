import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { PageHeader } from "@/components/site";
import { site } from "@/content/site";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/contact")({
  head: () =>
    seo(
      "Contact",
      "Connect with Siddhant on GitHub or via email for software development, open-source collaboration, and research discussions.",
    ),
  component: Contact,
});

function Contact() {
  return (
    <>
      <PageHeader
        n="—"
        label="Contact"
        title="Get in touch."
        intro="For open-source collaboration, software engineering discussions, or questions about my research, reach out directly through GitHub or email."
      />
      <section className="container-page mt-14 border-t border-hairline">
        <a
          href={site.github}
          target="_blank"
          rel="noreferrer"
          className="group flex items-center justify-between border-b border-hairline py-8"
        >
          <div>
            <p className="label-mono">GitHub</p>
            <p className="display mt-2 text-3xl sm:text-4xl md:text-6xl">@{site.githubHandle}</p>
          </div>
          <ArrowUpRight
            size={36}
            className="shrink-0 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
          />
        </a>
        <div className="flex items-center justify-between border-b border-hairline py-8">
          <div className="min-w-0">
            <p className="label-mono">Email</p>
            {site.email ? (
              <a
                href={`mailto:${site.email}`}
                className="display mt-2 block break-all text-2xl sm:text-4xl md:text-6xl hover:underline"
              >
                {site.email}
              </a>
            ) : (
              <p className="mt-2 text-2xl text-muted-foreground">Email address to be added.</p>
            )}
          </div>
          {site.email && (
            <a
              href={`mailto:${site.email}`}
              aria-label={`Email ${site.email}`}
              className="shrink-0 pl-4"
            >
              <ArrowUpRight size={36} />
            </a>
          )}
        </div>
      </section>
    </>
  );
}
