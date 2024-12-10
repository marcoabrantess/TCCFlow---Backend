export class TCC {
    constructor(
        public id: string,
        public title: string,
        public authorId: string,
        public contentPath: string, // Caminho ou URL para o arquivo PDF
        public createdAt: Date,
        public updatedAt: Date
    ) {}
}
