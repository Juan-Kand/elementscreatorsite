type Person = { name: string; src: string };

export default function AvatarGroup({
  people = [
    { name: "Léa", src: "https://i.pravatar.cc/80?img=47" },
    { name: "Hugo", src: "https://i.pravatar.cc/80?img=12" },
    { name: "Inès", src: "https://i.pravatar.cc/80?img=32" },
    { name: "Karim", src: "https://i.pravatar.cc/80?img=15" },
    { name: "Sofia", src: "https://i.pravatar.cc/80?img=5" },
    { name: "Noah", src: "https://i.pravatar.cc/80?img=8" },
  ],
  max = 4,
  size = 40,
}: { people?: Person[]; max?: number; size?: number }) {
  const shown = people.slice(0, max);
  const rest = people.length - shown.length;
  return (
    <div className="flex items-center -space-x-3" aria-label={`${people.length} membres`}>
      {shown.map((p) => (
        <img key={p.name} src={p.src} alt={p.name} title={p.name} width={size} height={size}
          className="rounded-full object-cover ring-2 ring-white dark:ring-neutral-950" style={{ width: size, height: size }} />
      ))}
      {rest > 0 && (
        <span className="flex items-center justify-center rounded-full bg-neutral-200 text-xs font-semibold text-neutral-700 ring-2 ring-white dark:bg-neutral-800 dark:text-neutral-300 dark:ring-neutral-950"
          style={{ width: size, height: size }}>
          +{rest}
        </span>
      )}
    </div>
  );
}
