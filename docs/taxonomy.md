# Taxonomie & URL-Struktur: e-bike-zuverkaufen.de

Sprache: Deutsch (`<html lang="de-DE">`, hreflang `de-DE` + `x-default`). Währung EUR, Preise inkl. MwSt.
URLs: Kleinbuchstaben, ASCII (ae/oe/ue/ss statt Umlaute), Bindestriche, Trailing Slash, max. 3 Ebenen.
Status: ENTWURF. Suchvolumina sind NICHT verifiziert, vor dem Build mit Google Keyword Planner / Sistrix / Ahrefs prüfen.
Marken und Preisstufen sind Platzhalter, nur aufnehmen, was der Shop wirklich führt.

## Leitprinzip
Deutsche Käufer suchen zuerst nach **Fahrradtyp** ("E-Trekkingbike", "E-MTB", "E-Lastenrad"), dann nach **Preis**, **Zielgruppe**
(Damen/Herren/Tiefeinsteiger) und **Motor** (Bosch, Shimano). Daher: Typ = Hauptnavigation, alles andere = kuratierte,
indexierbare Landingpages (keine unkontrollierten Filterkombinationen).

## 1. Shop-Hierarchie (transaktionale Intention)

| URL | H1 / Hauptkeyword | Ebene |
|---|---|---|
| `/` | E-Bikes kaufen online (Marke + "E-Bike kaufen") | Home |
| `/e-bikes/` | E-Bikes kaufen: Alle Modelle | Hub |
| `/e-bikes/e-trekkingbikes/` | E-Trekkingbike kaufen | Kategorie |
| `/e-bikes/e-citybikes/` | E-Citybike kaufen | Kategorie |
| `/e-bikes/e-mountainbikes/` | E-Mountainbike (E-MTB) kaufen | Kategorie |
| `/e-bikes/e-mountainbikes/hardtail/` | E-MTB Hardtail | Unterkategorie |
| `/e-bikes/e-mountainbikes/fully/` | E-MTB Fully | Unterkategorie |
| `/e-bikes/e-rennraeder/` | E-Rennrad kaufen | Kategorie |
| `/e-bikes/e-gravelbikes/` | E-Gravelbike kaufen | Kategorie |
| `/e-bikes/e-faltraeder/` | E-Faltrad / E-Klapprad kaufen | Kategorie |
| `/e-bikes/e-lastenraeder/` | E-Lastenrad kaufen | Kategorie |
| `/e-bikes/s-pedelecs/` | S-Pedelec 45 km/h kaufen | Kategorie |
| `/e-bikes/e-kinder-jugendbikes/` | E-Bike für Jugendliche (optional) | Kategorie |
| `/e-bikes/<kategorie>/<produkt-slug>/` | Modellname + Marke + Typ | Produkt |

Produkt-URLs: `/produkt/<marke>-<modell>/` ist stabiler (Kategoriewechsel ändert keine URL). **Empfehlung: flache Produkt-URL
`/e-bike/<marke>-<modell>/`, Kategoriepfad nur im Breadcrumb.** Kein Duplicate Content durch Mehrfach-Kategorien.

## 2. Kuratierte Landingpages (indexierbar, je eigener Text + Produktauswahl)

**Zielgruppe / Rahmenform**
- `/e-bikes/damen/` · `/e-bikes/herren/` · `/e-bikes/tiefeinsteiger/` · `/e-bikes/unisex/` · `/e-bikes/senioren/`

**Preis (starke Kaufabsicht, "E-Bike unter 1000 Euro" etc.)**
- `/e-bikes/unter-1000-euro/` · `/e-bikes/unter-1500-euro/` · `/e-bikes/unter-2000-euro/` · `/e-bikes/unter-3000-euro/` · `/e-bikes/ab-3000-euro/`

**Antrieb**
- `/e-bikes/antrieb/bosch/` · `/antrieb/shimano-steps/` · `/antrieb/yamaha/` · `/antrieb/bafang/` · `/antrieb/fazua/` · `/antrieb/brose/`
  (einheitlich: `/e-bikes/antrieb/<motor>/`)

**Nutzung / Anlass**
- `/e-bikes/pendler/` (Pendler-E-Bike) · `/e-bikes/familie/` · `/e-bikes/fuer-lange-strecken/` · `/e-bikes/leicht/`

