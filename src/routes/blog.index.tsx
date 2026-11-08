import { createFileRoute } from "@tanstack/react-router";
import { Search, X } from "lucide-react";
import { useState } from "react";
import { PageHeader } from "@/components/site";
import { ArticleEntry } from "@/components/blog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { posts } from "@/content/blog";
import { filterPosts } from "@/lib/blog";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/blog/")({
  head: () =>
    seo(
      "Blog",
      "Articles on software, computational research and open-source work. Proposed posts are clearly marked as unpublished drafts.",
    ),
  component: Blog,
});

const categories = ["All", ...new Set(posts.map((post) => post.category))];

function Blog() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const matches = filterPosts(posts, query, category);
  function reset() {
    setQuery("");
    setCategory("All");
  }
  return (
    <>
      <PageHeader
        n="—"
        label="Blog"
        title="Notes & investigations."
        intro="Software, research, and open-source work. The first three articles are proposed topics, not finished publications."
      />
      <section className="container-page mt-14">
        <div className="flex flex-col gap-5 border-y border-hairline py-4 lg:flex-row lg:items-center lg:justify-between">
          <div role="group" aria-label="Article category" className="flex flex-wrap gap-2">
            {categories.map((name) => (
              <Button
                key={name}
                variant={category === name ? "default" : "ghost"}
                size="sm"
                aria-pressed={category === name}
                onClick={() => setCategory(name)}
                className="shadow-none"
              >
                {name}
              </Button>
            ))}
          </div>
          <label className="relative w-full lg:max-w-72">
            <span className="sr-only">Search articles</span>
            <Search
              size={16}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              aria-hidden
            />
            <Input
              type="search"
              placeholder="Search articles"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              className="pl-9 pr-10 shadow-none"
            />
            {query && (
              <Button
                size="icon"
                variant="ghost"
                onClick={() => setQuery("")}
                aria-label="Clear search"
                title="Clear search"
                className="absolute right-0 top-0"
              >
                <X />
              </Button>
            )}
          </label>
        </div>
        <p className="mt-5 label-mono" aria-live="polite">
          {matches.length} {matches.length === 1 ? "article" : "articles"}
        </p>
        {matches.length ? (
          <ul className="mt-5 border-t border-hairline">
            {matches.map((post, index) => (
              <ArticleEntry key={post.slug} post={post} index={index} />
            ))}
          </ul>
        ) : (
          <div className="border-b border-hairline py-20 text-center">
            <h2 className="text-2xl">No articles found.</h2>
            <p className="mt-3 text-muted-foreground">Nothing matches this search and category.</p>
            <Button onClick={reset} variant="outline" className="mt-6">
              <X size={16} />
              Clear filters
            </Button>
          </div>
        )}
      </section>
    </>
  );
}
