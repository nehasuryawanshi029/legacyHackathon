import { Library, ExternalLink, Bookmark, CheckCircle2 } from 'lucide-react'
import { useAtlantis } from '../context/AtlantisContext'

export default function Resources() {
  const { resources } = useAtlantis()

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto text-slate-100">
      {/* Header */}
      <div className="bg-slate-900/80 border border-teal-500/20 p-6 rounded-2xl">
        <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-widest mb-1">
          <Library className="h-4 w-4" />
          <span>Module 20 • Grounded Resources Hub</span>
        </div>
        <h1 className="text-2xl font-bold text-slate-100">Curated Learning & Skill Resources</h1>
        <p className="text-xs text-slate-400 mt-1">
          Recommended documentations, practice tools, and tutorials grounded in identified skill gaps.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {resources.map((res) => (
          <div key={res.id} className="p-5 rounded-2xl bg-slate-900/80 border border-teal-500/20 space-y-3 flex flex-col justify-between shadow-xl">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-500/30">
                  {res.type}
                </span>
                <span className="text-xs font-mono text-teal-300 font-bold">{res.skill_tag}</span>
              </div>
              <h3 className="text-base font-bold text-slate-100 mt-2">{res.title}</h3>
              <p className="text-xs text-slate-400 mt-1">Topic: {res.topic_name}</p>
            </div>

            <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
              <a
                href={res.link}
                target="_blank"
                rel="noreferrer"
                className="text-xs text-cyan-400 hover:underline flex items-center gap-1 font-semibold"
              >
                <span>Open Resource</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
              <button className="text-slate-400 hover:text-cyan-300 p-1.5 rounded-lg hover:bg-slate-950">
                <Bookmark className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
