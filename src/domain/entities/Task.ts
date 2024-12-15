import { Question } from './Question';

export class Task {
    constructor(
        public _id: string,
        public title: string,
        public questions: Question[],
        public isCompleted: boolean,
        public createdAt: Date,
        public updatedAt: Date
    ) {}
}
