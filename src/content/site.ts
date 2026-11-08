/**
 * Central content for the portfolio. Edit everything here.
 *
 * Project facts here are checked against public sources (GitHub repositories, the live
 * WISP and Hall of Codes sites, DevPulse, DistrictWatch, and the Zenodo record).
 * Maintainer, independent, research, and collaborative roles are credited accurately.
 */
import { images } from "./images";

export const site = {
  name: "Siddhant",
  wordmark: "Siddhant",
  positioning: "Developer · Open Source · Research",
  tagline:
    "Software developer, open-source maintainer, and independent researcher building practical web systems, data pipelines, and computational simulations.",
  github: "https://github.com/siddhant3895",
  githubHandle: "siddhant3895",
  // Set to a real address to show it on the contact page. Leave null to hide.
  email: "siddhant3895@gmail.com" as string | null,
};

export const nav = [
  { to: "/work", label: "Work" },
  { to: "/blog", label: "Blog" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export type Status = "Maintainer" | "Collaborative" | "Research" | "In progress" | "Ongoing";
export type Category = "Independent" | "Open Source" | "Research";
export type RoleLabel = "Maintainer" | "Developer" | "Researcher" | "Collaborator" | "Contributor";

export type ProjectFigure = {
  src: string;
  alt: string;
  caption: string;
};

export type Project = {
  slug: string;
  title: string;
  summary: string;
  year: string;
  status: Status;
  roleLabel: RoleLabel;
  categories: Category[];
  featured?: boolean;
  image?: string;
  visibility?: "Private";
  imageAlt: string;
  role: string;
  problem: string;
  overview: string;
  contribution: string[];
  stack: string[];
  decisions: string[];
  challenges: string[];
  limitations: string[];
  next: string[];
  figures?: ProjectFigure[];
  links: { label: string; href: string }[];
};

export const areasOfWork = [
  {
    n: "01",
    title: "Software & Data Systems",
    category: "Independent" as Category,
    description:
      "Designing full-stack web applications, data ingestion pipelines, and CLI utilities with clear boundaries between data validation, storage, and presentation.",
    highlights: [
      "DistrictWatch (District Air Scope) — nationwide Indian district-level AQI platform",
      "PySentinel & socket-peek — static file triage and network auditing CLI tools",
      "Chess Tactical Analytics — PGN parsing and opponent aggregation pipeline",
    ],
  },
  {
    n: "02",
    title: "Open Source & Maintenance",
    category: "Open Source" as Category,
    description:
      "Maintaining shared repositories under Hall of Codes, reviewing pull requests, simplifying frontend architecture, and contributing targeted upstream improvements.",
    highlights: [
      "Hall of Codes — Maintainer; static project catalog and showcase timeline",
      "DevPulse — Maintainer; WakaTime telemetry integration and dashboard architecture",
      "WIDSP — Collaborator; outbreak map bounds, hover tooltips, and filter layout",
    ],
  },
  {
    n: "03",
    title: "Computational Research",
    category: "Research" as Category,
    description:
      "Formulating mathematical models and running numerical simulations in MATLAB to test physical hypotheses against realistic damping and energy constraints.",
    highlights: [
      "Forced damped harmonic oscillator modeling in MATLAB",
      "Time-domain, frequency-response, and energy-accumulation analysis",
      "Reproducible LaTeX documentation and open preprint publication on Zenodo",
    ],
  },
] as const;

export const currentFocus = [
  {
    area: "Independent Engineering",
    title: "DistrictWatch (District Air Scope)",
    detail:
      "Refining CPCB OGD and OpenAQ station ingestion, IST daily history-window aggregation, and district-level air-quality comparison interfaces.",
    href: "/work/district-air-scope",
  },
  {
    area: "Open-Source Maintenance",
    title: "Hall of Codes & DevPulse",
    detail:
      "Maintaining organization repositories, streamlining WakaTime-backed project showcases in DevPulse, and curating community project documentation.",
    href: "/work/devpulse",
  },
  {
    area: "Computational Modeling",
    title: "Mechanical Resonance & Numerical Analysis",
    detail:
      "Extending MATLAB simulation scripts and Python data pipelines to study damped oscillatory systems and structured game telemetry.",
    href: "/work/tesla-oscillator",
  },
] as const;

export const projects: Project[] = [
  {
    slug: "district-air-scope",
    title: "DistrictWatch (District Air Scope)",
    summary:
      "A nationwide Indian district-level air-quality platform aggregating CPCB and OpenAQ station observations into IST-aligned daily snapshots.",
    year: "2026",
    status: "In progress",
    roleLabel: "Developer",
    categories: ["Independent"],
    featured: true,
    image: images.map,
    imageAlt:
      "Monochrome topographic map texture representing district-level air quality surveillance across India",
    role: "Developer — independent architecture, FastAPI ingestion backend, and React/TypeScript frontend.",
    problem:
      "Public air-quality portals in India typically expose isolated station readings without consistent district-level aggregation, explicit data-freshness indicators, or transparent handling of missing station coverage across states.",
    overview:
      "DistrictWatch (District Air Scope) is an independent full-stack platform built to monitor and compare district-level air quality across India. A Python FastAPI backend ingests hourly station observations from CPCB OGD and OpenAQ, validates pollutant units (µg/m³) and station availability, and computes IST-aligned daily district history windows. The React and TanStack Router frontend presents district AQI summaries, multi-day trend charts, side-by-side district comparisons, and methodology disclosures.",
    contribution: [
      "Architected the Python FastAPI backend with modular ingestion adapters for CPCB OGD payloads and OpenAQ hourly station feeds.",
      "Implemented pollutant unit validation (µg/m³), negative-value filtering, and IST (UTC+05:30) calendar-day history window recomputation.",
      "Built the React, TypeScript, and TanStack Router interface with state/district selectors, AQI band cards, trend charts, cross-district comparison views, and explicit data-quality indicators.",
      "Wrote a 47-test Python backend unittest suite and Vitest frontend integration tests covering live API serialization and deterministic mock fallback modes.",
    ],
    stack: [
      "TypeScript",
      "React",
      "TanStack Router",
      "Tailwind CSS",
      "Python",
      "FastAPI",
      "SQLite",
      "Vitest",
    ],
    decisions: [
      "Grouped hourly station observations by IST (UTC+05:30) calendar boundaries rather than raw UTC dates so daily district snapshots match local Indian reporting windows.",
      "Designed a dual-mode frontend data layer (live FastAPI client and deterministic mock service) so UI components and tests remain verifiable offline.",
      "Displayed explicit freshness badges and station-coverage caveats instead of interpolating synthetic AQI numbers for unmonitored districts.",
    ],
    challenges: [
      "Reconciling inconsistent pollutant unit formatting and partial hourly station coverage between CPCB OGD records and OpenAQ responses.",
      "Ensuring deterministic IST date-boundary evaluation and UTF-8 fixture parsing across Windows and Linux test environments.",
    ],
    limitations: [
      "District-level snapshots depend on active CPCB and OpenAQ ground stations; districts without nearby monitoring stations are explicitly marked rather than estimated.",
      "Built as an engineering and data-transparency platform, not an official regulatory forecast or medical advisory tool.",
    ],
    next: [
      "Expand historical snapshot retention and add state-level coverage diagnostics.",
      "Add downloadable CSV/JSON district snapshot exports for external analysis.",
    ],
    links: [
      { label: "Repository", href: "https://github.com/siddhant3895/district-air-scope" },
      { label: "Live preview", href: "https://district-air-scope.lovable.app" },
    ],
  },
  {
    slug: "hallofcodes",
    title: "Hall of Codes",
    summary:
      "Maintainer and frontend engineer for the Hall of Codes open-source developer community platform and project showcase.",
    year: "2026",
    status: "Maintainer",
    roleLabel: "Maintainer",
    categories: ["Open Source"],
    featured: true,
    image: images.hero,
    imageAlt: "Monochrome architectural grid representing the Hall of Codes community platform",
    role: "Maintainer — ongoing repository stewardship, frontend architecture, and project showcase engineering within the Hall of Codes team (not the sole creator).",
    problem:
      "Community organization websites that rely on live client-side GitHub API calls frequently suffer from rate-limit failures, slow page loads, and uncurated repository lists that mix forks with active projects.",
    overview:
      "Hall of Codes is an open-source developer organization focused on collaborative software engineering. As a maintainer, I help steward the organization's web platform alongside the core team. Rather than claiming sole ownership of the community website, my responsibility centers on maintaining codebase stability, reviewing contributions, and shipping structural improvements—including replacing runtime GitHub API calls with a curated static project catalog and responsive vertical timeline in pull request #47.",
    contribution: [
      "Maintain the Hall of Codes web repository as part of the organization's maintainer team, keeping the Next.js and TypeScript codebase clean and reliable.",
      "Replaced runtime GitHub API fetches on the showcase route with a curated static catalog of six non-fork organization repositories (merged PR #47).",
      "Designed and implemented a responsive vertical project timeline with cover banners, repository links, and explicit contributor credits.",
    ],
    stack: ["TypeScript", "Next.js", "React", "Tailwind CSS"],
    decisions: [
      "Replaced client-side GitHub REST queries with a typed static project catalog so the showcase renders deterministically without rate-limit degradation.",
      "Structured project cards and timeline nodes to highlight collaborative authorship and repository links clearly.",
    ],
    challenges: [
      "Balancing dense project metadata, cover imagery, and contributor attribution across desktop and mobile timeline breakpoints.",
    ],
    limitations: [
      "Shared organization platform maintained by a small team — I am a maintainer and contributor to the platform, not the sole founder or author of the entire site.",
    ],
    next: [
      "Continue maintaining the showcase and onboarding documentation as new Hall of Codes repositories are published.",
    ],
    links: [
      { label: "Repository", href: "https://github.com/hallofcodes/hallofcodes" },
      { label: "Live showcase", href: "https://www.hallofcodes.org/projects" },
      { label: "Pull request #47", href: "https://github.com/hallofcodes/hallofcodes/pull/47" },
    ],
  },
  {
    slug: "devpulse",
    title: "DevPulse",
    summary:
      "Maintainer work on an open-source coding telemetry, WakaTime analytics, and developer leaderboard platform.",
    year: "2026",
    status: "Maintainer",
    roleLabel: "Maintainer",
    categories: ["Open Source"],
    featured: true,
    image: images.pulse,
    imageAlt: "Monochrome telemetry waveform representing DevPulse coding activity analytics",
    role: "Maintainer — ongoing repository maintenance, feature scoping, and WakaTime telemetry integration within the Hall of Codes team (not the sole creator).",
    problem:
      "Developer productivity platforms can become cluttered when manual project-entry forms and auxiliary workspace modules drift away from verified editor telemetry.",
    overview:
      "DevPulse is an open-source coding analytics and leaderboard platform under Hall of Codes. Built with Next.js, TypeScript, Prisma (MySQL), and NextAuth, it synchronizes WakaTime activity logs to render 365-day consistency heatmaps, language and editor breakdowns, community leaderboards, and the Flex project showcase. As a maintainer, I work on keeping the platform focused on verified WakaTime telemetry—locking Flex project selection strictly to synced WakaTime projects and removing deprecated chat and Kanban modules across the dashboard.",
    contribution: [
      "Maintain the DevPulse repository alongside the Hall of Codes team, reviewing code paths and keeping the Next.js and Prisma stack maintainable.",
      "Locked the Flex project showcase workflow exclusively to synced WakaTime project records by removing arbitrary manual project-name overrides.",
      "Executed full-stack removal of deprecated chat and Kanban project-management modules across navigation, admin telemetry, API routes, and dependencies while preserving Prisma schema migration integrity.",
    ],
    stack: [
      "TypeScript",
      "Next.js",
      "React",
      "Prisma",
      "MySQL",
      "NextAuth",
      "Tailwind CSS",
      "WakaTime API",
    ],
    decisions: [
      "Enforced WakaTime project selection in the Flex modal so showcased projects and logged hours always correspond to verified editor telemetry.",
      "Kept Prisma database migrations intact while removing deprecated UI and API routes to prevent schema drift in production.",
    ],
    challenges: [
      "Auditing cross-cutting dependencies—including NextAuth sign-in callbacks, SSE event emitters, and admin dashboard counters—so removing legacy modules introduced zero regressions.",
    ],
    limitations: [
      "Collaborative organization repository initiated within Hall of Codes — my role is ongoing maintenance and targeted architectural refinement rather than sole authorship.",
    ],
    next: [
      "Support upcoming analytics refinements and dashboard performance improvements across leaderboards and telemetry views.",
    ],
    links: [
      { label: "Repository", href: "https://github.com/hallofcodes/devpulse" },
      { label: "Live platform", href: "https://devpulse.hallofcodes.org" },
      { label: "Maintainer fork", href: "https://github.com/siddhant3895/devpulse" },
    ],
  },
  {
    slug: "tesla-oscillator",
    title: "Tesla Mechanical Oscillator Study",
    summary:
      "An independent MATLAB computational investigation into forced damped mechanical resonance, published as a Zenodo preprint.",
    year: "2026",
    status: "Research",
    roleLabel: "Researcher",
    categories: ["Research"],
    featured: true,
    image: images.resonanceCurve,
    imageAlt:
      "Resonance curve from the study: steady-state amplitude in metres against driving frequency in radians per second, peaking at 20 rad/s",
    role: "Researcher & sole author — mathematical modeling, MATLAB simulation, figure generation, and LaTeX manuscript.",
    problem:
      "Popular accounts of Nikola Tesla's pocket mechanical oscillator claim that a small reciprocating device induced destructive structural vibrations, yet those claims are rarely evaluated against quantitative linear damping and energy-dissipation models.",
    overview:
      "“When Tesla's Oscillator Meets Modern Science: A Computational Investigation into Mechanical Resonance” models a forced damped harmonic oscillator in MATLAB to test how driving frequency alignment, system mass, and damping ratios govern steady-state amplitude and mechanical energy accumulation. Published openly on Zenodo under CC BY 4.0 alongside the full MATLAB and LaTeX source archive, the study provides a reproducible numerical baseline for evaluating historical resonance claims.",
    contribution: [
      "Formulated the second-order differential equation model for a forced damped harmonic system and defined parameter sweeps across damping regimes.",
      "Implemented MATLAB numerical simulations to compute frequency-response curves, time-domain displacement growth, and mechanical energy trajectories.",
      "Authored the research manuscript in LaTeX and published the preprint and reproducible code archive on Zenodo (DOI: 10.5281/zenodo.18348210).",
    ],
    stack: ["MATLAB", "LaTeX", "Numerical Simulation", "Differential Equations"],
    decisions: [
      "Modeled the system as a forced damped linear harmonic oscillator first so analytical magnification factors could be compared directly against simulated time-domain envelopes.",
      "Published both the typeset preprint and the complete MATLAB/LaTeX repository so every plot can be regenerated independently.",
    ],
    challenges: [
      "Choosing physically realistic damping ratios and time-step intervals so sharp resonance peaks at 20 rad/s reflect model dynamics rather than numerical integration error.",
    ],
    limitations: [
      "Computational study of an idealized linear system — no physical laboratory experiment or nonlinear structural failure testing is claimed.",
      "Published as an open Zenodo preprint, not a peer-reviewed journal publication.",
      "Simulated amplitudes depend directly on the assumed mass, stiffness, damping, and driving force parameters.",
    ],
    next: [
      "Extend the MATLAB scripts to examine multi-degree-of-freedom structural coupling and nonlinear damping terms.",
    ],
    figures: [
      {
        src: images.resonanceCurve,
        alt: "Resonance curve plotting steady-state amplitude against driving frequency, peaking at 20 rad/s",
        caption:
          "Figure 1 — Frequency response showing steady-state amplitude peaking at the natural frequency (20 rad/s).",
      },
      {
        src: images.timeDomain,
        alt: "Time-domain resonance displacement plot showing amplitude envelope growth",
        caption:
          "Figure 2 — Time-domain displacement under resonant forcing prior to damping equilibrium.",
      },
      {
        src: images.dampingCurve,
        alt: "Damping curve comparison across multiple damping coefficients",
        caption:
          "Figure 3 — Sensitivity of peak resonant amplitude to variations in the linear damping coefficient.",
      },
      {
        src: images.energyVsTime,
        alt: "Mechanical energy versus time plot from the MATLAB simulation",
        caption:
          "Figure 4 — Total mechanical energy accumulation over time under sustained periodic driving.",
      },
    ],
    links: [
      { label: "Paper (Zenodo)", href: "https://zenodo.org/records/18348210" },
      { label: "DOI: 10.5281/zenodo.18348210", href: "https://doi.org/10.5281/zenodo.18348210" },
      {
        label: "Simulation repository",
        href: "https://github.com/siddhant3895/physics-resonance-simulation",
      },
    ],
  },
  {
    slug: "widsp",
    title: "WIDSP",
    summary:
      "Collaborative frontend engineering on an open-source global infectious-disease surveillance and outbreak mapping platform.",
    year: "2026",
    status: "Collaborative",
    roleLabel: "Collaborator",
    categories: ["Open Source"],
    image: images.wispMap,
    imageAlt:
      "Global outbreak map on the live WISP site, with disease and time-window filter controls (real screenshot)",
    role: "Collaborator — frontend UI, map interaction, and filter layout refinements (collaborative project under Hall of Codes).",
    problem:
      "Public outbreak reports are distributed across separate health agencies and regional bulletins, making it difficult to filter active infectious-disease events by pathogen, geography, and reporting window in a single view.",
    overview:
      "The Worldwide Infectious Disease Surveillance Platform (WIDSP / WISP) is a collaborative open-source project under Hall of Codes that aggregates official outbreak reports onto an interactive world map. This is team-built software — I did not build the entire platform or backend ingestion pipeline; I contributed frontend improvements covering header branding, filter layout, hover tooltips, and MapLibre camera bounds that were merged upstream in pull request #1.",
    contribution: [
      "Refined the application header and branding hierarchy, removing the redundant hero call-to-action so surveillance data appears immediately.",
      "Improved map and filter bar layout alignment on the primary overview screen.",
      "Refined MapLibre GL map interaction behaviour, including hover tooltip anchoring and viewport camera bounds handling.",
      "Merged upstream into hallofcodes/wisp as pull request #1.",
    ],
    stack: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "MapLibre GL",
      "Prisma + PostgreSQL",
      "Zod",
    ],
    decisions: [
      "Submitted targeted frontend improvements through an upstream pull request rather than maintaining a diverging fork.",
      "Constrained MapLibre camera bounds and refined tooltip positioning so dense regional markers remain legible during pan and zoom.",
    ],
    challenges: [
      "Integrating responsive filter controls and map viewport constraints cleanly within an existing collaborative Next.js and MapLibre codebase.",
    ],
    limitations: [
      "My work covers frontend UI, filter layout, and map interaction only — not the backend epidemiological data pipeline or database modeling.",
      "Shared team project built with Hall of Codes collaborators, not a solo-authored application.",
    ],
    next: [
      "Continue supporting frontend polish and filter ergonomics as new surveillance data sources are added.",
    ],
    figures: [
      {
        src: images.wispMap,
        alt: "Live WISP global outbreak map with disease and time-window filter controls",
        caption:
          "Global outbreak map interface with pathogen filters, time-window controls, and bounded camera navigation.",
      },
      {
        src: images.wispHome,
        alt: "Live WISP overview screen displaying outbreak catalogue counts and latest official reports",
        caption:
          "Overview screen presenting catalogued outbreak reports and streamlined header navigation.",
      },
    ],
    links: [
      { label: "Repository", href: "https://github.com/hallofcodes/wisp" },
      { label: "Live site", href: "https://wisp.hallofcodes.org" },
      { label: "Pull request #1", href: "https://github.com/hallofcodes/wisp/pull/1" },
    ],
  },
  {
    slug: "py-sentinel-scanner",
    title: "PySentinel",
    summary:
      "A zero-dependency Python command-line static triage tool that inspects files through chunked SHA-256 hashing and signature checks.",
    year: "2026",
    status: "In progress",
    roleLabel: "Developer",
    categories: ["Independent"],
    image: images.code,
    imageAlt: "Monochrome code workspace placeholder for the PySentinel command-line scanner",
    role: "Developer — sole author of the hashing pipeline, signature matcher, and CLI.",
    problem:
      "Understanding how static file triage operates requires building the underlying hashing, buffered file I/O, and signature-matching mechanics directly rather than relying on opaque third-party wrappers.",
    overview:
      "PySentinel is an independent static triage scanner written in Python. It reads files in fixed-size chunks to compute SHA-256 digests, compares those digests against known hash signatures, and inspects script contents for suspicious keyword patterns using only the Python standard library.",
    contribution: [
      "Implemented the entire tool: chunked SHA-256 file hashing, signature database lookup, and static keyword inspection.",
      "Structured the CLI entry point and modular scanning engine using only built-in Python libraries.",
    ],
    stack: ["Python", "Standard library (hashlib, os, time)", "CLI"],
    decisions: [
      "Built the scanner exclusively on Python's standard library so it runs in any Python 3 environment without external package installation.",
      "Hashed files in fixed-size byte chunks so large binaries do not exhaust memory during directory scans.",
    ],
    challenges: [
      "Handling binary versus text file reads cleanly while keeping terminal scan output concise and readable.",
    ],
    limitations: [
      "Detects known static SHA-256 hashes and literal keyword patterns only — it is an educational static triage utility, not a production antivirus engine.",
      "Intended strictly for learning and authorized file inspection.",
    ],
    next: [
      "Add structured JSON report output and configurable signature manifest files.",
      "Add automated unit tests covering binary files and nested directory traversal.",
    ],
    links: [{ label: "Repository", href: "https://github.com/siddhant3895/py-sentinel-scanner" }],
  },
  {
    slug: "chess-tactical-analytics",
    title: "Chess Tactical Analytics",
    summary:
      "A Python data pipeline that parses PGN match logs and aggregates performance metrics against computer personalities.",
    year: "2026",
    status: "In progress",
    roleLabel: "Developer",
    categories: ["Independent"],
    image: images.chess,
    imageAlt: "Monochrome chess pieces placeholder for the Chess Tactical Analytics pipeline",
    role: "Developer — sole author of the PGN parser, data sanitation, and pandas aggregation pipeline.",
    problem:
      "Raw PGN match exports mix inconsistent metadata headers, incomplete games, and verbose move trees, making it tedious to spot recurring tactical blind spots against specific computer playstyles.",
    overview:
      "Chess Tactical Analytics is a Python data engineering pipeline that ingests PGN game files using python-chess, strips malformed records, extracts openings, move counts, Elo ratings, and termination causes, and aggregates outcomes against Chess.com computer personalities with pandas. The parsing and tabular aggregation stages are complete, while the chart visualization module remains in progress.",
    contribution: [
      "Built the PGN parsing and data-cleaning pipeline using python-chess and pandas to normalize match headers and game outcomes.",
      "Added opponent-personality tracking to group performance trends by computer playstyle and opening family.",
      "Documented the current scope honestly: tabular extraction is working while the matplotlib/seaborn plotting function is still a TODO.",
    ],
    stack: ["Python", "python-chess", "pandas", "matplotlib", "seaborn"],
    decisions: [
      "Used python-chess to parse game trees deterministically instead of brittle regular-expression scraping on raw PGN text.",
      "Decoupled PGN extraction and dataframe normalization from the visualization stage so cleaned datasets can be inspected independently.",
    ],
    challenges: [
      "Normalizing inconsistent PGN tags and filtering out aborted or malformed game logs prior to aggregation.",
    ],
    limitations: [
      "The chart visualizer function is still unfinished in the repository and does not export rendered plots yet.",
      "Operates on local PGN exports rather than a live web dashboard.",
    ],
    next: [
      "Complete the matplotlib/seaborn plotting module and commit sample visual output.",
      "Add summary breakdowns for endgame conversion and time-control performance.",
    ],
    links: [
      {
        label: "Repository",
        href: "https://github.com/siddhant3895/chess-tactical-analytics",
      },
    ],
  },
  {
    slug: "socket-peek",
    title: "socket-peek",
    summary:
      "An ongoing private CLI tool that runs commands behind a local HTTP/HTTPS proxy to audit contacted remote hosts.",
    year: "2026",
    status: "Ongoing",
    roleLabel: "Developer",
    visibility: "Private",
    categories: ["Independent"],
    imageAlt: "",
    role: "Developer — independent CLI utility in ongoing private development.",
    problem:
      "Install scripts and developer CLI tools frequently make outbound network requests, and auditing which remote hosts a command contacts usually requires cumbersome packet-capture setups or invasive MITM root certificates.",
    overview:
      "socket-peek is a lightweight, cross-platform supply-chain network auditor in private development. It runs a target command behind an ephemeral logging HTTP/HTTPS proxy and reports every remote hostname contacted during execution in a formatted terminal summary.",
    contribution: [
      "Designed and implemented the local proxy server, subprocess environment wrapper, and Rich terminal reporting output.",
    ],
    stack: ["Python 3.9+", "Rich", "HTTP/HTTPS Proxy", "CLI"],
    decisions: [
      "Used blind HTTP CONNECT tunneling without TLS interception so HTTPS hostnames can be logged without decrypting payloads or installing a custom certificate authority.",
    ],
    challenges: [
      "Propagating proxy environment variables reliably to child processes across Windows and Unix shells.",
    ],
    limitations: [
      "Observes only HTTP/HTTPS traffic from commands that honour standard proxy settings.",
      "Reports contacted hostnames rather than decrypted HTTPS URL paths or request payloads.",
      "Repository is currently private while the CLI interface is being finalized.",
    ],
    next: ["Add allowlist exit-code policies for CI pipelines and prepare a public release."],
    links: [],
  },
  {
    slug: "cadance",
    title: "Cadance",
    summary: "An ongoing independent software project currently in private development.",
    year: "2026",
    status: "Ongoing",
    roleLabel: "Developer",
    visibility: "Private",
    categories: ["Independent"],
    imageAlt: "",
    role: "Developer — independent software project in private development.",
    problem:
      "Developing a focused personal workflow and scheduling tool with minimal interface overhead before publishing the source.",
    overview:
      "Cadance is an ongoing independent software project developed in a private repository. Rather than publishing speculative claims or placeholder screenshots, detailed architecture notes and links are withheld until the initial release is public.",
    contribution: ["Independent domain modeling and ongoing application prototyping."],
    stack: ["TypeScript"],
    decisions: [
      "Kept the repository private during early iteration so core data structures can be validated before public release.",
    ],
    challenges: ["Keeping the core scheduling model simple and self-contained."],
    limitations: ["The repository and live build are private and not yet publicly accessible."],
    next: [
      "Open the repository and publish a technical write-up once the initial version stabilizes.",
    ],
    links: [],
  },
];
