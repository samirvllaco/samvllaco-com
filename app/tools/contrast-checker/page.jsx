import PageHead from "../../../components/PageHead";
import ToolCta from "../../../components/tools/ToolCta";
import ContrastChecker from "../../../components/tools/ContrastChecker";

export const metadata = {
  title: "Color Contrast Checker (WCAG 2.2 AA and AAA)",
  description: "Free color contrast checker. Test text and background colors against WCAG 2.2 AA and AAA and get the closest passing color.",
  alternates: { canonical: "/tools/contrast-checker/" },
};

export default function Page() {
  return (
    <div className="wrap page pg tl-page">
      <PageHead crumb="Free tools" href="/tools/" a="Color contrast" b="checker." lede="Check if your text is readable for everyone, and get a passing color in one click." />
      <ContrastChecker />
      <section className="tl-how" aria-labelledby="tl-how-h">
        <h2 id="tl-how-h">How it works</h2>
        <p>Paste two hex colors. The checker works out the contrast ratio with the WCAG 2.2 formula: normal text needs 4.5:1 for AA and 7:1 for AAA, large text and icons need 3:1. If a pair fails, it nudges your text color toward black or white until it passes, so you keep your brand feel. Everything runs in your browser.</p>
      </section>
      <ToolCta />
    </div>
  );
}
