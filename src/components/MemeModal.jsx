import { X, ExternalLink, ArrowBigUp, ArrowBigDown, MessageCircle } from "lucide-react"
import { useEffect, useState } from "react"

export default function MemeModal({ id, onClose, onVote }) {
  const [meme, setMeme] = useState(null)
  const [comment, setComment] = useState("")
  const baseUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000"

  useEffect(() => {
    const load = async () => {
      const res = await fetch(`${baseUrl}/api/memes/${id}`)
      const data = await res.json()
      setMeme(data)
    }
    if (id) load()
  }, [id])

  const submitComment = async () => {
    if (!comment.trim()) return
    await fetch(`${baseUrl}/api/memes/${id}/comments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ meme_id: id, text: comment })
    })
    setComment("")
    const res = await fetch(`${baseUrl}/api/memes/${id}`)
    const data = await res.json()
    setMeme(data)
  }

  if (!id) return null

  return (
    <div className="fixed inset-0 z-30 bg-black/70 backdrop-blur grid place-items-center p-4">
      <div className="bg-slate-900 border border-white/10 rounded-2xl max-w-3xl w-full overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <div className="text-white font-semibold">Origem do meme</div>
          <button onClick={onClose} className="text-white/70 hover:text-white p-1">
            <X className="w-5 h-5" />
          </button>
        </div>
        {meme ? (
          <div className="p-4 grid md:grid-cols-2 gap-4">
            {meme.image_url && (
              <div className="rounded-lg overflow-hidden bg-black/30">
                <img src={meme.image_url} alt={meme.title} className="w-full h-full object-cover" />
              </div>
            )}
            <div>
              <h3 className="text-white text-xl font-semibold">{meme.title}</h3>
              {meme.caption && <p className="text-white/80 mt-1">{meme.caption}</p>}
              {meme.origin_summary && (
                <p className="text-white/60 text-sm mt-3">Origem: {meme.origin_summary}</p>
              )}
              <div className="flex items-center gap-2 mt-3">
                <button onClick={() => onVote(meme.id, 'up')} className="inline-flex items-center gap-1 bg-white/10 hover:bg-white/20 text-white px-2.5 py-1.5 rounded">
                  <ArrowBigUp className="w-4 h-4" /> {meme.upvotes || 0}
                </button>
                <button onClick={() => onVote(meme.id, 'down')} className="inline-flex items-center gap-1 bg-white/10 hover:bg-white/20 text-white px-2.5 py-1.5 rounded">
                  <ArrowBigDown className="w-4 h-4" /> {meme.downvotes || 0}
                </button>
              </div>
              {meme.sources && meme.sources.length > 0 && (
                <div className="mt-3 space-y-1">
                  <div className="text-white/60 text-sm">Fontes</div>
                  {meme.sources.map((s, i) => (
                    <a key={i} href={s} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-pink-300 hover:text-pink-200 text-sm">
                      {s} <ExternalLink className="w-3 h-3" />
                    </a>
                  ))}
                </div>
              )}
              <div className="mt-6">
                <div className="flex items-center gap-2 text-white/70 text-sm mb-2">
                  <MessageCircle className="w-4 h-4" /> Comentários
                </div>
                <div className="space-y-2 max-h-40 overflow-auto pr-1">
                  {meme.comments && meme.comments.length > 0 ? (
                    meme.comments.map((c) => (
                      <div key={c.id} className="bg-white/5 border border-white/10 rounded p-2 text-sm text-white/80">
                        {c.text}
                      </div>
                    ))
                  ) : (
                    <div className="text-white/40 text-sm">Seja o primeiro a comentar</div>
                  )}
                </div>
                <div className="mt-3 flex gap-2">
                  <input value={comment} onChange={(e)=>setComment(e.target.value)} placeholder="solta a braba" className="flex-1 bg-white/5 border border-white/10 rounded px-3 py-2 text-white placeholder:text-white/40 text-sm" />
                  <button onClick={submitComment} className="bg-pink-600 hover:bg-pink-500 text-white px-4 rounded">Enviar</button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-6 text-white/60">Carregando...</div>
        )}
      </div>
    </div>
  )
}
