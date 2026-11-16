export default function NotFound404({ homeHref = "/" }: { homeHref?: string }) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-white px-6 text-center dark:bg-neutral-950">
      <p className="bg-gradient-to-b from-violet-600 to-sky-400 bg-clip-text text-8xl font-black tracking-tighter text-transparent sm:text-9xl">404</p>
      <h1 className="mt-4 text-2xl font-bold text-neutral-900 sm:text-3xl dark:text-white">Page introuvable</h1>
      <p className="mt-3 max-w-md text-neutral-600 dark:text-neutral-400">La page que vous cherchez a peut-être été déplacée ou n'a jamais existé.</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <a href={homeHref} className="rounded-lg bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-violet-500">Retour à l'accueil</a>
        <a href="mailto:support@exemple.fr" className="rounded-lg px-5 py-2.5 text-sm font-semibold text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-900">Contacter le support</a>
      </div>
    </main>
  );
}
