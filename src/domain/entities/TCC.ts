export class TCC {
    constructor(
        public _id: string,
        public title: string,
        public authorName: string,
        public advisorName: string,
        public coadvisorName: string,
        public contentPath: string,
        public createdAt: Date,
        public updatedAt: Date
    ) {}
}
