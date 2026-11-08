# Publishing articles

Each `.md` file in this folder becomes a Blog entry and an article page. This README is documentation and is excluded from the article collection.

Use YAML frontmatter:

```yaml
---
title: Your verified article title
description: A short description
slug: your-article-slug
category: Software
status: draft
# For publication, set status: published and add the verified date:
# date: "YYYY-MM-DD"
# Optional estimated reading time override in minutes:
# readingTime: 5
# Optional cover (project-served URL or a hosted asset URL) and required alt text:
# cover: /images/example.jpg
# coverAlt: Description of the actual image
---
```

Write the article below the frontmatter using Markdown. Headings, paragraphs, links, lists, images, fenced code blocks, blockquotes and GFM tables are supported. Raw HTML is not executed. Three or more level-two/three headings enable the table of contents. Reading time is estimated at 200 words per minute unless overridden; drafts show “Reading time pending” rather than treating placeholder text as a finished article. Drafts are intentionally visible and marked as such. Publication dates remain blank until supplied. Keep slugs unique and stable.