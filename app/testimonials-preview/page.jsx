import Testimonials from "../../components/Testimonials";

export const metadata = { title: "Testimonials preview", robots: { index: false, follow: false } };

export default function Preview() {
  return <div className="wrap page stack-lg"><Testimonials /></div>;
}
