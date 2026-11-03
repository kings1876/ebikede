# Keyword map: e-bike-zuverkaufen.de

Internal strategy document. Never publish it (not in `public/`).

## How the research was done
- About 430 seed queries (types, brands, price limits, motors, audiences, payment, guides) were run through Google Autosuggest for `hl=de`, `gl=de`, with a-z expansion on the 14 core seeds. That gave about 3,000 distinct search phrases.
- Autosuggest shows what people really type. It does **not** give search volumes. Before spending money on content or ads, check the volumes in Google Keyword Planner, Sistrix or Ahrefs.
- Score used for ranking terms: sum of (10 - position) across all seeds that returned the phrase.

## Intent clusters and the page that owns each one

| Cluster | Strongest phrases found | Owning page(s) |
|---|---|---|
| E-Bike (head term) | e-bike kaufen, e-bike kaufen günstig, e-bike kaufen damen / herren | `/` and `/e-bikes/` |
| Trekking | e-trekkingbike damen, e-trekkingbike herren, haibike e-bike trekking, e trekkingbike winora yakun | `/e-bikes/e-trekkingbikes/` + gender, brand and price pages below |
| City | e-citybike damen, e-citybike herren, e-citybike mit korb, e citybike winora | `/e-bikes/e-citybikes/` + children |
| Mountainbike | e-mountainbike fully, e-mtb fully, e-mtb hardtail, e-mountainbike cube, e-mountainbike herren, e-mountainbike bis 3000 euro | `/e-bikes/e-mountainbikes/`, `/fully/`, `/hardtail/` + children |
| Road | e-rennrad (unter 10 kg), e-rennrad cube, e-rennrad damen | `/e-bikes/e-rennraeder/`; "unter 10 kg" is answered by the Canyon Endurace:ONfly Sub 10 product page |
| Folding | faltrad e-bike, e-klapprad, zündapp e-bike klapprad, faltrad e bike unter 1000 euro, faltrad e-bike leicht | `/e-bikes/e-faltraeder/`, `/e-bikes/e-faltraeder/zuendapp/` |
| Cargo | e-lastenrad für 2 kinder, e-lastenrad klappbar, e-lastenrad leasing | `/e-bikes/e-lastenraeder/` (only 7 models; family guide needed) |
| S-Pedelec | s-pedelec kaufen, s-pedelec führerschein, stromer e bike 45 km/h, s-pedelec cube / bosch | `/e-bikes/s-pedelecs/`, `/e-bikes/s-pedelecs/stromer/`, guide page |
| Price | e-bike günstig kaufen, e-bike unter 1000 / 1500 / 2000 / 3000 euro, e mountainbike unter 3000 euro | `/e-bikes/unter-*-euro/` + category x price pages |
| Audience | e-bike damen, e-bike herren, tiefeinsteiger, senioren | `/e-bikes/damen/` etc. + category x gender pages |
| Brands | cube e-bike damen / herren / fully, haibike e-bike fully, zündapp e-bike damen, canyon e-bike fully, winora yakun, ghost e-teru | `/marken/<brand>/` + brand x category pages |
| Motor / battery | e-bike bosch, e bike akku 750 wh, e-bike yamaha motor | `/e-bikes/antrieb/*` |
| Guides | s-pedelec führerschein, e-bike reichweite, e-bike testsieger | `/ratgeber/` |

## Pages added in this round (47 per language, 94 in total)
Built automatically from the catalogue in `src/data/landing-combos.ts`. A page exists only if at least 4 bikes match.
- **Brand x category (17):** e.g. `/e-bikes/e-trekkingbikes/cube/`, `/e-bikes/e-mountainbikes/fully/haibike/`, `/e-bikes/e-rennraeder/canyon/`, `/e-bikes/s-pedelecs/stromer/`.
- **Gender x category (14):** e.g. `/e-bikes/e-citybikes/damen/`, `/e-bikes/e-trekkingbikes/herren/`, `/e-bikes/e-mountainbikes/hardtail/tiefeinsteiger/`.
- **Price x category (16):** e.g. `/e-bikes/e-mountainbikes/unter-3000-euro/`, `/e-bikes/e-trekkingbikes/unter-1500-euro/`.
- Title pattern: `{Marke/Typ} kaufen | {n} Modelle ab {Preis} | EBike Zu Verkaufen`. Titles and descriptions are generated from the real model count, price range and motors, so each page is unique.
- Category and brand pages show "Beliebte Auswahl" chips that link to their landing pages (internal linking, real `<a href>` links).
- "unter X €" means strictly below X (a 2,000 € bike is not "unter 2.000 €").

## Findings that change the plan
1. **No search demand for the payment hooks.** Autosuggest returned nothing for crypto, Bitcoin or bank transfer. The 10% crypto discount is a conversion argument on the page, not a keyword target.
2. **JobRad shows up often** (e-bike jobrad, cube e bike jobrad, s-pedelec jobrad). The site shows a JobRad banner without being a verified JobRad partner. Either apply to become a partner or remove the claim before building content around it.
3. **Brand + model queries are numerous but fragmented** (winora yakun x12, ghost e-teru advanced, zündapp z808). Product pages already target them with the model name in the title. Add the model series name to product H1s if rankings stall.
4. **Gebraucht / Occasion / ebay Kleinanzeigen** phrases are very frequent but do not fit a new-bike shop. Not targeted.
5. **Test / Testsieger / Stiftung Warentest** queries are very frequent. They are informational and need honest guide content; do not claim a test result you do not have.
6. **Location queries** (in der Nähe, Händler) cannot be served by an online-only shop.

## Gaps to fill next (content, not code)
| Priority | Page | Target phrases |
|---|---|---|
| 1 | Guide: S-Pedelec Führerschein, Versicherungskennzeichen, Helm, Radweg | s-pedelec führerschein, s-pedelec ohne führerschein strafe, s-pedelec versicherungskennzeichen |
| 2 | Guide: E-Lastenrad für 2 / 3 Kinder, klappbar | e-lastenrad für 2 kinder, e-lastenrad für 3 kinder |
| 3 | Guide: E-Bike Akku und Reichweite (500 / 625 / 750 Wh) | e bike akku 750 wh reichweite, e bike reichweite 625 wh |
| 4 | Guide: E-Rennrad unter 10 kg | e-rennrad unter 10 kg, e-rennrad ja oder nein |
| 5 | More cargo and folding bikes in the catalogue | e-lastenrad *, faltrad e-bike * |

## Not done (needs your input)
- Volume data (Keyword Planner / Sistrix) to rank the clusters above.
- Search Console: verify the domain, submit the sitemap, and watch which of the new pages get impressions.
- The custom domain `e-bike-zuverkaufen.de` must be live with HTTPS for any of this to rank; the pages currently live on the Vercel address.
