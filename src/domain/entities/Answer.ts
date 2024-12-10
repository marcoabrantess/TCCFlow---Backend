export class Answer {
    constructor(
        public id: string,
        public content: string | string[],
        public questionId: string,
        public createdAt: Date,
        public updatedAt: Date
    ) {}
}
