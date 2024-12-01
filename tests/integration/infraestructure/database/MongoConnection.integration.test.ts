import mongoose from 'mongoose';
import {
    connectMongoDB,
    disconnectMongoDB,
} from '../../../../src/infrastructure/database/config/mongoConnection';

describe('Mongo Connection Integration Test', () => {
    beforeAll(async () => {
        await connectMongoDB();
    });

    afterAll(async () => {
        await disconnectMongoDB();
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
