const express = require('express')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())

const PORT = process.env.PORT || 5178

app.get('/', (req, res) => res.send({ ok: true }))

app.post('/api/generate', async (req, res) => {
  const prompt = req.body?.prompt || ''
  if (!prompt) return res.status(400).json({ error: 'missing prompt' })
  if (!process.env.GOOGLE_API_KEY) {
    // Fallback demo response when API key is not provided locally.
    return res.json({ reply: 'Demo reply: set GOOGLE_API_KEY in .env (server) for real Gemini responses.' })
  }

  try {
    const url = `https://generativelanguage.googleapis.com/v1/models/text-bison-001:generateText?key=${process.env.GOOGLE_API_KEY}`
    const payload = { prompt: { text: prompt } }
    const r = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    const data = await r.json()

    // best-effort extraction of reply
    const reply = data?.candidates?.[0]?.output || data?.candidates?.[0]?.content || data?.output?.[0]?.content || data?.reply || JSON.stringify(data)

    return res.json({ reply })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ error: 'failed to contact API' })
  }
})

app.listen(PORT, () => console.log(`Server listening on ${PORT}`))
