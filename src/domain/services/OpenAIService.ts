import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

export class OpenAIService {
    private openai: OpenAI;

    constructor() {
        this.openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
        });
    }

    async generateText(
        messageContent: string
    ): Promise<{ responseText: string }> {
        const response = await this.openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: messageContent }],
        });

        const responseText = response?.choices[0]?.message?.content || '';

        return { responseText };
    }
}
