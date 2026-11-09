// Places on the globe. To add one, copy a block and fill it in.
//   name     city or place name shown on the pin
//   country  country name
//   flag     flag emoji (used when there is no photo)
//   lat, lon coordinates (decimal degrees)
//   photo    optional, a file in public/places/, for example "/places/prizren.jpg"
//   period   optional, for example "2025 to now" or "Summer 2024"
//   title    optional, for example "Product designer at ..." for experience
//   text     optional, one or two plain sentences
//   dx, dy, rot  optional, where the photo card sits on the small globe
//   kind     "visited" or "experience"
export const NOW_IN = "Tirana";

export const PLACES = [
  { name: "Mallorca", dx: -86, dy: -34, rot: -4, country: "Spain", flag: "\u{1F1EA}\u{1F1F8}", lat: 39.57, lon: 2.65, kind: "visited" },
  { name: "Bratislava", dx: -66, dy: -70, rot: 3, country: "Slovakia", flag: "\u{1F1F8}\u{1F1F0}", lat: 48.15, lon: 17.11, kind: "visited" },
  { name: "Budapest", dx: 48, dy: -72, rot: -3, country: "Hungary", flag: "\u{1F1ED}\u{1F1FA}", lat: 47.5, lon: 19.04, kind: "visited" },
  { name: "Tirana", dx: -62, dy: 52, rot: 4, country: "Albania", flag: "\u{1F1E6}\u{1F1F1}", lat: 41.33, lon: 19.82, kind: "visited", period: "Now" },
  { name: "Prizren", dx: 74, dy: 8, rot: -2, country: "Kosovo", flag: "\u{1F1FD}\u{1F1F0}", lat: 42.21, lon: 20.74, kind: "visited", period: "Where I grew up" },
];
