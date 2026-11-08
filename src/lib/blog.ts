import { parse } from "yaml";
import { z } from "zod";
import { unified } from "unified";
import remarkParse from "remark-parse";
import { toString } from "mdast-util-to-string";
import GithubSlugger from "github-slugger";

const dateSchema = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/)
  .refine((value) => {
    const date = new Date(`${value}T00:00:00Z`);
    return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value;
  }, "Use a real publication date in YYYY-MM-DD format");

const frontmatterSchema = z
  .object({
    title: z.string().min(1),
    description: z.string().min(1),
    slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
    category: z.string().min(1),
    status: z.enum(["draft", "published"]).default("draft"),
    date: dateSchema.optional(),
    readingTime: z.number().int().positive().optional(),
    cover: z.string().optional(),
    coverAlt: z.string().optional(),
  })
  .superRefine((value, context) => {
    if (value.status === "published" && !value.date)
      context.addIssue({
        code: "custom",
        message: "Published articles require a verified date",
        path: ["date"],
      });
    if (value.cover && !value.coverAlt)
      context.addIssue({
        code: "custom",
        message: "A cover image requires alt text",
        path: ["coverAlt"],
      });
  });

export type BlogPost = z.infer<typeof frontmatterSchema> & {
  body: string;
  minutes: number;
  toc: { id: string; title: string; depth: number }[];
};

export function parsePost(source: string): BlogPost {
  const match = source.trimStart().match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)([\s\S]*)$/);
  if (!match?.[1] || match[2] === undefined) throw new Error("Article requires YAML frontmatter");
  const metadata = frontmatterSchema.parse(parse(match[1]));
  const body = match[2].trim();
  const tree = unified().use(remarkParse).parse(body);
  const slugger = new GithubSlugger();
  const toc: BlogPost["toc"] = [];
  for (const node of tree.children) {
    if (node.type !== "heading") continue;
    const title = toString(node);
    const id = slugger.slug(title);
    if (node.depth === 2 || node.depth === 3) toc.push({ id, title, depth: node.depth });
  }
  const words = toString(tree).split(/\s+/).filter(Boolean).length;
  return {
    ...metadata,
    body,
    minutes: metadata.readingTime ?? Math.max(1, Math.ceil(words / 200)),
    toc,
  };
}

export function collectPosts(sources: Record<string, string>): BlogPost[] {
  const posts = Object.entries(sources)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([path, source]) => {
      try {
        return parsePost(source);
      } catch (error) {
        throw new Error(
          `Invalid article ${path}: ${error instanceof Error ? error.message : "invalid content"}`,
        );
      }
    });
  if (new Set(posts.map((post) => post.slug)).size !== posts.length)
    throw new Error("Article slugs must be unique");
  return posts.sort((a, b) => {
    if (a.status !== b.status) return a.status === "published" ? -1 : 1;
    return (b.date ?? "").localeCompare(a.date ?? "") || a.title.localeCompare(b.title);
  });
}

export function filterPosts(posts: BlogPost[], query: string, category: string) {
  const search = query.trim().toLowerCase();
  return posts.filter(
    (post) =>
      (category === "All" || post.category === category) &&
      `${post.title} ${post.description} ${post.category}`.toLowerCase().includes(search),
  );
}

export function formatPostDate(date: string) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00Z`));
}
