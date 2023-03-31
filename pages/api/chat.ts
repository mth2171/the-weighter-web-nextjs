import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { Configuration, OpenAIApi } from "openai";

export default async function chat(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { prompt } = req.body;

    const config = new Configuration({
      apiKey: process.env.NEXT_PUBLIC_CHAT_GPT_API_KEY,
    });

    const openai = new OpenAIApi(config);

    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    });

    res.status(200).json({ response: response.data.choices[0].message.content });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
}
