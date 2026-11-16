export default function TestimonialSpotlight({
  quote = "En trois mois, notre taux de conversion a doublé. La nouvelle page d'accueil a été montée en deux jours avec ces composants.",
  name = "Julie Moreau",
  role = "Directrice marketing, Lumen",
  avatar = "https://i.pravatar.cc/160?img=45",
}: { quote?: string; name?: string; role?: string; avatar?: string }) {
  return (
    <section className="bg-neutral-950 px-6 py-24 text-white">
      <figure className="mx-auto max-w-3xl text-center">
        <span aria-hidden className="block font-serif text-7xl leading-none text-violet-500">“</span>
        <blockquote className="mt-2 text-2xl font-medium leading-relaxed sm:text-3xl">{quote}</blockquote>
        <figcaption className="mt-10 flex items-center justify-center gap-4">
          <img src={avatar} alt="" className="h-12 w-12 rounded-full object-cover" />
          <div className="text-left">
            <div className="font-semibold">{name}</div>
            <div className="text-sm text-neutral-400">{role}</div>
          </div>
        </figcaption>
      </figure>
    </section>
  );
}
