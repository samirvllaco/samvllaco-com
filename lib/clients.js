// Client avatars shown in the hero trust row and on the book page.
// One place to edit names, projects and photos.
//
// An entry shows a face only when BOTH are true:
//   verified: true   -> this is a real client who agreed to be shown
//   photo: "/clients/<file>.webp" -> a real photo of that person, in public/clients/
// Anything else is a placeholder and is never rendered as a client.
export const CLIENTS = [
  { name: "Daniel", project: "SaaS Dashboard", photo: "", verified: false },
  { name: "Michael", project: "Fintech Platform", photo: "", verified: false },
  { name: "Christopher", project: "Mining.com.au", photo: "", verified: false },
  { name: "David", project: "SleepScriptMD", photo: "", verified: false },
  { name: "Jonathan", project: "E-commerce Platform", photo: "", verified: false },
  { name: "Andrew", project: "Healthcare Website", photo: "", verified: false },
  { name: "Sarah", project: "Startup Landing Page", photo: "", verified: false },
];

export const SHOWN_CLIENTS = CLIENTS.filter((c) => c.verified && c.photo);

// Illustrative avatars: decorative photos only. They are NOT clients, carry no names,
// and must never sit next to wording that implies these people are customers
// (trust rows, review counts, testimonials, "trusted by" lines).
export const ILLUSTRATIVE = [1, 2, 3, 4, 5, 6, 7].map((n) => `/people/p${n}.webp`);
