# Product sources

Catalogue sourced 2–3 Nov 2026: **250 products** (11 hand-written in `src/data/products.ts`, 239 generated into
`src/data/products.generated.ts`). Specs and photos come from the manufacturers' own product pages
(cube.eu, haibike.com, winora.com, ghost-bikes.com). The owner confirmed in chat that the manufacturers' official
product images may be used, and that German dealer prices may be used where a manufacturer does not publish prices.

## Prices
- **Cube** does not publish prices. Prices are German dealer prices (bikes.de, rabe-bike.de) for the 2027 model year where
  listed, otherwise 2026; the year is shown next to each price below. Confirm with your supplier before accepting orders.
- **Haibike, Winora, Ghost** prices are from the brands' own German shops.

## Images
`public/images/products/<slug>/main.webp` is the manufacturer's white-background studio shot, trimmed and fitted on a
4:3 white canvas. `gallery-N.webp` are further official shots (angles and details), cropped to 4:3.
Nothing was edited beyond crop, scale and compression.

## Left out on purpose
- Real-world range (km) and any weight or torque the manufacturer does not publish.
- Brands whose bikes are not street-legal as bicycles in Germany (750–2000 W motors): Lankeleisi, Samebike, Burchda.
- Tern (no prices published), Decathlon (site blocked access).
- Bikes with fewer than two official photos. About 19 Haibike/Winora models have exactly two.
- Cube models for which no dealer price could be found (11 models).

## Hand-written entries
| Slug | Source | Price |
|---|---|---|
| cube-kathmandu-hybrid-exc-800 | https://www.cube.eu/de/cube-kathmandu-hybrid-exc-800-slategrey-n-chrome/1112400 | €3,999, bikes.de (MY27) |
| cube-kathmandu-hybrid-45-800 | https://www.cube.eu/de/cube-kathmandu-hybrid-45-800-slategrey-n-chrome/1113700 | €4,999, bike-discount.de |
| cube-stereo-hybrid-one22-pro-800 | https://www.cube.eu/de/cube-stereo-hybrid-one22-pro-800-slabgrey-n-chrome/1101200 | €3,699, German dealer listing (MY27) |
| cube-reaction-hybrid-performance-720 | https://www.cube.eu/de/cube-reaction-hybrid-performance-720-ashgrey-n-prism/1107000 | €2,499, bikes.de / heise Preisvergleich (MY27) |
| cube-supreme-hybrid-comfort-one-600 | https://www.cube.eu/de/cube-supreme-hybrid-comfort-one-600-gunmetal-n-reflex/1114100 | €2,599, bikes.de (MY27) |
| cube-longtail-hybrid-800 | https://www.cube.eu/de/cube-longtail-hybrid-800-greybeige-n-grey/1121200 | €3,899, French retailer RRP (no German price found) |
| cube-fold-hybrid-deluxe-540 | https://www.cube.eu/de/cube-fold-hybrid-deluxe-540-metallicpetrol-n-sea/1120300 | €3,199, BIKE Magazin (MY27, available from Dec 2026) |
| cube-nuroad-hybrid-c62-race-400x | https://www.cube.eu/de/cube-nuroad-hybrid-c-62-race-400x-oldgrey-n-grey/1117300 | €3,999, Tour Magazin / bikes.de |
| haibike-trekking-7-5-yamaha | https://haibike.com/de-de/products/trekking-75-htdt1 (MY25) | €4,299, haibike.com |
| haibike-alltrail-10 | https://haibike.com/de-de/products/alltrail-10-hlet1 (MY25) | €5,499, haibike.com |
| haibike-lyke-cf-10 | https://haibike.com/de-de/products/lyke-cf-10-hmpt1 (MY25) | €6,999, haibike.com |

