import { Request, Response } from 'express';
import { OpenAIService } from '../../domain/services/OpenAIService';

const openAIService = new OpenAIService();

export const generateText = async (req: Request, res: Response) => {
    try {
        console.log(req.body);
        const { content } = req.body;

        if (!content) {
            throw new Error('Message without content.');
        }

        const { responseText } = await openAIService.generateText(
            content.message
        );

        res.status(200).json({
            success: true,
            responseText,
        });
    } catch (err) {
        res.status(401).json({
            message: 'Failed to generate response',
            error: err instanceof Error ? err.message : 'Unknown error',
        });
    }
};
