// Generates dotted land points (Europe, Africa, Middle East window) for the globe.
import { readFileSync, writeFileSync } from "node:fs";
import { feature } from "topojson-client";
import { geoContains } from "d3-geo";

const topo = JSON.parse(readFileSync("node_modules/world-atlas/land-50m.json", "utf8"));
const land = feature(topo, topo.objects.land);
const step = 0.9;
const pts = [];
for (let lat = -5; lat <= 80; lat += step) {
  const c = Math.cos((lat * Math.PI) / 180);
  const lonStep = step / Math.max(c, 0.2);
  for (let lon = -60; lon <= 100; lon += lonStep) {
    if (geoContains(land, [lon, lat])) pts.push([+lat.toFixed(2), +lon.toFixed(2)]);
  }
}
writeFileSync("lib/land-dots.json", JSON.stringify(pts));
console.log(pts.length, "dots");
