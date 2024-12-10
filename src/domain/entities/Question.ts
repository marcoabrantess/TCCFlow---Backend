import { Answer } from './Answer';

export class Question {
    constructor(
        public id: string,
        public text: string,
        public type: 'text' | 'multiple-choice',
        public options: string[] = [],
        public answer: Answer | null = null
    ) {}
}
