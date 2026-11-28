// The main navigation, one source (owner, 28 Nov 2026: "make this dynamic and always use nav items"): the header's
// links and the breadcrumb's "Jump to" menu are built from it. `menu` items open a menu in the header.
export const MAIN_NAV = [
  { href: "/services/", label: "Services", menu: true, icon: "M4 7h16v12H4zM9 7V4h6v3M4 12h16" },
  { href: "/work/", label: "Work", icon: "M3 7h18v13H3zM8 7V4h8v3" },
  { href: "/writing/", label: "Insights", icon: "M5 4h11l3 3v13H5zM8 9h8M8 13h8M8 17h5" },
  { href: "/resources/", label: "Resources", menu: true, icon: "M4 5a2 2 0 0 1 2-2h12v16H6a2 2 0 0 0-2 2zM4 5v16M9 7h6" },
  { href: "/about/", label: "About", icon: "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4 21c0-4.4 3.6-7 8-7s8 2.6 8 7" },
];
export const NAV_CTA = { href: "/book/", label: "Start a project", icon: "M4 6h16v14H4zM4 10h16M8 3v4M16 3v4" };
