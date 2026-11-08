import { describe, expect, it } from "vitest";
import { nav, projects, site } from "@/content/site";
import { filterProjects, workCategories } from "@/lib/projects";

describe("Portfolio project rules", () => {
  it("establishes professional positioning without student framing", () => {
    expect(site.name).toBe("Siddhant");
    expect(site.positioning).toBe("Developer · Open Source · Research");
    expect(site.tagline.toLowerCase()).not.toContain("student");
    expect(site.tagline.toLowerCase()).not.toContain("aspiring");
  });

  it("offers All, Independent, Open Source and Research categories", () => {
    expect(workCategories).toEqual(["All", "Independent", "Open Source", "Research"]);
  });

  it("includes all verified independent, open-source, and research projects", () => {
    expect(projects.map((p) => p.slug)).toEqual([
      "district-air-scope",
      "hallofcodes",
      "devpulse",
      "tesla-oscillator",
      "widsp",
      "py-sentinel-scanner",
      "chess-tactical-analytics",
      "socket-peek",
      "cadance",
    ]);
    expect(filterProjects(projects, "", "All")).toHaveLength(9);
  });

  it("clearly identifies Maintainer role on Hall of Codes and DevPulse under Open Source", () => {
    const hallOfCodes = projects.find((p) => p.slug === "hallofcodes");
    const devpulse = projects.find((p) => p.slug === "devpulse");
    expect(hallOfCodes).toMatchObject({
      status: "Maintainer",
      roleLabel: "Maintainer",
      categories: ["Open Source"],
    });
    expect(devpulse).toMatchObject({
      status: "Maintainer",
      roleLabel: "Maintainer",
      categories: ["Open Source"],
    });
  });

  it("distinguishes collaborative work on WIDSP from maintainer and solo projects", () => {
    const widsp = projects.find((p) => p.slug === "widsp");
    expect(widsp).toMatchObject({
      status: "Collaborative",
      roleLabel: "Collaborator",
      categories: ["Open Source"],
    });
    expect(filterProjects(projects, "", "Open Source").map((p) => p.slug)).toEqual([
      "hallofcodes",
      "devpulse",
      "widsp",
    ]);
  });

  it("places Tesla Mechanical Oscillator study under Research with Researcher role", () => {
    const oscillator = projects.find((p) => p.slug === "tesla-oscillator");
    expect(oscillator).toMatchObject({
      status: "Research",
      roleLabel: "Researcher",
      categories: ["Research"],
    });
    expect(filterProjects(projects, "", "Research").map((p) => p.slug)).toEqual([
      "tesla-oscillator",
    ]);
  });

  it("categorizes DistrictWatch and personal tools under Independent", () => {
    expect(filterProjects(projects, "", "Independent").map((p) => p.slug)).toEqual([
      "district-air-scope",
      "py-sentinel-scanner",
      "chess-tactical-analytics",
      "socket-peek",
      "cadance",
    ]);
    expect(filterProjects(projects, "maintainer", "Open Source").map((p) => p.slug)).toEqual([
      "hallofcodes",
      "devpulse",
    ]);
    expect(filterProjects(projects, "socket", "Independent").map((p) => p.slug)).toEqual([
      "socket-peek",
    ]);
    expect(filterProjects(projects, "socket", "Open Source")).toEqual([]);
  });

  for (const slug of ["socket-peek", "cadance"]) {
    it(`${slug} is an ongoing private independent project without public links`, () => {
      const project = projects.find((p) => p.slug === slug);
      expect(project).toMatchObject({
        status: "Ongoing",
        roleLabel: "Developer",
        visibility: "Private",
        categories: ["Independent"],
        links: [],
      });
    });
  }

  it("keeps primary navigation focused on Work, Blog, About, and Contact", () => {
    expect(nav.map((item) => item.to)).toEqual(["/work", "/blog", "/about", "/contact"]);
  });
});
