import {
  createFileRoute,
  Link,
  notFound,
  useRouter,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import { ArticleMeta } from "@/components/blog";
import { Button } from "@/components/ui/button";
import { posts } from "@/content/blog";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = posts.find((entry) => entry.slug === params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData }) => {
    if (!loaderData)
      return {
        ...seo("Article unavailable", "This article is unavailable."),
        meta: [
          ...seo("Article unavailable", "This article is unavailable.").meta,
          { name: "robots", content: "noindex" },
        ],
      };
    const { post } = loaderData;
    const metadata = seo(post.title, post.description);
    return {
      meta: [
        ...metadata.meta.filter((tag) => !("property" in tag && tag.property === "og:type")),
        { property: "og:type", content: "article" },
        ...(post.status === "draft" ? [{ name: "robots", content: "noindex" }] : []),
        ...(post.status === "published" && post.date
          ? [{ property: "article:published_time", content: `${post.date}T00:00:00Z` }]
          : []),
        ...(post.cover?.startsWith("https://")
          ? [
              { property: "og:image", content: post.cover },
              { name: "twitter:image", content: post.cover },
            ]
          : []),
      ],
    };
  },
  component: Article,
  notFoundComponent: () => (
    <div className="container-page py-32">
      <p className="label-mono">404 · Blog</p>
      <h1 className="display mt-6 text-5xl md:text-7xl">Article not found.</h1>
      <Button asChild variant="link" className="mt-8 px-0">
        <Link to="/blog">
          <ArrowLeft />
          Back to Blog
        </Link>
      </Button>
    </div>
  ),
  errorComponent: ArticleError,
});

function ArticleError({ reset }: ErrorComponentProps) {
  const router = useRouter();
  return (
    <div className="container-page py-32">
      <h1 className="text-3xl">This article couldn’t load.</h1>
      <div className="mt-6 flex gap-3">
        <Button
          onClick={async () => {
            await router.invalidate();
            reset();
          }}
        >
          Try again
        </Button>
        <Button asChild variant="outline">
          <Link to="/blog">Back to Blog</Link>
        </Button>
      </div>
    </div>
  );
}

function Article() {
  const { post } = Route.useLoaderData();
  const index = posts.findIndex((entry) => entry.slug === post.slug);
  const previous = posts[index - 1];
  const next = posts[index + 1];
  return (
    <article>
      <header className="container-page pt-12 md:pt-20">
        <Button asChild variant="link" className="px-0">
          <Link to="/blog">
            <ArrowLeft />
            Back to Blog
          </Link>
        </Button>
        <div className="mt-10">
          <ArticleMeta post={post} />
        </div>
        <h1 className="mt-6 max-w-5xl break-words text-4xl font-medium leading-tight md:text-6xl">
          {post.title}
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground">{post.description}</p>
        {post.cover && (
          <figure className="img-zoom mt-12 aspect-[16/9] border border-hairline">
            <img
              src={post.cover}
              alt={post.coverAlt ?? ""}
              className="h-full w-full object-cover"
            />
          </figure>
        )}
      </header>
      <div className="container-page mt-12 grid gap-12 border-t border-hairline pt-10 lg:grid-cols-12">
        {post.toc.length >= 3 && (
          <nav aria-label="Table of contents" className="lg:col-span-3">
            <div className="lg:sticky lg:top-24">
              <p className="label-mono">On this page</p>
              <ul className="mt-5 space-y-3 text-sm">
                {post.toc.map((heading) => (
                  <li key={heading.id} className={heading.depth === 3 ? "pl-4" : ""}>
                    <a
                      href={`#${heading.id}`}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      {heading.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        )}
        <div
          className={
            post.toc.length >= 3
              ? "min-w-0 lg:col-span-8 lg:col-start-5"
              : "min-w-0 lg:col-span-8 lg:col-start-3"
          }
        >
          <div className="article-prose">
            <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeSlug]} skipHtml>
              {post.body}
            </ReactMarkdown>
          </div>
        </div>
      </div>
      <nav
        aria-label="Adjacent articles"
        className="container-page mt-20 grid gap-8 border-y border-hairline py-8 md:grid-cols-2"
      >
        {previous ? (
          <Link to="/blog/$slug" params={{ slug: previous.slug }} className="group">
            <span className="label-mono inline-flex items-center gap-2">
              <ArrowLeft size={14} />
              Previous article
            </span>
            <p className="mt-3 text-xl group-hover:underline">{previous.title}</p>
          </Link>
        ) : (
          <div />
        )}
        {next && (
          <Link to="/blog/$slug" params={{ slug: next.slug }} className="group md:text-right">
            <span className="label-mono inline-flex items-center gap-2">
              Next article
              <ArrowRight size={14} />
            </span>
            <p className="mt-3 text-xl group-hover:underline">{next.title}</p>
          </Link>
        )}
      </nav>
    </article>
  );
}
