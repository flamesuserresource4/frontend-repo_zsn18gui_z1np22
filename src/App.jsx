import { useEffect, useState } from 'react'
import Header from './components/Header'
import MemeCard from './components/MemeCard'
import MemeModal from './components/MemeModal'
import NewMemeDialog from './components/NewMemeDialog'

function App() {
  const [query, setQuery] = useState('')
  const [memes, setMemes] = useState([])
  const [openId, setOpenId] = useState(null)
  const [openNew, setOpenNew] = useState(false)
  const [loading, setLoading] = useState(false)

  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const load = async () => {
    setLoading(true)
    const url = new URL(baseUrl + '/api/memes')
    if (query) url.searchParams.set('q', query)
    const res = await fetch(url.toString())
    const data = await res.json()
    setMemes(data)
    setLoading(false)
  }

  useEffect(() => { load() }, [])
  useEffect(() => { const t = setTimeout(load, 400); return () => clearTimeout(t) }, [query])

  const onVote = async (id, direction) => {
    await fetch(`${baseUrl}/api/memes/${id}/vote`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ direction })
    })
    load()
  }

  const onSubmit = async (payload) => {
    await fetch(`${baseUrl}/api/memes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
    setOpenNew(false)
    setQuery('')
    load()
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <Header query={query} setQuery={setQuery} onAdd={() => setOpenNew(true)} />
      <main className="max-w-6xl mx-auto px-4 py-6">
        {loading ? (
          <div className="text-center text-white/60 py-10">carregando memes...</div>
        ) : memes.length === 0 ? (
          <div className="text-center text-white/60 py-10">sem memes ainda — seja o herói que o feed merece</div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {memes.map((m) => (
              <MemeCard key={m.id} meme={m} onVote={onVote} onOpen={setOpenId} />
            ))}
          </div>
        )}
      </main>

      {openId && (
        <MemeModal id={openId} onClose={() => setOpenId(null)} onVote={onVote} />
      )}
      <NewMemeDialog open={openNew} onClose={() => setOpenNew(false)} onSubmit={onSubmit} />

      <footer className="text-center text-xs text-white/40 py-6">feito com amor e caquinhas de internet</footer>
    </div>
  )
}

export default App
