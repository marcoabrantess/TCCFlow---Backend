import mongoose from 'mongoose';
import {
    connectMongoDB,
    disconnectMongoDB,
} from '../../../../src/infrastructure/database/config/mongoConnection';
import { TCCModel } from '../../../../src/infrastructure/database/models/TCCModel';

describe('TCCModel Integration Test', () => {
    beforeAll(async () => {
        await connectMongoDB();
    });

    afterAll(async () => {
        await disconnectMongoDB();
    });

    afterEach(async () => {
        await TCCModel.deleteMany({});
    });

    it('Should create a TCC', async () => {
        const authorId = new mongoose.Types.ObjectId();
        const tcc = await TCCModel.create({
            title: 'Test TCC',
            authorId: authorId.toString(),
            contentPath: 'uploads/test-tcc.pdf',
        });

        expect(tcc.title).toBe('Test TCC');
        expect(tcc.authorId).toBe(authorId.toString());
        expect(tcc.contentPath).toBe('uploads/test-tcc.pdf');
    });

    it('Should retrieve a TCC by ID', async () => {
        const authorId = new mongoose.Types.ObjectId();
        const tcc = await TCCModel.create({
            title: 'Test TCC',
            authorId: authorId.toString(),
            contentPath: 'uploads/test-tcc.pdf',
        });

        const foundTCC = await TCCModel.findById(tcc._id);

        expect(foundTCC).not.toBeNull();
        expect(foundTCC?.title).toBe('Test TCC');
        expect(foundTCC?.authorId).toBe(authorId.toString());
    });

    it('Should update a TCC', async () => {
        const authorId = new mongoose.Types.ObjectId();
        const tcc = await TCCModel.create({
            title: 'Test TCC',
            authorId: authorId.toString(),
            contentPath: 'uploads/test-tcc.pdf',
        });

        const updatedTCC = await TCCModel.findByIdAndUpdate(
            tcc._id,
            {
                title: 'Updated TCC',
                contentPath: 'uploads/updated-tcc.pdf',
            },
            { new: true }
        );

        expect(updatedTCC).not.toBeNull();
        expect(updatedTCC?.title).toBe('Updated TCC');
        expect(updatedTCC?.contentPath).toBe('uploads/updated-tcc.pdf');
    });

    it('Should delete a TCC', async () => {
        const authorId = new mongoose.Types.ObjectId();
        const tcc = await TCCModel.create({
            title: 'Test TCC',
            authorId: authorId.toString(),
            contentPath: 'uploads/test-tcc.pdf',
        });

        await TCCModel.findByIdAndDelete(tcc._id);
        const deletedTCC = await TCCModel.findById(tcc._id);

        expect(deletedTCC).toBeNull();
    });
});
