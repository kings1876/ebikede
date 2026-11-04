# SEO and growth audit, 4 Nov 2026

Scope: competitive keyword visibility, AI search optimisation, content structure, search intent, topical coverage and authority, organic growth.
Sources: the 1,270-keyword Semrush export (`docs/keywords-semrush-de.csv`), a crawl of all 420 German pages on a local production build, live checks of e-bike-zuverkaufen.de, and web searches for five head terms.
Limits: no Search Console data and no rank tracking, so there are no real impression, click or position numbers. The Semrush session in Chrome had expired, so competitor keyword lists were not pulled.

## 1. Competitive keyword visibility

What we have: 1,270 keywords, 360,830 monthly searches, KD below 25. 1,252 are mapped to an existing page, 18 (about 3,700 searches) point at brand pages that are too thin.

Who ranks for the head terms (web search, 4 Nov 2026):
- "e-bike kaufen" and "e-bike damen": MediaMarkt, Zweirad Stadler, Lucky Bike, Fahrrad XXL, Decathlon, Otto, Kaufland, Radwelt, e-bike.de. These are large retailers with trust badges, financing and many hundreds of products.
- "s-pedelec kaufen": retailers plus an editorial comparison (Upway "S-Pedelec Vergleich 2026"). Informational and comparison content wins here.
- Our own domain returned nothing for `site:e-bike-zuverkaufen.de`. The domain is live (HTTP 200, 840 sitemap URLs, latest deploy), so the site is probably not indexed yet. Verify in Search Console.

Reading of the keyword plan:
- 74% of the volume sits in two clusters: audience pages (damen, herren: 114,610) and generic terms (58,940). The head terms "e bike damen" (27,100) and "e bike herren" (22,200) are KD 20-22 but go up against retailers with far more products and trust signals. Winnable only after the page is clearly better than theirs.
- Better first targets are long-tail combinations with KD below 20 where we have 4 or more models: brand x audience, brand x type, motor pages, price pages.
- Brand gaps that cost volume: Canyon x Fully (2,000), Stromer x S-Pedelec (450), Canyon x MTB (370), Ghost x MTB (280), Winora x Lastenrad (260). Fix by adding products, not pages.

Without competitor data we cannot say which of these terms you already rank for. Re-open Semrush, then run Organic Research on lucky-bike.de, e-bike.de, fahrrad24.de and radwelt-shop.de to find keywords where small shops rank.

## 2. Search intent

- The research was deliberately transactional (primary) and commercial (secondary). Only 44 of 1,270 keywords (6,660 searches) are informational. There is almost no research for question and comparison queries ("welches e-bike", "e-bike test", "was kostet", "e-bike oder pedelec", "beste s-pedelec").
- Mismatches in the plan: "ebike leasing privat" (880), "welches e bike ist das beste" (390), "versicherungskennzeichen e bike" (90) and "s pedelec jobrad" (70) are all mapped to the generic /e-bikes/ page. They need the guides, but the guides were not in the keyword plan.
- Battery and spare-part searches ("bosch ersatzakku", "e bike akku bosch 500", about 1,500 searches combined) point at the Bosch category page. People searching for a replacement battery do not want to buy a new bike. The accessories page has only 9 items and about 80 words.
- Category and brand pages are product grids with a "Beliebte Auswahl" chip row. They carry no buying advice at all, so they only fit the transactional intent. Retailers add a short intro and a buying guide.

## 3. Website content structure

Crawl of 420 German pages (main content only):

| Type | Pages | Avg words | Notes |
|---|---|---|---|
| Product | 290 | 551 | unique per page, spec table, 5 H2s |
| Category and landing | 86 | 1,461 | almost all of it is product-card text; no editorial copy |
| Brand | 7 | 1,873 | same, product cards only |
| Guides | 9 | 391 | shortest 309; shorter than the 400-800 I claimed earlier |
| Accessories and parts | 10 | 78 | thin |

Internal links (static HTML):
- Guides receive 0 contextual links from category or product pages: 0 of 84 category pages and 0 of 290 product pages link to a guide. Only the sitewide menu links to them, and two guides (Versicherung, Pflege) are linked from one page only.
- 7 of 8 brand pages and 22 of 84 category pages have fewer than 3 inbound links.
- 79 of 290 product pages have fewer than 3 inbound links. The listing shows 24 products and the rest sits behind a "Weitere Modelle anzeigen" button, so most products are reachable by crawlers only through the sitemap and "related models" blocks.
- Titles: 24 category and 48 product titles are over 62 characters and will be cut in results; two guide titles are under 30 characters and waste space.

