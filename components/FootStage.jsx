// Tall footer scene: Sam's portrait with a laptop and the tools he works with.
// Server component. The image fades into the footer background at the sides and top.
export default function FootStage() {
  return (
    <div className="foot-stage foot-photo">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/sam-footer.webp" width="1254" height="1254" loading="lazy"
        alt="Sam Vllaco holding a laptop, with a dumbbell, design tool icons, a marker and a coffee cup floating around him" />
    </div>
  );
}
