export interface StudentGrade {
    studentId: string;
    percentageGrade: number;
}

export class Task {
    constructor(
        public _id: string,
        public title: string,
        public description: string,
        public totalGrade: number,
        public studentGrades: StudentGrade[],
        public createdAt: Date,
        public updatedAt: Date
    ) {}
}
