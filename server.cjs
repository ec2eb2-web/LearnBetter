
const express = require('express')
const cors = require('cors')
require('dotenv').config()
const OpenAI = require('openai')

const app = express()

app.use(cors({ origin: 'http://localhost:5173' }))
app.use(express.json())

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

app.post('/api/chat', async (req, res) => {
  try {
    const message = req.body.message?.trim()

    if (!message) {
      return res.status(400).json({
        error: 'Please enter a question.',
      })
    }

    const response = await client.responses.create({
      model: 'gpt-6-astra',
      instructions:
        'You are LearnBetter Tutor. Help college students learn coding, DSA, web development, and mathematics. Explain concepts simply, step by step, using beginner-friendly examples.',
      input: message,
    })

    res.json({ reply: response.output_text })
  } catch (error) {
    console.error('AI Tutor error:', error.message)
    res.status(500).json({
      error: 'AI Tutor could not answer. Please check your API setup.',
    })
  }
})

app.listen(3001, () => {
  console.log('LearnBetter AI backend running on http://localhost:3001')
})
