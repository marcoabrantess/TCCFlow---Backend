import {
    connectMongoDB,
    disconnectMongoDB,
} from '../../../../src/infrastructure/database/config/mongoConnection';
import { UserModel } from '../../../../src/infrastructure/database/models/UserModel';

describe('UserModel Integration Test', () => {
    beforeAll(async () => {
        await connectMongoDB();
    });

    afterAll(async () => {
        await disconnectMongoDB();
    });

    afterEach(async () => {
        await UserModel.deleteMany({});
    });

    it('Should create a user', async () => {
        const user = await UserModel.create({
            name: 'Test User',
            email: 'testuser@example.com',
            password: 'password',
            userGroups: ['admin'],
        });

        expect(user.name).toBe('Test User');
        expect(user.email).toBe('testuser@example.com');
        expect(user.password).toBe('password');
        expect(user.userGroups).toContain('admin');
    });

    it('Should retrieve a user by ID', async () => {
        const user = await UserModel.create({
            name: 'Test User',
            email: 'testuser@example.com',
            password: 'password',
            userGroups: ['admin'],
        });

        const foundUser = await UserModel.findById(user._id);

        expect(foundUser).not.toBeNull();
        expect(foundUser?.name).toBe('Test User');
        expect(foundUser?.email).toBe('testuser@example.com');
    });

    it('Should update a user', async () => {
        const user = await UserModel.create({
            name: 'Test User',
            email: 'testuser@example.com',
            password: 'password',
            userGroups: ['admin'],
        });

        const updatedUser = await UserModel.findByIdAndUpdate(
            user._id,
            {
                name: 'Updated User',
                userGroups: ['admin', 'student'],
            },
            {
                new: true,
            }
        );

        expect(updatedUser).not.toBeNull();
        expect(updatedUser?.name).toBe('Updated User');
        expect(updatedUser?.userGroups).toContain('student');
    });

    it('Should delete a user', async () => {
        const user = await UserModel.create({
            name: 'Test User',
            email: 'testuser@example.com',
            password: 'password',
            userGroups: ['admin'],
        });

        await UserModel.findByIdAndDelete(user._id);
        const deletedUser = await UserModel.findById(user._id);

        expect(deletedUser).toBeNull();
    });
});
