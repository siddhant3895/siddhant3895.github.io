import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { formatPostDate, type BlogPost } from "@/lib/blog";

export function ArticleMeta({ post }: { post: BlogPost }) {
  return (
    <div className="flex flex-wrap gap-x-4 gap-y-2 label-mono">
      <span className="text-foreground">{post.category}</span>
      {post.status === "draft" ? (
        <>
          <span>Draft · not published</span>
          <span>Reading time pending</span>
        </>
      ) : (
        <>
          {post.date && <time dateTime={post.date}>{formatPostDate(post.date)}</time>}
          <span>{post.minutes} min read</span>
        </>
      )}
    </div>
  );
}

export function ArticleEntry({ post, index }: { post: BlogPost; index: number }) {
  return (
    <li className="border-b border-hairline">
      <Link
        to="/blog/$slug"
        params={{ slug: post.slug }}
        className="group grid gap-5 py-8 transition-colors hover:bg-accent/40 sm:grid-cols-12 sm:gap-6"
      >
        <span className="label-mono sm:col-span-1">{String(index + 1).padStart(2, "0")}</span>
        <div className={post.cover ? "min-w-0 sm:col-span-7" : "min-w-0 sm:col-span-10"}>
          <ArticleMeta post={post} />
          <h2 className="mt-4 max-w-3xl text-2xl font-medium leading-snug md:text-3xl">
            {post.title}
          </h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">{post.description}</p>
        </div>
        {post.cover && (
          <div className="img-zoom aspect-[4/3] sm:col-span-3">
            <img
              src={post.cover}
              alt={post.coverAlt ?? ""}
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
        )}
        <ArrowUpRight
          size={22}
          className="hidden justify-self-end transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 sm:block sm:col-span-1"
          aria-hidden
        />
      </Link>
    </li>
  );
}