**Angebote**
- `/angebote/` (aktuelle Aktionen) · `/angebote/vorjahresmodelle/` · `/angebote/b-ware/`
- Optional wegen Domainname ("zu verkaufen"): `/gebrauchte-e-bikes/` nur wenn Gebrauchtverkauf Teil des Geschäftsmodells ist.

**Marken** (nur geführte Marken, Beispiele): `/marken/` + `/marken/cube/`, `/marken/kalkhoff/`, `/marken/haibike/`,
`/marken/ktm/`, `/marken/stevens/`, `/marken/bulls/`, `/marken/giant/`, `/marken/cannondale/`, `/marken/riese-und-mueller/`,
`/marken/fischer/`, `/marken/prophete/`

## 3. Zubehör & Ersatzteile
- `/zubehoer/` · `/zubehoer/e-bike-akkus/` · `/zubehoer/ladegeraete/` · `/zubehoer/helme/` · `/zubehoer/schloesser/`
- `/zubehoer/gepaecktraeger-taschen/` · `/zubehoer/beleuchtung/` · `/zubehoer/kindersitze/` · `/zubehoer/fahrradtraeger/`
- `/zubehoer/bekleidung/` · `/ersatzteile/` (Akku, Display, Ladegerät, Reifen)

## 4. Ratgeber / Content (informationelle Intention, Pillar → Cluster)

| Pillar (`/ratgeber/…/`) | Cluster-Beispiele |
|---|---|
| `e-bike-kaufberatung/` "E-Bike kaufen: Der große Ratgeber" | worauf achten, Rahmenhöhe/Größentabelle, Motor-Vergleich (Mittelmotor vs. Hinterradnabe), Akkukapazität (Wh), Bremsen, E-Bike Test/Vergleich |
| `e-bike-typen/` | Trekking vs. City, E-MTB Hardtail vs. Fully, Wann S-Pedelec |
| `e-bike-akku-reichweite/` | Reichweite berechnen, Akku laden/lagern, Akku Lebensdauer, Akku Tausch |
| `e-bike-foerderung/` | Förderung Bund/Länder/Kommunen, Lastenrad-Förderung, Zuschuss Arbeitgeber |
| `e-bike-leasing-jobrad/` | Dienstrad-Leasing Ablauf, Steuer (1%-Regel/0,25%), Leasing vs. Kauf |
| `e-bike-finanzierung/` | Ratenkauf, Klarna, Rechnungskauf |
| `e-bike-versicherung/` | Diebstahlschutz, Vollkasko, Hausrat |
| `e-bike-recht/` | Helmpflicht, Führerschein/Kennzeichen S-Pedelec, Versicherungskennzeichen, Tuning-Verbot |
| `e-bike-pflege-wartung/` | Reinigung, Inspektion, Winter, Reifen, Kette |

## 5. Service- & Rechtsseiten (Vertrauen + Pflicht in DE)
`/versand/` (Spedition, Montagegrad, Lieferzeit) · `/zahlungsarten/` · `/finanzierung/` · `/widerruf/` ·
`/rueckgabe/` · `/garantie/` · `/groessenberatung/` · `/probefahrt-abholung/` (falls Standort) · `/kontakt/` · `/ueber-uns/` · `/faq/` ·
**Pflicht:** `/impressum/` · `/datenschutz/` · `/agb/` · `/widerrufsbelehrung/` · `/batterie-hinweise/` (BattG) ·
`/verpackung-elektrogeraete/` (VerpackG/ElektroG-Hinweise). Cookie-Consent (TTDSG/DSGVO) vor Tracking.

