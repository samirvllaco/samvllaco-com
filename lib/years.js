// The Experience gauge on the home bento, one line per year (owner, 28 Nov 2026: "make this interactive, show years
// like in About, add light effects, indicate experience, how design changed, styles, tools learned"). Sam's own
// milestones are the ones he gave (2013 start, 2015 first paid project, 2026 Tirana, 573 clients); the other years
// name what changed in design that year (dates checked: iOS 7 2013, Material 2014, Figma public 2016, macOS dark mode
// 2018, Figma auto layout 2019, Figma variables and Dev Mode 2023, Liquid Glass and Claude Code 2025).
export const YEARS = [
  [2013, "I start: logos and posters for friends"],
  [2014, "Flat design, Material and Sketch"],
  [2015, "My first paid design project"],
  [2016, "Figma opens to everyone"],
  [2017, "Design systems go mainstream"],
  [2018, "Dark mode arrives on the Mac"],
  [2019, "Figma adds auto layout"],
  [2020, "Neumorphism and remote teams"],
  [2021, "Glassmorphism and 3D icons"],
  [2022, "AI image tools arrive"],
  [2023, "Figma variables and Dev Mode"],
  [2024, "AI coding tools join the workflow"],
  [2025, "Liquid Glass and Claude Code"],
  [2026, "Tirana, 573 clients, 10,000+ screens"],
];
export const FIRST_YEAR = YEARS[0][0];
export const LAST_YEAR = YEARS[YEARS.length - 1][0];
export const factOf = (y) => (YEARS.find((x) => x[0] === y) || YEARS[YEARS.length - 1])[1];
