import { QueryClient } from "@tanstack/react-query";
import { createRouter, rootRouteId } from "@tanstack/react-router";
import { describe, expect, it } from "vitest";

import { routeTree } from "@/routeTree.gen";

// Match routes without running loaders or rendering: loaders may need a server or
// network the test run lacks, and jsdom never loads the stylesheets React waits on.
describe("App routing", () => {
  it("matches the Blog and each draft article directly", () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });
    expect(router.matchRoutes("/blog").at(-1)?.routeId).toBe("/blog/");
    for (const slug of [
      "reverse-engineering-as-a-way-to-learn",
      "investigating-mechanical-resonance-with-matlab",
      "inside-my-widsp-contribution",
    ]) {
      expect(router.matchRoutes(`/blog/${slug}`).at(-1)?.routeId).toBe("/blog/$slug");
    }
  });
  it("no longer matches the removed section routes", () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });
    expect(router.matchRoutes("/visual-lab").at(-1)?.routeId).toBe(rootRouteId);
    expect(router.matchRoutes("/writing").at(-1)?.routeId).toBe(rootRouteId);
    expect(router.matchRoutes("/now").at(-1)?.routeId).toBe(rootRouteId);
    expect(router.matchRoutes("/research").at(-1)?.routeId).toBe(rootRouteId);
  });
  it("matches a page for / instead of falling back to not found", () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });

    const matches = router.matchRoutes("/");

    expect(matches.at(-1)?.routeId).not.toBe(rootRouteId);
  });
});
