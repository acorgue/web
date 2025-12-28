import { TOC } from "./toc";

export default function Page() {
  return (
    <div className="flex flex-col lg:flex-row max-w-screen-xl mx-auto px-4 lg:px-8">
      <TOC />

      <main className="prose prose-neutral dark:prose-invert max-w-none lg:w-3/5 pt-8">
        <h1 id="introduccio">Introducció</h1>
        <p>Contingut de l'article...</p>

        <h2 id="exemple">Exemple</h2>
        <p>Altres seccions del markdown...</p>
      </main>

      <aside className="lg:w-1/5 lg:pl-6 pt-8">
        <div className="sticky top-8 space-y-4">
          <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
            Articles relacionats
          </h2>
          <ul className="text-sm space-y-2">
            <li>
              <a href="/article-1" className="text-blue-600 hover:underline">
                Article relacionat 1
              </a>
            </li>
            <li>
              <a href="/article-2" className="text-blue-600 hover:underline">
                Article relacionat 2
              </a>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  );
}
