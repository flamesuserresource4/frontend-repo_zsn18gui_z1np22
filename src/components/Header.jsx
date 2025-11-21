import { Search, Plus, Laugh } from "lucide-react"

export default function Header({ query, setQuery, onAdd }) {
  return (
    <header className="sticky top-0 z-20 bg-slate-900/70 backdrop-blur border-b border-white/10">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center gap-3">
        <div className="flex items-center gap-2 text-white">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-pink-500 to-violet-500 grid place-items-center">
            <Laugh className="w-5 h-5" />
          </div>
          <div className="font-bold text-xl">MemeWiki</div>
          <span className="text-xs text-white/60">shitpost edition</span>
        </div>
        <div className="flex-1" />
        <div className="relative max-w-md w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 w-4 h-4" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar meme, legenda, origem..."
            className="w-full bg-white/5 border border-white/10 rounded-lg pl-9 pr-3 py-2.5 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-pink-500/40"
          />
        </div>
        <button
          onClick={onAdd}
          className="inline-flex items-center gap-2 bg-pink-600 hover:bg-pink-500 text-white text-sm font-semibold px-3.5 py-2.5 rounded-lg transition-colors"
        >
          <Plus className="w-4 h-4" />
          Enviar meme
        </button>
      </div>
    </header>
  )
}
