const express = require('express')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())

const PORT = process.env.PORT || 5178
const IS_MOCK = !process.env.GOOGLE_API_KEY

app.get('/', (req, res) => res.send({ ok: true, mock: IS_MOCK, env: process.env.NODE_ENV || 'development' }))

app.post('/api/generate', async (req, res) => {
  const prompt = req.body?.prompt || ''
  if (!prompt) return res.status(400).json({ error: 'missing prompt' })
  if (IS_MOCK) {
    // Local mock response when API key is not provided.
    // This gives a helpful example reply instead of a terse demo notice.
    const short = prompt.length > 120 ? prompt.slice(0, 117) + '...' : prompt
    let reply = `Simulated response for: "${short}"\n\n`;
    if (/summari|summariz|brief|short/i.test(prompt)) {
      reply += `Summary: ${short.split('.').slice(0,2).join('. ')}.`
    } else if (/suggest|recommend|idea|plan/i.test(prompt)) {
      reply += `Suggestions:\n- ${short} (idea 1)\n- ${short} (idea 2)`
    } else {
      reply += `Answer: I would respond to your prompt: "${short}". (This is a local mock; set GOOGLE_API_KEY in server .env for real Gemini responses.)`
    }
    return res.json({ reply, source: 'mock', mock: true, note: 'Running in local mock mode — set GOOGLE_API_KEY in server .env for real Gemini responses.' })
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

    return res.json({ reply, source: 'gemini' })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ error: 'failed to contact API' })
  }
})

  app.listen(PORT, () => console.log(`Server listening on ${PORT} (mock mode=${IS_MOCK})`))