Good: one H1 per page, breadcrumbs everywhere, valid Product/Offer/Collection schema, hreflang, clean URLs.

## 4. AI search optimisation (ChatGPT, Perplexity, Google AI Overviews)

In place: llms.txt, auth.md, MCP endpoint, read-only product API, robots allowing GPTBot, ChatGPT-User, search bots, `Content-Signal: search=yes, ai-input=yes, ai-train=no`.

Gaps:
- AI answers quote clear question-and-answer passages. Only 1 page (the FAQ) uses that format. Guides, categories and products have none.
- No visible author, "last updated" date or sources on guides (only `dateModified` in schema).
- Organization schema has name, url and logo only: no address, contact point or `sameAs` (Trustpilot, social). AI engines use these to decide whether a shop is real. Real company data has to come from the owner.
- The accessory and replacement-part pages are too thin to be cited.
- No comparison tables in guides (type vs type, motor vs motor), which are the most cited format.
- Brand mentions outside the site (reviews sites, forums, press) cannot be measured here. This is the biggest factor for AI citations and the site has none yet that I could find.

## 5. Topical coverage and authority

Covered: buying guide, types, battery, leasing, subsidies, payment, insurance, law, maintenance.

Missing for a shop of this size (each maps to real search demand in the CSV or in the SERPs):
1. S-Pedelec comparison and buying guide (2,900 + 1,600 + 720 searches on the type page)
2. Best e-bike by use (commuting, touring, women, men, seniors, under 2,000/3,000 EUR)
3. Bosch vs Shimano vs Yamaha motors (CSV motor cluster: 14,130 searches)
4. Replacing and caring for Bosch batteries (about 1,500 searches combined)
5. Cube, Haibike, Canyon, Ghost, Winora, Zündapp, Stromer brand guides (which series fits whom)
6. Fully vs hardtail, e-MTB buying guide
7. Gravel and road e-bike guide (3,600 searches for "endurance rennrad")
8. Cargo bike family guide, Winora and Cube longtail
9. E-bike size chart (a size tool exists; no guide)
10. Pedelec vs e-bike vs S-Pedelec (legal side is covered, buying side is not)
11. Winter and storage, theft protection, locks (links to accessories)
12. Test and review pages per bestseller

Authority: topical hubs exist only as menu entries. There is no pillar to cluster structure (pillar guide, then cluster articles, then category and product pages linking up and down). Accuracy matters too: the guides still say Bosch CX gives "up to 85 Nm" while Bosch has raised it to 100 Nm and, per reports, 120 Nm by software update, and the product pages show 120 Nm. The two must agree.

## 6. Organic growth opportunities (ordered by effort vs effect)

Quick wins (days):
1. Link guides from category and product pages (a "Beratung" box with 2-3 matching guides per category type and on every product).
2. Render all products in the listing HTML (real `?seite=2` URLs or a "show all" link) so 79 weakly linked products get crawl paths.
3. Add a 150-250 word intro plus 4-6 FAQ items to each top category page (damen, herren, S-Pedelec, trekking, MTB, Bosch, Cube) using the keywords of that page.
4. Fix the Bosch torque statement in the guides, shorten overlong titles, extend the two short ones.
5. Submit sitemap in Google Search Console and Bing Webmaster Tools; request indexing of the top 20 pages.

Medium (1-3 weeks):
6. Write 8-10 longer guides (1,200+ words) from the list above with comparison tables and FAQ blocks.
7. Add shipping and returns details to the Product schema (`OfferShippingDetails`) and submit a free Google Merchant Center feed for free product listings.
8. Expand the accessories and spare-parts pages (Bosch batteries and chargers) to match the replacement-battery searches.
9. Add Organization details (address, contact, Trustpilot `sameAs`) once real data is confirmed.
10. Source 4+ more models for Canyon Fully, Stromer S-Pedelec, Ghost MTB, Winora cargo to unlock those pages.

Longer (1-3 months):
11. Off-site: Trustpilot and Google Business listings, e-bike test sites and forums, local dealer directories, press mentions. Needed for both Google trust and AI citations.
12. Second keyword research round for informational and question queries, and Semrush competitor gap analysis.
13. Track real positions: Search Console plus a rank tracker for the 100 priority keywords.

## Items outside this scope that still weaken the above
- The shop banner promises "JobRad Dienstrad möglich (-40%)". The leasing guide no longer promises savings, so this is inconsistent and may be misleading.
- Real company details (registration numbers, address) were flagged earlier as placeholders; they matter for trust, Merchant Center and AI entity signals.
