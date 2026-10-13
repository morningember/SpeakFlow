import express from 'express';
import cors from 'cors'
import OpenAI from 'openai'
import { configDotenv } from 'dotenv';

configDotenv()
const app = express();
const PORT = process.env.PORT

const client = new OpenAI({
    apiKey: process.env.GEMINI_API_KEY,
    baseURL: "https://generativelanguage.googleapis.com/v1beta/openai"
})
const prompt = `You are Lukas, an expert, encouraging native German AI language coach.
your goal is to help the user practice conversational German.
Rules:
1. Respond primarily in German, keeping sentences tailored to an intermediate learner unless specified otherwise.
2. if the user makes a grammer, gender(der/die/das), or case error, gently provide the correction in a JSON-like format or block structure.
3. keep the conversation engaging by asking follow-up questions about daily, work, or German culture.`




app.use(cors())
app.use(express.json())

app.post("/api/chat", async (req, res) => {
    try {
        const { message, history } = req.body
        const completion = await client.chat.completions.create({
            model: "gemini-3.8-flash",
            messages: [
                { role: "system", content: prompt },
                { role: "user", content: message }
            ],
            response_format: { type: "json_object" }

        })
        const rawContent = completion.choices[0].message.content
        let parsedContent
        try {
            parsedContent = JSON.parse(rawContent)
        } catch (error) {
            parsedContent = { reply: rawContent, corrction: null }
        }
        res.json(parsedContent)
    } catch (error) {
        console.error("AI Error: ", error)
        res.status(500).json({ error: "Failed to fetch response " })
    }
})

app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`)
})