## Generated entries
| Slug | Source page | Price (year) |
|---|---|---|
| cube-compact-hybrid-deluxe-540 | https://www.cube.eu/de/cube-compact-hybrid-deluxe-540-lindgreen-n-reflex/1120110 | €2799 (2027) |
| cube-compact-hybrid-540 | https://www.cube.eu/de/cube-compact-hybrid-540-cotton-n-reflex/1120200 | €2499 (2027) |
| cube-nuroad-hybrid-c-62-slt-400x | https://www.cube.eu/de/cube-nuroad-hybrid-c-62-slt-400x-onyxfibre-n-blue/1117900 | €5999 (2027) |
| cube-nuroad-hybrid-c-62-slx-400x | https://www.cube.eu/de/cube-nuroad-hybrid-c-62-slx-400x-glintsand-n-black/1117600 | €4999 (2026) |
| cube-nuroad-hybrid-c-62-exc-400x | https://www.cube.eu/de/cube-nuroad-hybrid-c-62-exc-400x-tropicalteal-n-black/1117400 | €4499 (2027) |
| cube-nulane-hybrid-c-62-slx-400x-fe | https://www.cube.eu/de/cube-nulane-hybrid-c-62-slx-400x-fe-mineralblack-n-orange/1118650 | €4199 (2027) |
| cube-nulane-hybrid-c-62-slx-400x | https://www.cube.eu/de/cube-nulane-hybrid-c-62-slx-400x-mineralblack-n-orange/1118600 | €3999 (2027) |
| cube-nulane-hybrid-c-62-race-400x-fe | https://www.cube.eu/de/cube-nulane-hybrid-c-62-race-400x-fe-seagrey-n-black/1118350 | €3199 (2027) |
| cube-nulane-hybrid-c-62-race-400x | https://www.cube.eu/de/cube-nulane-hybrid-c-62-race-400x-seagrey-n-black/1118300 | €3199 (2026) |
| cube-nuroad-hybrid-c-62-slx-400x-fe | https://www.cube.eu/de/cube-nuroad-hybrid-c-62-slx-400x-fe-glintsand-n-black/1117650 | €5199 (2027) |
| cube-nuroad-hybrid-c-62-exc-400x-fe | https://www.cube.eu/de/cube-nuroad-hybrid-c-62-exc-400x-fe-tropicalteal-n-black/1117450 | €4699 (2027) |
| cube-nuroad-hybrid-c-62-race-400x-fe | https://www.cube.eu/de/cube-nuroad-hybrid-c-62-race-400x-fe-oldgrey-n-grey/1117350 | €4199 (2027) |
| cube-ams-hybrid-177-c-62-super-tm-600x | https://www.cube.eu/de/cube-ams-hybrid-177-c-62-super-tm-600x-artichoke-n-lime/1106900 | €9999 (2027) |
| cube-stereo-hybrid-one77-hpc-slt-800 | https://www.cube.eu/de/cube-stereo-hybrid-one77-hpc-slt-800-bluegalaxy-n-grey/1104900 | €8699 (2026) |
| cube-stereo-hybrid-one44-hpc-slt-800 | https://www.cube.eu/de/cube-stereo-hybrid-one44-hpc-slt-800-splinternavy-n-prizm/1103900 | €8499 (2027) |
| cube-ams-hybrid-one44-c-68x-slt-400x | https://www.cube.eu/de/cube-ams-hybrid-one44-c-68x-slt-400x-matrixblack-n-white/104300 | €7999 (2026) |
| cube-ams-hybrid-177-c-62-at-600x | https://www.cube.eu/de/cube-ams-hybrid-177-c-62-at-600x-carbon-n-white/1106800 | €7499 (2027) |
| cube-stereo-hybrid-one77-hpc-at-800 | https://www.cube.eu/de/cube-stereo-hybrid-one77-hpc-at-800-actionteam/1104810 | €7199 (2027) |
| cube-stereo-hybrid-one44-hpc-at-800 | https://www.cube.eu/de/cube-stereo-hybrid-one44-hpc-at-800-actionteam/1103810 | €6999 (2027) |
| cube-ams-hybrid-one44-c-68x-tm-400x | https://www.cube.eu/de/cube-ams-hybrid-one44-c-68x-tm-400x-reedgreen-n-matrix/104200 | €6499 (2026) |
| cube-stereo-hybrid-one77-hpc-tm-800 | https://www.cube.eu/de/cube-stereo-hybrid-one77-hpc-tm-800-reedgreen-n-gills/1104700 | €6199 (2027) |
| cube-ams-hybrid-one44-c-68x-slx-400x | https://www.cube.eu/de/cube-ams-hybrid-one44-c-68x-slx-400x-nebula-n-black/104100 | €5999 (2025) |
| cube-stereo-hybrid-one44-hpc-tm-800 | https://www.cube.eu/de/cube-stereo-hybrid-one44-hpc-tm-800-reedgreen-n-gills/1103700 | €5999 (2027) |
| cube-ams-hybrid-177-c-62-tm-600x | https://www.cube.eu/de/cube-ams-hybrid-177-c-62-tm-600x-reedgreen-n-gills/1106700 | €5799 (2027) |
| cube-stereo-hybrid-one44-hpc-slx-evo-800 | https://www.cube.eu/de/cube-stereo-hybrid-one44-hpc-slx-evo-800-slategrey-n-prizm/1103650 | €5699 (2027) |
| cube-stereo-hybrid-one44-hpc-slx-evo-800-artline | https://www.cube.eu/de/cube-stereo-hybrid-one44-hpc-slx-evo-800-artline/1103660 | €5699 (2027) |
| cube-stereo-hybrid-one44-hpc-slx-800 | https://www.cube.eu/de/cube-stereo-hybrid-one44-hpc-slx-800-jungali-n-black/1103610 | €4999 (2027) |
| cube-stereo-hybrid-one77-hpc-slx-800 | https://www.cube.eu/de/cube-stereo-hybrid-one77-hpc-slx-800-liquidred-n-black/1104610 | €4999 (2027) |
| cube-stereo-hybrid-one44-slx-800-fe | https://www.cube.eu/de/cube-stereo-hybrid-one44-slx-800-fe-oatgrey-n-grey/1102650 | €4899 (2027) |
| cube-stereo-hybrid-one44-hpc-slx-800-blackline | https://www.cube.eu/de/cube-stereo-hybrid-one44-hpc-slx-800-blackline/1103600 | €4999 (2027) |
| cube-stereo-hybrid-one44-slx-800 | https://www.cube.eu/de/cube-stereo-hybrid-one44-slx-800-oatgrey-n-grey/1102600 | €4699 (2027) |
| cube-ams-hybrid-one44-c-62-race-400x | https://www.cube.eu/de/cube-ams-hybrid-one44-c-62-race-400x-reedbeige-n-black/104050 | €4499 (2026) |
| cube-stereo-hybrid-one22-slx-800-fe | https://www.cube.eu/de/cube-stereo-hybrid-one22-slx-800-fe-cactus-n-black/1101660 | €4399 (2027) |
| cube-stereo-hybrid-one44-hpc-race-800 | https://www.cube.eu/de/cube-stereo-hybrid-one44-hpc-race-800-coal-n-green/1103300 | €4399 (2027) |
| cube-stereo-hybrid-one77-hpc-race-800 | https://www.cube.eu/de/cube-stereo-hybrid-one77-hpc-race-800-metallicpetrol-n-black/1104310 | €4399 (2027) |
| cube-stereo-hybrid-one77-hpc-slx-800-blackline | https://www.cube.eu/de/cube-stereo-hybrid-one77-hpc-slx-800-blackline/1104600 | €4999 (2027) |
| cube-stereo-hybrid-one22-slx-800 | https://www.cube.eu/de/cube-stereo-hybrid-one22-slx-800-cactus-n-black/1101610 | €4199 (2027) |
| cube-stereo-hybrid-one44-hpc-pro-800 | https://www.cube.eu/de/cube-stereo-hybrid-one44-hpc-pro-800-metallicwhite-n-blue/1103210 | €4099 (2027) |
| cube-stereo-hybrid-one44-pro-800-fe | https://www.cube.eu/de/cube-stereo-hybrid-one44-pro-800-fe-blueiris-n-purple/1102270 | €4099 (2027) |
| cube-stereo-hybrid-one22-pro-800-fe | https://www.cube.eu/de/cube-stereo-hybrid-one22-pro-800-fe-bluesapphire-n-blue/1101260 | €3899 (2027) |
| cube-stereo-hybrid-one44-pro-800 | https://www.cube.eu/de/cube-stereo-hybrid-one44-pro-800-blueiris-n-purple/1102220 | €3899 (2027) |
| cube-reaction-hybrid-slt-800 | https://www.cube.eu/de/cube-reaction-hybrid-slt-800-kolibri-n-crisscross/1107910 | €4799 (2027) |
| cube-ams-hybrid-one44-c-62-pro-400x-blackline | https://www.cube.eu/de/cube-ams-hybrid-one44-c-62-pro-400x-blackline/104020 | €4199 (2026) |
| cube-reaction-hybrid-slx-800-fe | https://www.cube.eu/de/cube-reaction-hybrid-slx-800-fe-platinum-n-reflex/1107650 | €4399 (2027) |
| cube-reaction-hybrid-slx-800-fe-easy-entry | https://www.cube.eu/de/cube-reaction-hybrid-slx-800-fe-platinum-n-reflex/1107652 | €4399 (2027) |
| cube-reaction-hybrid-slx-800-fe-artline | https://www.cube.eu/de/cube-reaction-hybrid-slx-800-fe-artline/1107670 | €4399 (2027) |
| cube-reaction-hybrid-slx-800-artline | https://www.cube.eu/de/cube-reaction-hybrid-slx-800-artline/1107620 | €4199 (2027) |
| cube-reaction-hybrid-slx-800 | https://www.cube.eu/de/cube-reaction-hybrid-slx-800-autumn-n-black/1107610 | €4199 (2027) |
| cube-reaction-hybrid-slx-800-easy-entry | https://www.cube.eu/de/cube-reaction-hybrid-slx-800-platinum-n-reflex/1107602 | €4199 (2027) |
| cube-reaction-hybrid-race-800-fe | https://www.cube.eu/de/cube-reaction-hybrid-race-800-fe-bananasplit-n-black/1107370 | €3899 (2027) |
| cube-reaction-hybrid-race-800-fe-trapez | https://www.cube.eu/de/cube-reaction-hybrid-race-800-fe-bananasplit-n-black/1107371 | €3899 (2027) |
| cube-reaction-hybrid-race-800-fe-easy-entry | https://www.cube.eu/de/cube-reaction-hybrid-race-800-fe-bananasplit-n-black/1107372 | €3899 (2027) |
| cube-reaction-hybrid-race-800 | https://www.cube.eu/de/cube-reaction-hybrid-race-800-bananasplit-n-black/1107320 | €3699 (2027) |
| cube-reaction-hybrid-race-800-trapez | https://www.cube.eu/de/cube-reaction-hybrid-race-800-bananasplit-n-black/1107321 | €3699 (2027) |
| cube-reaction-hybrid-race-800-easy-entry | https://www.cube.eu/de/cube-reaction-hybrid-race-800-bananasplit-n-black/1107322 | €3699 (2027) |
| cube-reaction-hybrid-pro-800-fe | https://www.cube.eu/de/cube-reaction-hybrid-pro-800-fe-lilacbreeze-n-prizm/1107270 | €3399 (2027) |
| cube-reaction-hybrid-pro-800-fe-trapez | https://www.cube.eu/de/cube-reaction-hybrid-pro-800-fe-lilacbreeze-n-prizm/1107271 | €3399 (2027) |
| cube-reaction-hybrid-pro-800-fe-easy-entry | https://www.cube.eu/de/cube-reaction-hybrid-pro-800-fe-lilacbreeze-n-prizm/1107272 | €3399 (2027) |
| cube-reaction-hybrid-pro-800 | https://www.cube.eu/de/cube-reaction-hybrid-pro-800-lilacbreeze-n-prizm/1107220 | €3199 (2027) |
| cube-reaction-hybrid-pro-800-trapez | https://www.cube.eu/de/cube-reaction-hybrid-pro-800-lilacbreeze-n-prizm/1107221 | €3199 (2027) |
| cube-reaction-hybrid-pro-800-easy-entry | https://www.cube.eu/de/cube-reaction-hybrid-pro-800-lilacbreeze-n-prizm/1107222 | €3199 (2027) |
| cube-reaction-hybrid-one-720-fe | https://www.cube.eu/de/cube-reaction-hybrid-one-720-fe-cactus-n-black/1107160 | €2999 (2027) |
| cube-reaction-hybrid-one-720-fe-easy-entry | https://www.cube.eu/de/cube-reaction-hybrid-one-720-fe-cactus-n-black/1107162 | €2999 (2027) |
| cube-reaction-hybrid-one-720 | https://www.cube.eu/de/cube-reaction-hybrid-one-720-cactus-n-black/1107110 | €2799 (2027) |
| cube-reaction-hybrid-one-720-easy-entry | https://www.cube.eu/de/cube-reaction-hybrid-one-720-cactus-n-black/1107112 | €2799 (2027) |
| cube-reaction-hybrid-performance-720-fe | https://www.cube.eu/de/cube-reaction-hybrid-performance-720-fe-ashgrey-n-prism/1107050 | €2699 (2027) |
| cube-reaction-hybrid-performance-720-fe-easy-entry | https://www.cube.eu/de/cube-reaction-hybrid-performance-720-fe-ashgrey-n-prism/1107052 | €2699 (2027) |
| cube-reaction-hybrid-performance-720-easy-entry | https://www.cube.eu/de/cube-reaction-hybrid-performance-720-ashgrey-n-prism/1107002 | €2499 (2027) |
| cube-trike-family-hybrid-1500 | https://www.cube.eu/de/cube-trike-family-hybrid-1500-blue-n-reflex/789537 | €7999 (2025) |
| cube-trike-flatbed-hybrid-750 | https://www.cube.eu/de/cube-trike-flatbed-hybrid-750-swampgrey-n-reflex/121210 | €5799 (2026) |
| cube-cargo-hybrid-comfort-pro-family-800 | https://www.cube.eu/de/cube-cargo-hybrid-comfort-pro-family-800-oatgrey-n-reflex/124200 | €4899 (2026) |
| cube-longtail-hybrid-deluxe-family-800 | https://www.cube.eu/de/cube-longtail-hybrid-deluxe-family-800-shadowgrey-n-grey/1121150 | €4799 (2027) |
| cube-cargo-hybrid-comfort-pro-800 | https://www.cube.eu/de/cube-cargo-hybrid-comfort-pro-800-oatgrey-n-reflex/124100 | €4499 (2026) |
| cube-longtail-hybrid-family-800 | https://www.cube.eu/de/cube-longtail-hybrid-family-800-greybeige-n-grey/1121250 | €4099 (2026) |
| cube-supreme-hybrid-deluxe-slt-600 | https://www.cube.eu/de/cube-supreme-hybrid-deluxe-slt-600-slabgrey-n-chrome/1115900 | €4299 (2027) |
| cube-supreme-hybrid-deluxe-slx-600 | https://www.cube.eu/de/cube-supreme-hybrid-deluxe-slx-600-teak-n-chrome/1115600 | €3799 (2026) |
| cube-supreme-hybrid-deluxe-pro-600 | https://www.cube.eu/de/cube-supreme-hybrid-deluxe-pro-600-nebula-n-blue/1115210 | €3299 (2027) |
| cube-supreme-hybrid-comfort-pro-600 | https://www.cube.eu/de/cube-supreme-hybrid-comfort-pro-600-burgundy-n-claret/1114210 | €3199 (2026) |
| cube-supreme-rt-hybrid-deluxe-ex-600 | https://www.cube.eu/de/cube-supreme-rt-hybrid-deluxe-ex-600-quicksilver-n-grey/1115150 | €3199 (2027) |
| cube-editor-hybrid-slt-400x-fe | https://www.cube.eu/de/cube-editor-hybrid-slt-400x-fe-glacier-n-prizm/1122900 | €3199 (2026) |
| cube-editor-hybrid-slt-400x-fe-trapez | https://www.cube.eu/de/cube-editor-hybrid-slt-400x-fe-glacier-n-prizm/1122901 | €3199 (2026) |
| cube-supreme-hybrid-deluxe-one-600 | https://www.cube.eu/de/cube-supreme-hybrid-deluxe-one-600-aloegreen-n-reflex/1115110 | €2999 (2027) |
| cube-supreme-rt-hybrid-comfort-ex-600 | https://www.cube.eu/de/cube-supreme-rt-hybrid-comfort-ex-600-metallicwhite-n-reflex/1114150 | €2749 (2027) |
| cube-aruba-hybrid-600 | https://www.cube.eu/de/cube-aruba-hybrid-600-cottoncandy-n-creme/1117110 | €2699 (2026) |
| cube-editor-hybrid-slx-400x-fe | https://www.cube.eu/de/cube-editor-hybrid-slx-400x-fe-glitterteal-n-black/1122600 | €2699 (2027) |
| cube-editor-hybrid-slx-400x-fe-trapez | https://www.cube.eu/de/cube-editor-hybrid-slx-400x-fe-glitterteal-n-black/1122601 | €2699 (2027) |
| cube-reaction-hybrid-slx-800-fe-artline-easy-entry | https://www.cube.eu/de/cube-reaction-hybrid-slx-800-fe-artline/1107672 | €4399 (2027) |
| cube-editor-hybrid-pro-360-fe | https://www.cube.eu/de/cube-editor-hybrid-pro-360-fe-black-n-irongrey/1122310 | €1999 (2027) |
| cube-reaction-hybrid-slx-800-artline-easy-entry | https://www.cube.eu/de/cube-reaction-hybrid-slx-800-artline/1107622 | €4199 (2027) |
| cube-editor-hybrid-pro-360-fe-trapez | https://www.cube.eu/de/cube-editor-hybrid-pro-360-fe-black-n-irongrey/1122311 | €1999 (2027) |
| cube-kathmandu-hybrid-one11-hpc-slt-800 | https://www.cube.eu/de/cube-kathmandu-hybrid-one11-hpc-slt-800-carbon-n-silverdust/1113600 | €5999 (2026) |
| cube-kathmandu-hybrid-one11-hpc-slt-800-easy-entry | https://www.cube.eu/de/cube-kathmandu-hybrid-one11-hpc-slt-800-carbon-n-silverdust/1113602 | €5999 (2026) |
| cube-kathmandu-hybrid-c-62-slt-400x | https://www.cube.eu/de/cube-kathmandu-hybrid-c-62-slt-400x-ashgrey-n-prizm/1113300 | €4999 (2027) |
| cube-kathmandu-hybrid-c-62-slt-400x-easy-entry | https://www.cube.eu/de/cube-kathmandu-hybrid-c-62-slt-400x-ashgrey-n-prizm/1113302 | €4999 (2027) |
| cube-kathmandu-hybrid-one11-hpc-slx-800 | https://www.cube.eu/de/cube-kathmandu-hybrid-one11-hpc-slx-800-metallicwhite-n-prizm/1113560 | €4999 (2027) |
| cube-kathmandu-hybrid-one11-hpc-slx-800-easy-entry | https://www.cube.eu/de/cube-kathmandu-hybrid-one11-hpc-slx-800-metallicwhite-n-prizm/1113562 | €4999 (2027) |
| cube-kathmandu-hybrid-slt-800 | https://www.cube.eu/de/cube-kathmandu-hybrid-slt-800-mysticgraphite-n-reflex/1112900 | €4999 (2027) |
| cube-kathmandu-hybrid-slt-800-trapez | https://www.cube.eu/de/cube-kathmandu-hybrid-slt-800-mysticgraphite-n-reflex/1112901 | €4999 (2027) |
| cube-kathmandu-hybrid-slt-800-easy-entry | https://www.cube.eu/de/cube-kathmandu-hybrid-slt-800-mysticgraphite-n-reflex/1112902 | €4999 (2027) |
| cube-editor-hybrid-one-360-fe-trapez | https://www.cube.eu/de/cube-editor-hybrid-one-360-fe-black-n-irongrey/1122101 | €1849 (2027) |
| cube-kathmandu-hybrid-deluxe-exc-800-trapez | https://www.cube.eu/de/cube-kathmandu-hybrid-deluxe-exc-800-glintsand-n-black/1112511 | €4499 (2027) |
| cube-editor-hybrid-one-360-fe | https://www.cube.eu/de/cube-editor-hybrid-one-360-fe-black-n-irongrey/1122100 | €1849 (2027) |
| cube-kathmandu-hybrid-slx-800 | https://www.cube.eu/de/cube-kathmandu-hybrid-slx-800-flashstone-n-chrome/1112600 | €4499 (2027) |
| cube-kathmandu-hybrid-slx-800-trapez | https://www.cube.eu/de/cube-kathmandu-hybrid-slx-800-flashstone-n-chrome/1112601 | €4499 (2027) |
| cube-kathmandu-hybrid-slx-800-easy-entry | https://www.cube.eu/de/cube-kathmandu-hybrid-slx-800-flashstone-n-chrome/1112602 | €4499 (2027) |
| cube-nuride-hybrid-one11-hpc-slx-800 | https://www.cube.eu/de/cube-nuride-hybrid-one11-hpc-slx-800-goldenbrown-n-black/1110600 | €4499 (2027) |
| cube-nuride-hybrid-one11-hpc-slx-800-easy-entry | https://www.cube.eu/de/cube-nuride-hybrid-one11-hpc-slx-800-goldenbrown-n-black/1110602 | €4499 (2027) |
| cube-kathmandu-hybrid-one11-hpc-pro-800 | https://www.cube.eu/de/cube-kathmandu-hybrid-one11-hpc-pro-800-hazeblue-n-blue/1113510 | €4199 (2026) |
| cube-kathmandu-hybrid-one11-hpc-pro-800-easy-entry | https://www.cube.eu/de/cube-kathmandu-hybrid-one11-hpc-pro-800-hazeblue-n-blue/1113512 | €4199 (2026) |
| cube-kathmandu-hybrid-c-62-slx-400x | https://www.cube.eu/de/cube-kathmandu-hybrid-c-62-slx-400x-liquidred-n-red/1113200 | €3999 (2027) |
| cube-kathmandu-hybrid-c-62-slx-400x-easy-entry | https://www.cube.eu/de/cube-kathmandu-hybrid-c-62-slx-400x-liquidred-n-red/1113202 | €3999 (2027) |
| cube-kathmandu-hybrid-exc-800-trapez | https://www.cube.eu/de/cube-kathmandu-hybrid-exc-800-slategrey-n-chrome/1112401 | €3999 (2027) |
| cube-kathmandu-hybrid-exc-800-easy-entry | https://www.cube.eu/de/cube-kathmandu-hybrid-exc-800-slategrey-n-chrome/1112402 | €3999 (2027) |
| cube-kathmandu-hybrid-deluxe-pro-800 | https://www.cube.eu/de/cube-kathmandu-hybrid-deluxe-pro-800-blackforest-n-chrome/1112300 | €3799 (2027) |
| cube-kathmandu-hybrid-deluxe-pro-800-trapez | https://www.cube.eu/de/cube-kathmandu-hybrid-deluxe-pro-800-blackforest-n-chrome/1112301 | €3799 (2027) |
| cube-kathmandu-hybrid-deluxe-pro-800-easy-entry | https://www.cube.eu/de/cube-kathmandu-hybrid-deluxe-pro-800-blackforest-n-chrome/1112302 | €3799 (2027) |
| cube-nuride-hybrid-exc-800 | https://www.cube.eu/de/cube-nuride-hybrid-exc-800-coal-n-chrome/1110400 | €3799 (2027) |
| cube-nuride-hybrid-exc-800-trapez | https://www.cube.eu/de/cube-nuride-hybrid-exc-800-coal-n-chrome/1110401 | €3799 (2027) |
| cube-nuride-hybrid-exc-800-easy-entry | https://www.cube.eu/de/cube-nuride-hybrid-exc-800-coal-n-chrome/1110402 | €3799 (2027) |
| cube-kathmandu-hybrid-pro-800 | https://www.cube.eu/de/cube-kathmandu-hybrid-pro-800-coal-n-black/1112200 | €3599 (2027) |
| cube-kathmandu-hybrid-pro-800-trapez | https://www.cube.eu/de/cube-kathmandu-hybrid-pro-800-coal-n-black/1112201 | €3599 (2027) |
| cube-kathmandu-hybrid-pro-800-easy-entry | https://www.cube.eu/de/cube-kathmandu-hybrid-pro-800-coal-n-black/1112202 | €3599 (2027) |
| cube-kathmandu-hybrid-c-62-pro-400x | https://www.cube.eu/de/cube-kathmandu-hybrid-c-62-pro-400x-liquidsteel-n-prizm/1113100 | €3499 (2027) |
| cube-kathmandu-hybrid-c-62-pro-400x-easy-entry | https://www.cube.eu/de/cube-kathmandu-hybrid-c-62-pro-400x-liquidsteel-n-prizm/1113102 | €3499 (2027) |
| cube-touring-hybrid-deluxe-slx-800 | https://www.cube.eu/de/cube-touring-hybrid-deluxe-slx-800-greengranit-n-green/1111610 | €3399 (2027) |
| cube-touring-hybrid-deluxe-slx-800-trapez | https://www.cube.eu/de/cube-touring-hybrid-deluxe-slx-800-greengranit-n-green/1111611 | €3399 (2027) |
| cube-touring-hybrid-deluxe-slx-800-easy-entry | https://www.cube.eu/de/cube-touring-hybrid-deluxe-slx-800-greengranit-n-green/1111612 | €3399 (2027) |
| cube-kathmandu-hybrid-one-800 | https://www.cube.eu/de/cube-kathmandu-hybrid-one-800-cedar-n-chrome/1112100 | €3199 (2027) |
| cube-kathmandu-hybrid-one-800-trapez | https://www.cube.eu/de/cube-kathmandu-hybrid-one-800-cedar-n-chrome/1112101 | €3199 (2027) |
| cube-kathmandu-hybrid-one-800-easy-entry | https://www.cube.eu/de/cube-kathmandu-hybrid-one-800-cedar-n-chrome/1112102 | €3199 (2027) |
| cube-nuride-hybrid-pro-800 | https://www.cube.eu/de/cube-nuride-hybrid-pro-800-cappuccino-n-black/1110210 | €3199 (2027) |
| cube-nuride-hybrid-pro-800-trapez | https://www.cube.eu/de/cube-nuride-hybrid-pro-800-cappuccino-n-black/1110211 | €3199 (2027) |
| cube-nuride-hybrid-pro-800-easy-entry | https://www.cube.eu/de/cube-nuride-hybrid-pro-800-cappuccino-n-black/1110212 | €3199 (2027) |
| cube-touring-hybrid-pro-800 | https://www.cube.eu/de/cube-touring-hybrid-pro-800-electricblue-n-prizm/1111210 | €2999 (2027) |
| cube-touring-hybrid-pro-800-trapez | https://www.cube.eu/de/cube-touring-hybrid-pro-800-electricblue-n-prizm/1111211 | €2999 (2027) |
| cube-touring-hybrid-pro-800-easy-entry | https://www.cube.eu/de/cube-touring-hybrid-pro-800-electricblue-n-prizm/1111212 | €2999 (2027) |
| cube-nuride-hybrid-performance-720 | https://www.cube.eu/de/cube-nuride-hybrid-performance-720-metallicwhite-n-grey/1110010 | €2699 (2027) |
| cube-nuride-hybrid-performance-720-trapez | https://www.cube.eu/de/cube-nuride-hybrid-performance-720-metallicwhite-n-grey/1110011 | €2699 (2027) |
| cube-nuride-hybrid-performance-720-easy-entry | https://www.cube.eu/de/cube-nuride-hybrid-performance-720-metallicwhite-n-grey/1110012 | €2699 (2027) |
| cube-touring-hybrid-one-600 | https://www.cube.eu/de/cube-touring-hybrid-one-600-grey-n-coolgrey/1111100 | €2599 (2027) |
| cube-touring-hybrid-one-600-trapez | https://www.cube.eu/de/cube-touring-hybrid-one-600-grey-n-coolgrey/1111101 | €2599 (2027) |
| cube-touring-hybrid-one-600-easy-entry | https://www.cube.eu/de/cube-touring-hybrid-one-600-grey-n-coolgrey/1111102 | €2599 (2027) |
| cube-kathmandu-hybrid-deluxe-exc-800 | https://www.cube.eu/de/cube-kathmandu-hybrid-deluxe-exc-800-glintsand-n-black/1112510 | €4499 (2027) |
| cube-kathmandu-hybrid-deluxe-exc-800-easy-entry | https://www.cube.eu/de/cube-kathmandu-hybrid-deluxe-exc-800-glintsand-n-black/1112512 | €4499 (2027) |
| haibike-alltrack-10-hkiu1 | https://haibike.com/de-de/products/alltrack-10-hkiu1 | €4199 (2025) |
| haibike-allmtn-4-hmcu1 | https://haibike.com/de-de/products/allmtn-4-hmcu1 | €4999 (2025) |
| haibike-alltrail-10-hleu1 | https://haibike.com/de-de/products/alltrail-10-hleu1 | €5499 (2025) |
| haibike-alltrail-8-hldu1 | https://haibike.com/de-de/products/alltrail-8-hldu1 | €4999 (2026) |
| haibike-adventr-6-halu1 | https://haibike.com/de-de/products/adventr-6-halu1 | €4999 (2026) |
| haibike-adventr-4-haku1 | https://haibike.com/de-de/products/adventr-4-haku1 | €4499 (2026) |
| haibike-trekking-4-htnu1 | https://haibike.com/de-de/products/trekking-4-htnu1 | €3499 (2026) |
| haibike-trekking-75-htou1 | https://haibike.com/de-de/products/trekking-75-htou1 | €3799 (2026) |
| haibike-trekking-65-htpu2 | https://haibike.com/de-de/products/trekking-65-htpu2 | €3999 (2026) |
| haibike-allmtn-cf-9-hmlu1 | https://haibike.com/de-de/products/allmtn-cf-9-hmlu1 | €7199 (2026) |
| haibike-allmtn-6-hmku1 | https://haibike.com/de-de/products/allmtn-6-hmku1 | €5499 (2026) |
| haibike-hybe-cf-11-hmtu1 | https://haibike.com/de-de/products/hybe-cf-11-hmtu1 | €11000 (2026) |
| haibike-adventr-85-haiu1 | https://haibike.com/de-de/products/adventr-85-haiu1 | €5399 (2026) |
| haibike-trekking-3-htbu1 | https://haibike.com/de-de/products/trekking-3-htbu1 | €2999 (2026) |
| haibike-alltrack-10-hkit1 | https://haibike.com/de-de/products/alltrack-10-hkit1 | €4199 (2025) |
| haibike-alltrack-65-hkjt1 | https://haibike.com/de-de/products/alltrack-65-hkjt1 | €3599 (2025) |
| haibike-hybe-cf-11-hmtt1 | https://haibike.com/de-de/products/hybe-cf-11-hmtt1 | €10000 (2025) |
| haibike-hybe-cf-9-hmst1 | https://haibike.com/de-de/products/hybe-cf-9-hmst1 | €7499 (2025) |
| haibike-lyke-cf-se-hmrt1 | https://haibike.com/de-de/products/lyke-cf-se-hmrt1 | €13000 (2025) |
| haibike-lyke-cf-11-hmqt1 | https://haibike.com/de-de/products/lyke-cf-11-hmqt1 | €8000 (2025) |
| haibike-allmtn-cf-9-hmlt1 | https://haibike.com/de-de/products/allmtn-cf-9-hmlt1 | €6999 (2025) |
| haibike-allmtn-6-hmkt1 | https://haibike.com/de-de/products/allmtn-6-hmkt1 | €5999 (2025) |
| haibike-allmtn-4-hmct1 | https://haibike.com/de-de/products/allmtn-4-hmct1 | €5499 (2025) |
| haibike-adventr-se-hact1 | https://haibike.com/de-de/products/adventr-se-hact1 | €6499 (2025) |
| haibike-adventr-11-abs-habt1 | https://haibike.com/de-de/products/adventr-11-abs-habt1 | €6499 (2025) |
| haibike-adventr-10-hajt1 | https://haibike.com/de-de/products/adventr-10-hajt1 | €5699 (2025) |
| haibike-adventr-85-hait1 | https://haibike.com/de-de/products/adventr-85-hait1 | €5199 (2025) |
| haibike-trekking-65-htpt1 | https://haibike.com/de-de/products/trekking-65-htpt1 | €3999 (2025) |
| haibike-trekking-9-abs-htjt1 | https://haibike.com/de-de/products/trekking-9-abs-htjt1 | €4999 (2025) |
| haibike-trekking-7-htlt3 | https://haibike.com/de-de/products/trekking-7-htlt3 | €4499 (2025) |
| haibike-trekking-5-htmt1 | https://haibike.com/de-de/products/trekking-5-htmt1 | €3699 (2025) |
| haibike-trekking-4-htct1 | https://haibike.com/de-de/products/trekking-4-htct1 | €3399 (2025) |
| haibike-alltrail-5-hlbt1 | https://haibike.com/de-de/products/alltrail-5-hlbt1 | €4599 (2025) |
| haibike-alltrail-3-hlht1 | https://haibike.com/de-de/products/alltrail-3-hlht1 | €4299 (2025) |
| haibike-alltrail-105-abs-hllt1 | https://haibike.com/de-de/products/alltrail-105-abs-hllt1 | €6299 (2025) |
| haibike-alltrail-8-hldt1 | https://haibike.com/de-de/products/alltrail-8-hldt1 | €4999 (2025) |
| haibike-hybe-105-hmur1 | https://haibike.com/de-de/products/hybe-105-hmur1 | €7999 (2025) |
| haibike-adventr-8-hadr1 | https://haibike.com/de-de/products/adventr-8-hadr1 | €4499 (2025) |
| haibike-adventr-9-haar1 | https://haibike.com/de-de/products/adventr-9-haar1 | €4999 (2023) |
| haibike-allmtn-3-hmbr1 | https://haibike.com/de-de/products/allmtn-3-hmbr1 | €5199 (2025) |
| haibike-allmnt-7-hmdr1 | https://haibike.com/de-de/products/allmnt-7-hmdr1 | €5999 (2025) |
| haibike-allmtn-2-hmar1 | https://haibike.com/de-de/products/allmtn-2-hmar1 | €4999 (2025) |
| haibike-trekking-3-htbp1 | https://haibike.com/de-de/products/trekking-3-htbp1 | €2999 (2025) |
| haibike-nduro-7-hnbr1 | https://haibike.com/de-de/products/nduro-7-hnbr1 | €6499 (2025) |
| haibike-nduro-6-hnar1 | https://haibike.com/de-de/products/nduro-6-hnar1 | €5999 (2025) |
| winora-yucatan-x12-wyep1 | https://winora.com/de-de/products/yucatan-x12-wyep1 | €3999 (2025) |
| winora-tria-x11-wtdu1 | https://winora.com/de-de/products/tria-x11-wtdu1 | €3299 (2026) |
| winora-tria-x9-wtcu1 | https://winora.com/de-de/products/tria-x9-wtcu1 | €2999 (2026) |
| winora-tria-r8-wthu1 | https://winora.com/de-de/products/tria-r8-wthu1 | €3199 (2026) |
| winora-tria-n5-wtfu1 | https://winora.com/de-de/products/tria-n5-wtfu1 | €3399 (2026) |
| winora-iride-pure-x10-wpar2 | https://winora.com/de-de/products/iride-pure-x10-wpar2 | €3399 (2024) |
| winora-iride-pure-r5f-wpbr2 | https://winora.com/de-de/products/iride-pure-r5f-wpbr2 | €3999 (2024) |
| winora-tria-x7-wtbr1 | https://winora.com/de-de/products/tria-x7-wtbr1 | €2499 |
| winora-tria-n8-e-wter1 | https://winora.com/de-de/products/tria-n8-e-wter1 | €2999 (2024) |
| winora-tria-n8f-e-wter3 | https://winora.com/de-de/products/tria-n8f-e-wter3 | €2999 |
| winora-tria-n8-wtfr2 | https://winora.com/de-de/products/tria-n8-wtfr2 | €3199 (2024) |
| winora-iride-pure-x10-wpau1 | https://winora.com/de-de/products/iride-pure-x10-wpau1 | €3499 (2026) |
| winora-iride-pure-r5f-wpbu1 | https://winora.com/de-de/products/iride-pure-r5f-wpbu1 | €3999 |
| winora-yucatan-x12-pro-wyft1 | https://winora.com/de-de/products/yucatan-x12-pro-wyft1 | €4499 (2025) |
| winora-yucatan-x8-wycr2 | https://winora.com/de-de/products/yucatan-x8-wycr2 | €3199 (2024) |
| winora-sinus-r5-wsgp1 | https://winora.com/de-de/products/sinus-r5-wsgp1 | €3999 |
| winora-sinus-r5f-wshp1 | https://winora.com/de-de/products/sinus-r5f-wshp1 | €3999 |
| winora-yucatan-x10-wygt1 | https://winora.com/de-de/products/yucatan-x10-wygt1 | €3499 (2025) |
| winora-yakun-r5-pro-wiat1 | https://winora.com/de-de/products/yakun-r5-pro-wiat1 | €4799 (2025) |
| winora-yakun-x12-wibt1 | https://winora.com/de-de/products/yakun-x12-wibt1 | €4499 (2025) |
| winora-yakun-x10-wigt1 | https://winora.com/de-de/products/yakun-x10-wigt1 | €3999 (2025) |
| winora-yakun-x10e-widt1 | https://winora.com/de-de/products/yakun-x10e-widt1 | €3699 (2025) |
| winora-yakun-r5-wiht1 | https://winora.com/de-de/products/yakun-r5-wiht1 | €4499 (2025) |
| winora-yakun-r5-pro-abs-wiit1 | https://winora.com/de-de/products/yakun-r5-pro-abs-wiit1 | €5299 (2025) |
| winora-sinus-fs-x12-waft1 | https://winora.com/de-de/products/sinus-fs-x12-waft1 | €5699 (2025) |
| winora-sinus-fs-r5f-pro-wagt1 | https://winora.com/de-de/products/sinus-fs-r5f-pro-wagt1 | €6299 (2025) |
| winora-sinus-r8e-wsgp4 | https://winora.com/de-de/products/sinus-r8e-wsgp4 | €3699 (2023) |
| winora-sinus-r8ef-wshp4 | https://winora.com/de-de/products/sinus-r8ef-wshp4 | €3699 (2023) |
| ghost-e-asx-essential-eq-low-gbet2 | https://ghost-bikes.com/products/e-asx-essential-eq-low-gbet2 | €4999 (2026) |
| ghost-e-asx-universal-gbbu2 | https://ghost-bikes.com/products/e-asx-universal-gbbu2 | €4999 (2026) |
| ghost-e-asx-abs-gbdu1 | https://ghost-bikes.com/products/e-asx-abs-gbdu1 | €6499 (2026) |
| ghost-e-asx-advanced-gbau1 | https://ghost-bikes.com/products/e-asx-advanced-gbau1 | €5999 (2026) |
| ghost-e-asx-universal-gbbt1 | https://ghost-bikes.com/products/e-asx-universal-gbbt1 | €4999 (2025) |
| ghost-e-riot-full-party-gebu1 | https://ghost-bikes.com/products/e-riot-full-party-gebu1 | €9500 (2026) |
| ghost-e-riot-ltd-gecu1 | https://ghost-bikes.com/products/e-riot-ltd-gecu1 | €11000 (2026) |
| ghost-e-riot-pro-geau1 | https://ghost-bikes.com/products/e-riot-pro-geau1 | €8000 (2026) |
| ghost-path-riot-cf-full-party-gfau1 | https://ghost-bikes.com/products/path-riot-cf-full-party-gfau1 | €8500 (2026) |
| ghost-e-riot-advanced-gedu2 | https://ghost-bikes.com/products/e-riot-advanced-gedu2 | €6499 (2026) |
| ghost-path-riot-advanced-gfat1 | https://ghost-bikes.com/products/path-riot-advanced-gfat1 | €6999 (2025) |
| ghost-e-asx-universal-eq-gbft1 | https://ghost-bikes.com/products/e-asx-universal-eq-gbft1 | €5499 (2025) |
| ghost-e-asx-abs-eq-gbgt1 | https://ghost-bikes.com/products/e-asx-abs-eq-gbgt1 | €6499 (2025) |
| ghost-e-teru-pro-eq-abs-gtfu1 | https://ghost-bikes.com/products/e-teru-pro-eq-abs-gtfu1 | €4999 (2026) |
| ghost-e-teru-pro-275-gtbu1 | https://ghost-bikes.com/products/e-teru-pro-275-gtbu1 | €4499 (2026) |
| ghost-e-teru-advanced-eq-gtiu1 | https://ghost-bikes.com/products/e-teru-advanced-eq-gtiu1 | €3999 |
| ghost-e-teru-gtau1 | https://ghost-bikes.com/products/e-teru-gtau1 | €2999 (2026) |
| ghost-e-teru-universal-eq-gtgu1 | https://ghost-bikes.com/products/e-teru-universal-eq-gtgu1 | €3499 (2026) |
| ghost-e-teru-eq-gtdu2 | https://ghost-bikes.com/products/e-teru-eq-gtdu2 | €2999 (2026) |
| ghost-e-teru-advanced-gtet1 | https://ghost-bikes.com/products/e-teru-advanced-gtet1 | €3999 (2025) |
| ghost-e-teru-pro-29-gtbu1 | https://ghost-bikes.com/products/e-teru-pro-29-gtbu1 | €4499 |
| ghost-e-teru-universal-29-gtct1 | https://ghost-bikes.com/products/e-teru-universal-29-gtct1 | €3499 (2025) |

