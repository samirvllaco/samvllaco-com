import Globe from "../../components/Globe";

export const metadata = {
  title: "Globe: Places I Have Been",
  description: "An interactive globe of the places Sam Vllaco has visited and worked from.",
  alternates: { canonical: "/globe/" },
};

export default function GlobePage() {
  return (
    <div className="wrap page">
      <h1 className="sr">Globe</h1>
      <Globe full />
    </div>
  );
}
