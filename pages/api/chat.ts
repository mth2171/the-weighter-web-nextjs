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

    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt,
      temperature: 0,
      max_tokens: 2048,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    res.status(200).json({ response: response.data.choices[0] });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
}
