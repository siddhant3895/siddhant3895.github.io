# Monochrome Maker Atlas

Build a polished personal portfolio website for a student developer, with a close visual inspiration from Plane.so's minimalist black-and-white UI language, but do not copy proprietary assets, exact page layouts, logos, or text. Reference: https://plane.so/. Prioritize the same restraint: black/white/soft gray palette, high-contrast typography, spacious editorial layouts, crisp grids, thin borders, subtle hover states, strong image-led sections, and quiet motion. Avoid gradients, neon, glassmorphism, generic SaaS cards, and clutter. This is a personal portfolio, not a project-management SaaS.

PROJECT NAME / IDENTITY
Use "Siddhant" as the visible name for now, with a small editable identity wordmark such as "S /". This is a draft and the owner can rename it later. Positioning: "Student developer exploring software, open source, computational research, and visual art." Keep the tone precise, curious, and credible. No invented awards, clients, metrics, experience, user counts, or credentials.

DESIGN
- Mostly monochrome: near-black #101010, white/off-white #f7f7f5, neutral grays, hairline borders.
- Large editorial typography, compact labels, generous whitespace, asymmetrical but disciplined grids.
- Build an image-forward home page using tasteful editorial placeholders/abstract grayscale images and project thumbnails where real assets are not yet provided. Make every image easy to replace. Do not pretend placeholders are the user's original artwork.
- Small custom details: thin rules, numbered section labels, simple arrow icons, understated hover transitions, image zoom/crop on hover, responsive navigation.
- Mobile-first, accessible, respect reduced motion.
- Avoid copying Plane's logo or any proprietary assets. Recreate the general minimal product-design sensibility, not a pixel-perfect clone.

PAGES
1. Home (/): minimal navigation, strong hero, short bio, selected work as image-led asymmetric grid, research highlight, open-source highlight, visual art preview, current focus, contact/footer.
2. Work (/work): projects catalogue with working search/filter chips and status labels.
3. Project detail pages (/work/widsp, /work/tesla-oscillator, /work/pulseatlas, /work/py-sentinel-scanner, /work/gpt-cloud-chatbot, /work/stockfish-experiment): consistent case study layout with overview, role, actual contribution, stack, decisions, challenges, limitations, next steps, and links. Do not invent details; mark uncertain items as "Details to be added" or use neutral draft copy.
4. Research (/research): feature the research title "When Tesla's Oscillator Meets Modern Science: A Computational Investigation into Mechanical Resonance" as a MATLAB computational research project. Do not claim peer review or invent results.
5. Visual Lab (/visual-lab): image-led art gallery with replaceable placeholders and accessible lightbox; clearly label sample placeholders in source/content so they can be replaced with original images.
6. About (/about): student developer, independent learning, open source, engineering, reverse engineering, and illustration. No private details.
7. Writing (/writing): editorial list of technical notes; no fake published article claims. Use clearly labelled draft/coming-soon entries if needed.
8. Now (/now): current focus and learning goals, editable data.
9. Contact (/contact): GitHub link and a contact placeholder, no invented email address.
10. Custom 404.

KNOWN CONTEXT / PROJECT INVENTORY
- GitHub username: siddhant3895. Link to https://github.com/siddhant3895.
- WIDSP repository: https://github.com/hallofcodes/worldwide-infectious-disease-surveillance-platform. Collaborative work. Candidate contribution areas include header/branding, filters, map-related UI, hover tooltip/bounds, and frontend refinements. Explicitly state collaborative work; do not claim to have built the entire platform or that every contribution merged unless verified.
- Research: "When Tesla's Oscillator Meets Modern Science: A Computational Investigation into Mechanical Resonance", with MATLAB simulations. Link to paper only if an actual URL is provided; otherwise show no fake link.
- PulseAtlas: preventive-health intelligence concept, TypeScript frontend/Python analytics proposed; mark as concept / in progress, do not make medical efficacy claims.
- py-sentinel-scanner: Python security-tool project; actual features not yet verified, so describe cautiously.
- GPT cloud chatbot: React frontend + Python/FastAPI backend experiment; don't claim current deployment/functionality without verification.
- Stockfish chess AI: experiment; distinguish my code from the existing Stockfish engine and third-party work.
- Visual artwork: detailed ink / creature illustration and manga-inspired work; use replaceable placeholders until actual art assets are supplied.
Keep content in central typed data objects/files so it is easy to edit.

FUNCTIONAL REQUIREMENTS
- Working responsive navigation and mobile menu.
- Functional work filters and search.
- Working project detail links.
- Functional lightbox for gallery images, keyboard accessible.
- Contact links only if real.
- Clear focus states and semantic HTML.
- Reduced-motion support.
- Metadata/title/description per page where practical.
- No broken routes or dead buttons.
- No fake stats/counters/testimonials.
- Reusable components but don't overengineer.
- Make the visual system consistent across all pages.

BUILD PROCESS
Start implementing rather than just returning a plan. Build a coherent, polished first version with all listed routes, shared design system, responsive layout, central content data, and useful placeholder states. Ensure the homepage is especially polished and image-forward. When finished, report what was actually implemented and any known limitations.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/78a1a949-7b00-46c4-b327-db26475ef944).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
