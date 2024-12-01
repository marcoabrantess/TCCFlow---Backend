import mongoose from 'mongoose';
import { connectDB } from '../../../../src/infrastructure/database/mongoose';

describe('Mongo Connection Integration Test', () => {
    beforeAll(async () => {
        await connectDB();
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    it('Should establish a connection to the database', async () => {
        const connectionState = mongoose.connection.readyState;
        expect(connectionState).toBe(1);
    });

    it('Should be able to insert and retrieve a document', async () => {
        const testSchema = new mongoose.Schema({ name: String });
        const testModel = mongoose.model('Test', testSchema);

        const testDoc = await testModel.create({
            name: 'Integration Test Document',
        });

        const retrievedDoc = await testModel.findById(testDoc._id);
        expect(retrievedDoc?.name).toBe('Integration Test Document');

        await testModel.deleteMany({});
    });
});
