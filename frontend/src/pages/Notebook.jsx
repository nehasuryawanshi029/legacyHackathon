import { useState } from 'react'
import { FileText, Upload, Send, Sparkles, BookOpen, Layers, CheckCircle2, RotateCw } from 'lucide-react'
import { useAtlantis } from '../context/AtlantisContext'
import { api } from '../api/client'

export default function Notebook() {
  const { flashcards, refreshAllState } = useAtlantis()

  const [noteText, setNoteText] = useState('')
  const [noteFilename, setNoteFilename] = useState('Graph_Algorithms_Lecture_Notes.txt')
  const [uploading, setUploading] = useState(false)
  const [uploadSuccess, setUploadSuccess] = useState(null)

  const [qaQuery, setQaQuery] = useState('')
  const [qaResult, setQaResult] = useState(null)
  const [asking, setAsking] = useState(false)

  const handleUpload = async (e) => {
    e.preventDefault()
    if (!noteText.trim()) return
    setUploading(true)
    const res = await api.uploadDocumentText(noteFilename, noteText)
    if (res) {
      setUploadSuccess(res)
      setNoteText('')
      await refreshAllState()
    }
    setUploading(false)
  }

  const handleQA = async (e) => {
    e.preventDefault()
    if (!qaQuery.trim()) return
    setAsking(true)
    const res = await api.documentQA(qaQuery)
    if (res) {
      setQaResult(res)
    }
    setAsking(false)
  }

  const handleReviewFlashcard = async (cardId, rating) => {
    await api.reviewFlashcard(cardId, rating)
    await refreshAllState()
  }

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto text-slate-100">
      {/* Header */}
      <div className="bg-slate-900/80 border border-teal-500/20 p-6 rounded-2xl">
        <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-widest mb-1">
          <FileText className="h-4 w-4" />
          <span>Module 9 & 10 • Atlantis Notebook & Document RAG</span>
        </div>
        <h1 className="text-2xl font-bold text-slate-100">AI Knowledge Workspace & Document Grounded Q&A</h1>
        <p className="text-xs text-slate-400 mt-1">
          Upload lecture notes or papers to generate grounded Q&A responses, definitions, and spaced-repetition flashcards.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* UPLOAD & PARSE NOTES */}
        <div className="p-6 rounded-2xl bg-slate-900/80 border border-teal-500/20 space-y-4 shadow-xl">
          <div className="flex items-center gap-2 text-sm font-bold text-slate-100">
            <Upload className="h-4 w-4 text-cyan-400" />
            <span>Upload / Paste Study Material</span>
          </div>

          <form onSubmit={handleUpload} className="space-y-4">
            <div>
              <label className="text-xs text-slate-400 block mb-1">Document Title / Filename</label>
              <input
                type="text"
                value={noteFilename}
                onChange={(e) => setNoteFilename(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-100 focus:outline-none focus:border-cyan-400"
                required
              />
            </div>

            <div>
              <label className="text-xs text-slate-400 block mb-1">Note Content / Text Extracted</label>
              <textarea
                rows={5}
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                placeholder="Paste lecture notes, definitions, or code snippets here..."
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-100 focus:outline-none focus:border-cyan-400 font-mono"
                required
              />
            </div>

            <button
              type="submit"
              disabled={uploading}
              className="px-4 py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs shadow-md shadow-cyan-500/20 w-full flex items-center justify-center gap-2"
            >
              <Sparkles className="h-4 w-4" />
              <span>{uploading ? 'Processing RAG Embeddings...' : 'Process Document & Generate Flashcards'}</span>
            </button>
          </form>

          {uploadSuccess && (
            <div className="p-4 rounded-xl bg-teal-950/60 border border-teal-500/40 text-xs space-y-2">
              <div className="flex items-center gap-2 text-teal-300 font-bold">
                <CheckCircle2 className="h-4 w-4 text-teal-400" />
                <span>Document Processed Successfully!</span>
              </div>
              <p className="text-slate-300">{uploadSuccess.summary}</p>
              <p className="text-cyan-300 font-mono">
                Chunks Created: {uploadSuccess.chunk_count} • Flashcards Generated: {uploadSuccess.flashcards_generated}
              </p>
            </div>
          )}
        </div>

        {/* GROUNDED DOCUMENT QA */}
        <div className="p-6 rounded-2xl bg-slate-900/80 border border-teal-500/20 space-y-4 shadow-xl flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm font-bold text-slate-100">
              <Sparkles className="h-4 w-4 text-cyan-400" />
              <span>Document-Grounded RAG Q&A</span>
            </div>

            <form onSubmit={handleQA} className="flex items-center gap-2">
              <input
                type="text"
                value={qaQuery}
                onChange={(e) => setQaQuery(e.target.value)}
                placeholder="Ask a question grounded in your uploaded notes..."
                className="flex-1 px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-100 focus:outline-none focus:border-cyan-400"
              />
              <button
                type="submit"
                disabled={asking}
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 text-slate-950 font-bold text-xs"
              >
                Ask
              </button>
            </form>

            {qaResult && (
              <div className="p-4 rounded-xl bg-slate-950 border border-cyan-500/30 text-xs space-y-3">
                <div className="flex items-center justify-between text-[10px] text-cyan-400 font-mono">
                  <span>{qaResult.distinction}</span>
                  <span>{qaResult.grounded_sources?.join(', ')}</span>
                </div>
                <div className="whitespace-pre-wrap text-slate-200">{qaResult.answer}</div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* SPACED REPETITION FLASHCARDS SECTION */}
      <div className="p-6 rounded-2xl bg-slate-900/80 border border-teal-500/20 space-y-4 shadow-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Layers className="h-5 w-5 text-cyan-400" />
            <h2 className="text-lg font-bold text-slate-100">Spaced-Repetition Flashcard Deck</h2>
          </div>
          <span className="text-xs text-slate-400 font-mono">{flashcards.length} Cards Available</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {flashcards.map((card) => (
            <div key={card.id} className="p-4 rounded-xl bg-slate-950 border border-teal-500/20 space-y-3 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono font-bold text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-500/30">
                  {card.topic_name}
                </span>
                <p className="text-xs font-bold text-slate-200 mt-2">Q: {card.front}</p>
                <div className="mt-2 p-2.5 rounded bg-slate-900 border border-slate-800 text-xs text-slate-300 italic">
                  A: {card.back}
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-[10px] text-slate-400">
                  <span>Status: <strong className="text-teal-300">{card.status}</strong></span>
                  <span>Reviews: {card.review_count}</span>
                </div>

                <div className="grid grid-cols-4 gap-1 text-[10px]">
                  <button onClick={() => handleReviewFlashcard(card.id, 'Again')} className="p-1 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30 font-semibold">Again</button>
                  <button onClick={() => handleReviewFlashcard(card.id, 'Hard')} className="p-1 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 font-semibold">Hard</button>
                  <button onClick={() => handleReviewFlashcard(card.id, 'Good')} className="p-1 rounded bg-teal-500/20 text-teal-300 border border-teal-500/30 font-semibold">Good</button>
                  <button onClick={() => handleReviewFlashcard(card.id, 'Easy')} className="p-1 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-semibold">Easy</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
