import { TCCService } from '../../domain/services/TCCService';
import { TCC } from '../../domain/entities/TCC';

export class CreateTCC {
    constructor(private tccService: TCCService) {}

    async execute(tccData: {
        title: string;
        authorId: string;
        contentPath: string;
    }): Promise<TCC> {
        return this.tccService.create(tccData);
    }
}