## 6. Indexierungs- und Facettenregeln
- Index: Hubs, Kategorien, kuratierte Landingpages, Marken, Produkte, Ratgeber. Mindestens 150 Wörter Unikat-Text pro Kategorie.
- **noindex,follow:** Filterkombinationen (`?farbe=…&rahmenhoehe=…`), Sortierung, Suchergebnisse `/suche/`, Warenkorb, Checkout, Danke-Seiten.
- Parameter-URLs: Canonical auf die saubere Kategorie-URL. Paginierung `?seite=2` self-canonical, Link-Rel nicht mehr nötig.
- Filter-Attribute (nicht als URL, nur UI): Rahmenhöhe, Farbe, Akku-Wh, Reichweite, Gänge, Bremse, Gewicht, Rahmenform, Verfügbarkeit.
- Ausverkaufte Produkte: Seite behalten, `availability: OutOfStock`, Alternativen verlinken. Dauerhaft eingestellt: 301 auf Kategorie.
- Interne Verlinkung: Hub → Kategorie → Produkt; Ratgeber → 2–3 Kategorien/Produkte; Produkt → Breadcrumb + 3–4 ähnliche.
- Breadcrumbs: Home › E-Bikes › E-Trekkingbikes › Modell (BreadcrumbList-Schema).

## 7. Schema & Titel-Muster
- Produkt: `Product` + `Offer` (EUR, `priceValidUntil`, Verfügbarkeit, `shippingDetails`, `hasMerchantReturnPolicy` DE) + `Brand`;
  `AggregateRating`/`Review` nur bei echten Bewertungen.
- Kategorie: `CollectionPage` + `BreadcrumbList` (+ `ItemList`). Home: `Store`/`Organization` + `WebSite` + `FAQPage`.
- Title Kategorie: `E-Trekkingbike kaufen | Große Auswahl ab {Preis} € | {Marke}` (≤60 Zeichen).
- Title Produkt: `{Marke} {Modell} E-{Typ} {Jahr} kaufen | {Marke}`.
- Meta Description ~150 Zeichen, mit Nutzen (Versand, Rückgabe, Beratung).

## 8. Primärkeyword-Zuordnung (unverifiziert)
| Seite | Primär | Sekundär |
|---|---|---|
| Home | e-bike kaufen | e-bike online kaufen, pedelec kaufen |
| /e-bikes/ | e-bikes | e-bike angebote, e-bike shop |
| E-Trekkingbikes | e-trekkingbike | trekking e-bike damen/herren |
| E-Citybikes | e-citybike | city e-bike, e-bike tiefeinsteiger |
| E-MTB | e-mountainbike | e-mtb kaufen, e-mtb fully/hardtail |
| E-Lastenräder | e-lastenrad | cargo bike elektro, lastenrad förderung |
| S-Pedelecs | s-pedelec | e-bike 45 km/h |
| Preisseiten | e-bike unter 1000 euro | günstige e-bikes |
| Ratgeber Kauf | e-bike kaufen worauf achten | e-bike ratgeber |
| Förderung | e-bike förderung | lastenrad förderung 2026 |
| Leasing | e-bike leasing | jobrad e-bike, dienstrad |

## 9. Konfig-Skelett (Übernahme in `src/config/site.js`)
```js
export const CATEGORIES = [
  { slug: 'e-trekkingbikes', name: 'E-Trekkingbikes', parent: 'e-bikes' },
  { slug: 'e-citybikes', name: 'E-Citybikes', parent: 'e-bikes' },
  { slug: 'e-mountainbikes', name: 'E-Mountainbikes', parent: 'e-bikes',
    children: ['hardtail', 'fully'] },
  { slug: 'e-rennraeder', name: 'E-Rennräder', parent: 'e-bikes' },
  { slug: 'e-gravelbikes', name: 'E-Gravelbikes', parent: 'e-bikes' },
  { slug: 'e-faltraeder', name: 'E-Falträder', parent: 'e-bikes' },
  { slug: 'e-lastenraeder', name: 'E-Lastenräder', parent: 'e-bikes' },
  { slug: 's-pedelecs', name: 'S-Pedelecs (45 km/h)', parent: 'e-bikes' },
]
```

## Offene Fragen vor dem Build
1. Neu, Vorjahresmodelle, B-Ware oder gebraucht? (Domain "zu verkaufen")
2. Welche Marken/Motoren werden geführt? Lieferant/Dropshipping oder eigenes Lager?
3. Versand per Spedition, Montagegrad, Abholung/Probefahrt vor Ort?
4. Zahlung: PayPal, Klarna, Rechnung, Ratenkauf, JobRad-Partner?
5. Impressum-Daten, Firmenname, USt-IdNr., Kontakt.
6. Deploy-Ziel (Vercel Standard oder Cloudflare), Reply-Portal ja/nein (Standard ja).
