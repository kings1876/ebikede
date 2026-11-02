# Bilingual taxonomy: German (default) + English

## Routing rules
- German = default, no prefix: `/e-bikes/e-trekkingbikes/`
- English = `/en/` prefix with translated slugs: `/en/e-bikes/e-trekking-bikes/`
- Every page exists in both languages with a 1:1 mapping (no half-translated sections).
- `<html lang="de-DE">` / `<html lang="en">`; each page carries hreflang `de-DE`, `en`, and `x-default` (= German URL), plus a self-referencing canonical per language.
- Sitemap lists both URLs per page with `xhtml:link` alternates. `llms.txt` stays one file, German first, English summary below.
- Language switcher links to the equivalent page (never to the other language's homepage). No automatic redirect by browser language (hurts crawling); show a dismissible suggestion banner instead.
- Slugs are translated, not copied (better English keywords). Product slugs stay identical in both languages (`/e-bike/<brand>-<model>/` and `/en/e-bike/<brand>-<model>/`).
- Legal: German Impressum, Datenschutz, AGB and Widerruf are the binding versions. English versions are marked "convenience translation, German version prevails" and need a legal review before launch.

## Slug mapping (DE -> EN)

| Page | DE | EN |
|---|---|---|
| Home | `/` | `/en/` |
| All e-bikes | `/e-bikes/` | `/en/e-bikes/` |
| E-MTB | `/e-bikes/e-mountainbikes/` | `/en/e-bikes/electric-mountain-bikes/` |
| E-MTB Hardtail | `.../hardtail/` | `.../hardtail/` |
| E-MTB Fully | `.../fully/` | `.../full-suspension/` |
| E-Trekking | `/e-bikes/e-trekkingbikes/` | `/en/e-bikes/electric-trekking-bikes/` |
| E-City | `/e-bikes/e-citybikes/` | `/en/e-bikes/electric-city-bikes/` |
| E-Cargo | `/e-bikes/e-lastenraeder/` | `/en/e-bikes/electric-cargo-bikes/` |
| S-Pedelec | `/e-bikes/s-pedelecs/` | `/en/e-bikes/speed-pedelecs/` |
| E-Road | `/e-bikes/e-rennraeder/` | `/en/e-bikes/electric-road-bikes/` |
| E-Gravel | `/e-bikes/e-gravelbikes/` | `/en/e-bikes/electric-gravel-bikes/` |
| E-Folding | `/e-bikes/e-faltraeder/` | `/en/e-bikes/electric-folding-bikes/` |
| Women | `/e-bikes/damen/` | `/en/e-bikes/womens/` |
| Men | `/e-bikes/herren/` | `/en/e-bikes/mens/` |
| Step-through | `/e-bikes/tiefeinsteiger/` | `/en/e-bikes/step-through/` |
| Unisex | `/e-bikes/unisex/` | `/en/e-bikes/unisex/` |
| Seniors | `/e-bikes/senioren/` | `/en/e-bikes/for-seniors/` |
| Under €1,000 | `/e-bikes/unter-1000-euro/` | `/en/e-bikes/under-1000-euro/` |
| Under €1,500 / 2,000 / 3,000 | `unter-1500-euro` / `-2000-` / `-3000-` | `under-1500-euro` / `-2000-` / `-3000-` |
| Over €3,000 | `/e-bikes/ab-3000-euro/` | `/en/e-bikes/over-3000-euro/` |
| Motor | `/e-bikes/antrieb/bosch/` | `/en/e-bikes/motor/bosch/` |
| Commuter | `/e-bikes/pendler/` | `/en/e-bikes/commuter/` |
| Family | `/e-bikes/familie/` | `/en/e-bikes/family/` |
| Long distance | `/e-bikes/fuer-lange-strecken/` | `/en/e-bikes/long-distance/` |
| Lightweight | `/e-bikes/leicht/` | `/en/e-bikes/lightweight/` |
| Deals | `/angebote/` | `/en/deals/` |
| Previous-year models | `/angebote/vorjahresmodelle/` | `/en/deals/previous-year-models/` |
| Brands | `/marken/` | `/en/brands/` |
| Accessories | `/zubehoer/` | `/en/accessories/` |
| Batteries | `/zubehoer/e-bike-akkus/` | `/en/accessories/batteries/` |
| Chargers | `/zubehoer/ladegeraete/` | `/en/accessories/chargers/` |
| Helmets | `/zubehoer/helme/` | `/en/accessories/helmets/` |
| Locks | `/zubehoer/schloesser/` | `/en/accessories/locks/` |
| Racks and bags | `/zubehoer/gepaecktraeger-taschen/` | `/en/accessories/racks-bags/` |
| Lights | `/zubehoer/beleuchtung/` | `/en/accessories/lights/` |
| Child seats | `/zubehoer/kindersitze/` | `/en/accessories/child-seats/` |
| Clothing | `/zubehoer/bekleidung/` | `/en/accessories/clothing/` |
| Spare parts | `/ersatzteile/` | `/en/spare-parts/` |
| Guides hub | `/ratgeber/` | `/en/guides/` |
| Buying guide | `/ratgeber/e-bike-kaufberatung/` | `/en/guides/e-bike-buying-guide/` |
| Bike types | `/ratgeber/e-bike-typen/` | `/en/guides/e-bike-types/` |
| Battery and range | `/ratgeber/e-bike-akku-reichweite/` | `/en/guides/battery-and-range/` |
| Subsidies | `/ratgeber/e-bike-foerderung/` | `/en/guides/subsidies-germany/` |
| Leasing (JobRad) | `/ratgeber/e-bike-leasing-jobrad/` | `/en/guides/bike-leasing-germany/` |
| Payment | `/ratgeber/e-bike-zahlung/` | `/en/guides/payment-and-crypto-discount/` |
| Insurance | `/ratgeber/e-bike-versicherung/` | `/en/guides/insurance/` |
| Rules and law | `/ratgeber/e-bike-recht/` | `/en/guides/e-bike-laws-germany/` |
| Care and maintenance | `/ratgeber/e-bike-pflege-wartung/` | `/en/guides/care-and-maintenance/` |
| Shipping | `/versand/` | `/en/shipping/` |
| Payment methods | `/zahlungsarten/` | `/en/payment-methods/` |
| Returns / withdrawal | `/widerruf/` `/rueckgabe/` | `/en/withdrawal/` `/en/returns/` |
| Warranty | `/garantie/` | `/en/warranty/` |
| Size guide | `/groessenberatung/` | `/en/size-guide/` |
| Contact | `/kontakt/` | `/en/contact/` |
| About | `/ueber-uns/` | `/en/about-us/` |
| FAQ | `/faq/` | `/en/faq/` |
| Legal notice | `/impressum/` | `/en/legal-notice/` |
| Privacy | `/datenschutz/` | `/en/privacy/` |
| Terms | `/agb/` | `/en/terms/` |
| Withdrawal policy | `/widerrufsbelehrung/` | `/en/withdrawal-policy/` |
| Battery notices | `/batterie-hinweise/` | `/en/battery-information/` |
| Packaging / WEEE | `/verpackung-elektrogeraete/` | `/en/packaging-weee/` |

## English keyword targets (unverified)
Home: buy e-bike Germany | E-MTB: electric mountain bike | Trekking: electric trekking bike | City: electric city bike
Cargo: electric cargo bike | S-Pedelec: speed pedelec 45 km/h | Guides: e-bike laws Germany, e-bike subsidy Germany

## Titles
DE: `E-Trekkingbike kaufen | Große Auswahl ab {Preis} € | EBike Zu Verkaufen`
EN: `Buy Electric Trekking Bikes | Wide Selection from €{price} | EBike Zu Verkaufen`

## Indexing
Noindex rules apply identically to both languages (filters, search, cart, checkout, thank-you pages). Emails, WhatsApp text and the order form must also be bilingual, following the language the customer ordered in.

## Scope impact (for the build)
- Roughly doubles pages, meta, schema, sitemap entries and email templates. English is a full translation, not machine-pasted placeholders.
- The reply-portal admin dashboard can stay German-only (internal tool) unless you want it bilingual.
- Product descriptions need both languages in the product data (`name_de/name_en`, `description_de/description_en`).