## Added products (Zündapp, Stromer, Canyon)

Taken directly from the manufacturers' own German shops and product pages (zuendapp.com Shopify catalogue, stromerbike.com, canyon.com). Prices are the manufacturer's list prices at the time of sourcing; photos are the manufacturers' own studio shots.

| Slug | Source | Price |
|---|---|---|
| zuendapp-x500-trekkingrad-28-zoll | https://www.zuendapp.com/products/x500-nb | €3399 |
| zuendapp-z802-herren-trekkingrad-28-zoll | https://www.zuendapp.com/products/zundapp-z802-herren-e-bike-trekkingrad-28-zoll | €649 |
| zuendapp-x20-faltrad-active-line | https://www.zuendapp.com/products/x20-1y | €2290 |
| zuendapp-green-2-7-damen-28-zoll | https://www.zuendapp.com/products/green-27-ge | €999 |
| zuendapp-x400-trekkingrad-28-zoll | https://www.zuendapp.com/products/x400-e-trekkingrad | €3399 |
| zuendapp-x900-mountainbike-hardtail | https://www.zuendapp.com/products/x900-e-mountainbike-hardtail | €1899 |
| zuendapp-x100-klapprad-bosch-active-line | https://www.zuendapp.com/products/x100-e-klapprad | €2299 |
| zuendapp-z502-citybike-damen-28 | https://www.zuendapp.com/products/z502-e-citybike-damen | €999 |
| zuendapp-longtail-m400-lastenrad-24-zoll | https://www.zuendapp.com/products/longtail-m400 | €2999 |
| zuendapp-x800-trekkingrad-damen | https://www.zuendapp.com/products/x800-e-trekkingrad-damen | €1899 |
| zuendapp-z807-trekkingrad | https://www.zuendapp.com/products/z807-e-trekkingrad | €899 |
| zuendapp-green-7-7-damen-trekkingrad-28-zoll | https://www.zuendapp.com/products/green-77-e-trekkingrad-damen | €999 |
| zuendapp-z510-damen-hollandrad-28-zoll | https://www.zuendapp.com/products/z510-e-hollandrad-damen | €1049 |
| zuendapp-z901-hollandrad-damen | https://www.zuendapp.com/products/z901-e-hollandrad-damen | €1699 |
| zuendapp-green-7-7-trekkingrad-herren | https://www.zuendapp.com/products/green-77-e-trekkingrad-herren | €999 |
| zuendapp-z503-citybike-damen-28 | https://www.zuendapp.com/products/z503-e-citybike-damen-28 | €1099 |
| zuendapp-z101-klapprad-20-zoll | https://www.zuendapp.com/products/z101 | €999 |
| zuendapp-x600-citybike-damen | https://www.zuendapp.com/products/x600-e-citybike-damen | €2599 |
| zuendapp-x700-mountainbike-27-5-zoll | https://www.zuendapp.com/products/x700-e-mountainbike | €1399 |
| zuendapp-z898-mountainbike-27-5-zoll | https://www.zuendapp.com/products/z898-e-mountainbike | €1299 |
| zuendapp-x1000-mountainbike-fully | https://www.zuendapp.com/products/x1000-e-mountainbike-fully | €2599 |
| zuendapp-x850-trekkingrad-herren | https://www.zuendapp.com/products/x850-e-trekkingrad-herren | €2299 |
| zuendapp-x850-trekkingrad-damen | https://www.zuendapp.com/products/x850-e-trekkingrad-damen | €2199 |
| zuendapp-z802-damen-trekkingrad-28-zoll | https://www.zuendapp.com/products/z802-damen | €999 |
| zuendapp-z503-citybike-damen-26 | https://www.zuendapp.com/products/z503-e-citybike-damen-26 | €1099 |
| zuendapp-zxt20-klapprad-20-zoll | https://www.zuendapp.com/products/zxt20 | €1399 |
| zuendapp-z808-mountainbike-27-5 | https://www.zuendapp.com/products/z808-e-mountainbike-275 | €1499 |
| zuendapp-z808-mountainbike-29 | https://www.zuendapp.com/products/z808-e-mountainbike-29 | €1499 |
| zuendapp-z810-trekkingrad-herren | https://www.zuendapp.com/products/z810-e-trekkingrad-herren | €1449 |
| zuendapp-z810-trekkingrad-damen | https://www.zuendapp.com/products/z810-e-trekkingrad-damen | €1449 |
| stromer-st1 | https://www.stromerbike.com/de/bikes/st1 | €5565 |
| stromer-st2 | https://www.stromerbike.com/de/bikes/st2 | €6890 |
| stromer-st3 | https://www.stromerbike.com/de/bikes/st3 | €8882 |
| stromer-st5 | https://www.stromerbike.com/de/bikes/st5 | €10990 |
| stromer-st7 | https://www.stromerbike.com/de/bikes/st7 | €11490 |
| canyon-endurace-onfly-cf-6 | https://www.canyon.com/en-de/electric-bikes/electric-road-bikes/endurace-on-fly/endurace-onfly-cf-6/4043.html | €3999 |
| canyon-endurace-onfly-cf-7 | https://www.canyon.com/en-de/electric-bikes/electric-road-bikes/endurace-on-fly/endurace-onfly-cf-7/4044.html | €5499 |
| canyon-endurace-onfly-cf-8 | https://www.canyon.com/en-de/electric-bikes/electric-road-bikes/endurace-on-fly/endurace-onfly-cf-8/4045.html | €6999 |
| canyon-endurace-onfly-sub-10 | https://www.canyon.com/en-de/electric-bikes/electric-road-bikes/endurace-on-fly/endurace-onfly-sub-10/4046.html | €9999 |
