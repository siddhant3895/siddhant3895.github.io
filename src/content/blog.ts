import { collectPosts } from "@/lib/blog";

const sources = import.meta.glob<string>(["./posts/*.md", "!./posts/README.md"], {
  query: "?raw",
  import: "default",
  eager: true,
});
export const posts = collectPosts(sources);
