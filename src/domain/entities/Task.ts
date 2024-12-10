import { Question } from './Question';

export class Task {
    constructor(
        public id: string,
        public title: string,
        public questions: Question[],
        public createdAt: Date,
        public updatedAt: Date
    ) {}
}
