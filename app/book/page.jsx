import ProjectStart from "../../components/ProjectStart";
import { SITE } from "../../lib/site";

const TITLE = "Start a project with Sam Vllaco";
const DESC = "Tell me what you need and your budget, then book a 30-min call or send it by email. Projects start at $5,000.";

export const metadata = {
  title: "Start a project",
  description: DESC,
  alternates: { canonical: "/book/" },
  openGraph: { title: TITLE, description: DESC, url: "/book/", type: "website", images: [{ url: "/og-book-call-2.jpg", width: 1200, height: 630, alt: "Book a strategy design call. Sam Vllaco holding a laptop." }] },
  twitter: { card: "summary_large_image", title: TITLE, description: DESC, images: ["/og-book-call-2.jpg"], site: SITE.handle, creator: SITE.handle },
};


export default function Book() {
  return (
    <div className="wrap page pg svc">
      <div className="book-split is-full">
        <ProjectStart />
      </div>
    </div>
  );
}
