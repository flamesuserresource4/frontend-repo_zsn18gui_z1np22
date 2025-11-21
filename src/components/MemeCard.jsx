import { ArrowBigUp, ArrowBigDown, ExternalLink } from "lucide-react"

export default function MemeCard({ meme, onVote, onOpen }) {
  return (
    <div className="group bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-pink-500/40 transition-colors">
      {meme.image_url && (
        <div className="aspect-video overflow-hidden bg-black/30">
          <img src={meme.image_url} alt={meme.title} className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform" />
        </div>
      )}
      <div className="p-4">
        <div className="flex items-start gap-3">
          <div className="flex-1 min-w-0">
            <h3 className="text-white font-semibold text-lg truncate">{meme.title}</h3>
            {meme.caption && <p className="text-white/70 text-sm line-clamp-2">{meme.caption}</p>}
            {meme.origin_summary && (
              <p className="text-xs text-white/40 mt-2 line-clamp-2">Origem: {meme.origin_summary}</p>
            )}
            {meme.sources && meme.sources.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {meme.sources.slice(0,3).map((s, i) => (
                  <a key={i} href={s} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-[11px] text-pink-300 hover:text-pink-200">
                    fonte <ExternalLink className="w-3 h-3" />
                  </a>
                ))}
              </div>
            )}
          </div>
          <div className="flex flex-col items-center gap-1">
            <button onClick={() => onVote(meme.id, 'up')} className="p-1.5 rounded bg-white/10 hover:bg-white/20 text-white">
              <ArrowBigUp className="w-4 h-4" />
            </button>
            <div className="text-white/80 text-sm font-semibold min-w-[2ch] text-center">{meme.upvotes || 0}</div>
            <button onClick={() => onVote(meme.id, 'down')} className="p-1.5 rounded bg-white/10 hover:bg-white/20 text-white">
              <ArrowBigDown className="w-4 h-4" />
            </button>
          </div>
        </div>
        <button onClick={() => onOpen(meme.id)} className="mt-4 w-full text-center text-sm text-pink-300 hover:text-pink-200">Ver origem e comentários</button>
      </div>
    </div>
  )}
