import { Upload, FileText, X } from 'lucide-react'
import Button from '../ui/Button'

function formatSize(bytes) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

export default function ResumeUploader({ file, onFileSelect, onRemove, onAnalyze, analyzing }) {
  const handleDrop = (e) => {
    e.preventDefault()
    const dropped = e.dataTransfer.files?.[0]
    if (dropped) onFileSelect(dropped)
  }

  const handleChange = (e) => {
    const selected = e.target.files?.[0]
    if (selected) onFileSelect(selected)
  }

  return (
    <div className="space-y-4">
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        className={`relative rounded-2xl border-2 border-dashed p-8 text-center transition-colors ${
          file
            ? 'border-tide bg-foam/30'
            : 'border-surface/50 bg-pearl/40 hover:border-coral/50 hover:bg-pearl/60'
        }`}
      >
        {!file ? (
          <>
            <Upload className="mx-auto h-10 w-10 text-tide" />
            <p className="mt-3 font-medium text-deep">Drag & drop your resume here</p>
            <p className="mt-1 text-sm text-deep/60">Supported: PDF, DOCX · Max 5 MB</p>
            <label className="mt-4 inline-block cursor-pointer">
              <span className="btn-atlantis-cta inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold">
                Upload Resume
              </span>
              <input type="file" accept=".pdf,.doc,.docx" className="hidden" onChange={handleChange} />
            </label>
          </>
        ) : (
          <div className="flex items-center justify-center gap-3">
            <FileText className="h-8 w-8 text-tide" />
            <div className="text-left">
              <p className="font-medium text-deep">{file.name}</p>
              <p className="text-sm text-deep/60">{formatSize(file.size)}</p>
            </div>
            <button
              type="button"
              onClick={onRemove}
              className="rounded-lg p-2 text-deep/50 hover:bg-red-50 hover:text-coral"
              aria-label="Remove file"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>

      {file && (
        <Button onClick={onAnalyze} disabled={analyzing} className="w-full sm:w-auto">
          {analyzing ? 'Analyzing…' : 'Analyze Resume'}
        </Button>
      )}
    </div>
  )
}
