import OpenAI from "openai";

export default async function handler(req, res) {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  if (req.method !== "POST") {
    return res.status(405).end();
  }

  try {
    const { text } = req.body;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "Turn this into clear bullet point revision notes.",
        },
        { role: "user", content: text },
      ],
    });

    res.status(200).json({
      notes: completion.choices[0].message.content,
    });
  } catch (error) {
    res.status(500).json({ error: "Error" });
  }
}
