// Builds lib/globe-data.json: global dotted land (Fibonacci sphere) and country outlines.
import { readFileSync, writeFileSync } from "node:fs";
import { feature, mesh } from "topojson-client";
import { geoContains } from "d3-geo";

const land = feature(JSON.parse(readFileSync("node_modules/world-atlas/land-50m.json", "utf8")), "land");
const landTopo = JSON.parse(readFileSync("node_modules/world-atlas/land-50m.json", "utf8"));
const landFeat = feature(landTopo, landTopo.objects.land);
const N = 22000;
const dots = [];
const golden = Math.PI * (3 - Math.sqrt(5));
for (let i = 0; i < N; i++) {
  const y = 1 - (2 * (i + 0.5)) / N;
  const lat = (Math.asin(y) * 180) / Math.PI;
  let lon = ((i * golden * 180) / Math.PI) % 360;
  if (lon > 180) lon -= 360;
  if (geoContains(landFeat, [lon, lat])) dots.push([+lat.toFixed(2), +lon.toFixed(2)]);
}
const ct = JSON.parse(readFileSync("node_modules/world-atlas/countries-110m.json", "utf8"));
const lines = mesh(ct, ct.objects.countries).coordinates.map((l) => l.map(([lo, la]) => [+la.toFixed(1), +lo.toFixed(1)]));
writeFileSync("lib/globe-data.json", JSON.stringify({ dots, lines }));
console.log(dots.length, "dots", lines.length, "lines");
