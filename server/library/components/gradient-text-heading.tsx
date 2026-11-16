/**
 * Titre au dégradé animé. Ajouter dans tailwind.config :
 * theme.extend.keyframes.shine = { to: { backgroundPosition: "200% center" } }
 * theme.extend.animation.shine = "shine 4s linear infinite"
 */
export default function GradientTextHeading({
  before = "Créez des sites",
  highlight = "extraordinaires",
  after = "en un temps record",
}: { before?: string; highlight?: string; after?: string }) {
  return (
    <h2 className="text-center text-4xl font-bold tracking-tight text-neutral-900 sm:text-6xl dark:text-white">
      {before}{" "}
      <span className="animate-shine bg-[linear-gradient(90deg,#8b5cf6,#ec4899,#0ea5e9,#8b5cf6)] bg-[length:200%_auto] bg-clip-text text-transparent motion-reduce:animate-none">
        {highlight}
      </span>{" "}
      {after}
    </h2>
  );
}
