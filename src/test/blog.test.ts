import { describe, expect, it } from "vitest";
import { posts } from "@/content/blog";
import { collectPosts, filterPosts, parsePost } from "@/lib/blog";

const article = (extra = "", body = "## One\n\nA paragraph.\n\n## One\n\n### Three") =>
  `---\ntitle: Test article\ndescription: Example description\nslug: test-article\ncategory: Research\n${extra}\n---\n${body}`;

describe("Blog content rules", () => {
  it("keeps the three proposed topics as unpublished undated drafts", () => {
    expect(posts).toHaveLength(3);
    expect(posts.map((post) => post.title).sort()).toEqual(
      [
        "Reverse Engineering as a Way to Learn Software Development",
        "Investigating Mechanical Resonance with MATLAB",
        "Inside My WIDSP Contribution",
      ].sort(),
    );
    for (const post of posts) {
      expect(post.status).toBe("draft");
      expect(post.date).toBeUndefined();
      expect(post.readingTime).toBeUndefined();
    }
  });
  it("requires a verified date to publish an article", () => {
    expect(() => parsePost(article("status: published"))).toThrow();
    expect(parsePost(article('status: published\ndate: "2026-10-29"')).date).toBe("2026-10-29");
    expect(() => parsePost(article('status: published\ndate: "2026-02-30"'))).toThrow();
  });
  it("filters by category and case-insensitive title/description query together", () => {
    expect(filterPosts(posts, "  MATLAB  ", "Research").map((post) => post.slug)).toEqual([
      "investigating-mechanical-resonance-with-matlab",
    ]);
    expect(filterPosts(posts, "MATLAB", "Open source")).toEqual([]);
    expect(filterPosts(posts, "does-not-exist", "All")).toEqual([]);
  });
  it("estimates reading time from actual content and allows a minutes override", () => {
    expect(parsePost(article("", Array(401).fill("word").join(" "))).minutes).toBe(3);
    expect(parsePost(article("readingTime: 7")).minutes).toBe(7);
  });
  it("generates unique heading IDs for the table of contents", () => {
    expect(parsePost(article()).toc.map((heading) => heading.id)).toEqual([
      "one",
      "one-1",
      "three",
    ]);
  });
  it("rejects duplicate article slugs", () => {
    expect(() => collectPosts({ "a.md": article(), "b.md": article() })).toThrow(
      "Article slugs must be unique",
    );
  });
});
