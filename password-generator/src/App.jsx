import { useCallback, useEffect, useRef, useState } from 'react'

function App() {
  const [length, setLength] = useState(12)
  const [password, setPassword] = useState('')
  const [includeNumbers, setIncludeNumbers] = useState(true)
  const [includeSymbols, setIncludeSymbols] = useState(true)
  const passwordRef = useRef(null)

  const generatePassword = useCallback(() => {
    let pass = ''
    let characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

    if (includeNumbers) {
      characters += '0123456789'
    }

    if (includeSymbols) {
      characters += '!@#$%^&*()_+[]{}|;:,.<>?'
    }

    for (let i = 0; i < length; i += 1) {
      const randomIndex = Math.floor(Math.random() * characters.length)
      pass += characters[randomIndex]
    }

    setPassword(pass)
  }, [includeNumbers, includeSymbols, length])

  const copyPassword = useCallback(() => {
    if (password) {
      navigator.clipboard.writeText(password)
      passwordRef.current?.focus()
      passwordRef.current?.select()
    }
  }, [password])

  useEffect(() => {
    generatePassword()
  }, [generatePassword])

  return (
    <div className="min-h-screen bg-slate-900 px-4 py-8 text-slate-100 flex items-center justify-center">
      <div className="w-full max-w-md rounded-2xl border border-slate-700 bg-slate-800 p-5 shadow-2xl">
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-xl font-semibold">Password Generator</h1>
          <span className="rounded-full bg-orange-500/20 px-3 py-1 text-sm text-orange-400">
            Secure
          </span>
        </div>

        <div className="mb-4 overflow-hidden rounded-lg border border-slate-700 bg-slate-950">
          <input
            ref={passwordRef}
            type="text"
            value={password}
            className="w-full bg-transparent px-3 py-3 text-sm outline-none"
            placeholder="Generated Password"
            readOnly
          />
        </div>

        <div className="mb-4">
          <div className="mb-2 flex items-center justify-between text-sm">
            <span>Password Length</span>
            <span className="font-semibold text-orange-400">{length}</span>
          </div>
          <input
            type="range"
            min="6"
            max="24"
            value={length}
            onChange={(event) => setLength(Number(event.target.value))}
            className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-slate-700 accent-orange-500"
          />
        </div>

        <div className="mb-4 flex items-center gap-4 text-sm">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={includeNumbers}
              onChange={() => setIncludeNumbers((value) => !value)}
              className="h-4 w-4 rounded border-slate-600 bg-slate-700"
            />
            Numbers
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={includeSymbols}
              onChange={() => setIncludeSymbols((value) => !value)}
              className="h-4 w-4 rounded border-slate-600 bg-slate-700"
            />
            Symbols
          </label>
        </div>

        <div className="flex gap-3">
          <button
            onClick={generatePassword}
            className="flex-1 rounded-lg bg-orange-500 px-4 py-2 font-medium text-white transition hover:bg-orange-600"
          >
            Generate
          </button>
          <button
            onClick={copyPassword}
            className="rounded-lg border border-slate-600 px-4 py-2 text-sm text-slate-200 transition hover:bg-slate-700"
          >
            Copy
          </button>
        </div>
      </div>
    </div>
  )
}

export default App
