import { useState } from "react"

export default function NewMemeDialog({ open, onClose, onSubmit }) {
  const [form, setForm] = useState({ title: "", image_url: "", caption: "", origin_summary: "", sources: "", tags: "" })

  const submit = () => {
    const payload = {
      ...form,
      sources: (form.sources || "").split(/\s+/).filter(Boolean),
      tags: (form.tags || "").split(/[,\s]+/).filter(Boolean),
    }
    onSubmit(payload)
    setForm({ title: "", image_url: "", caption: "", origin_summary: "", sources: "", tags: "" })
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-30 bg-black/70 backdrop-blur grid place-items-center p-4">
      <div className="bg-slate-900 border border-white/10 rounded-2xl w-full max-w-lg overflow-hidden">
        <div className="p-4 border-b border-white/10 text-white font-semibold">Enviar novo meme</div>
        <div className="p-4 space-y-3">
          <Input label="Título" value={form.title} onChange={(v)=>setForm(p=>({...p, title:v}))} />
          <Input label="URL da imagem" value={form.image_url} onChange={(v)=>setForm(p=>({...p, image_url:v}))} />
          <Input label="Legenda" value={form.caption} onChange={(v)=>setForm(p=>({...p, caption:v}))} />
          <Input label="Resumo da origem" value={form.origin_summary} onChange={(v)=>setForm(p=>({...p, origin_summary:v}))} />
          <Input label="Fontes (links separados por espaço)" value={form.sources} onChange={(v)=>setForm(p=>({...p, sources:v}))} />
          <Input label="Tags (separe por vírgula ou espaço)" value={form.tags} onChange={(v)=>setForm(p=>({...p, tags:v}))} />
          <div className="pt-2 flex justify-end gap-2">
            <button onClick={onClose} className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded">Cancelar</button>
            <button onClick={submit} className="px-4 py-2 bg-pink-600 hover:bg-pink-500 text-white rounded">Enviar</button>
          </div>
        </div>
      </div>
    </div>
  )
}

function Input({ label, value, onChange }) {
  return (
    <label className="block">
      <div className="text-white/70 text-sm mb-1">{label}</div>
      <input value={value} onChange={(e)=>onChange(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-white placeholder:text-white/40 text-sm" />
    </label>
  )
}
