import { QuestionRepository } from '../repositories/QuestionRepository';
import { Question } from '../entities/Question';

export class QuestionService {
    constructor(private questionRepo: QuestionRepository) {}

    createQuestion(data: Partial<Question>): Question {
        if (!data.text || !data.type) {
            throw new Error('Invalid question data');
        }

        const question = new Question(
            Math.random().toString(36).substring(2),
            data.text,
            data.type,
            data.options || []
        );

        return this.questionRepo.create(question);
    }

    getQuestionById(id: string): Question | undefined {
        return this.questionRepo.findById(id);
    }

    updateQuestion(id: string, data: Partial<Question>): Question | undefined {
        return this.questionRepo.update(id, data);
    }

    deleteQuestion(id: string): void {
        this.questionRepo.delete(id);
    }
}
