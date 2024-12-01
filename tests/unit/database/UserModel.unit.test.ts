import { UserModel } from '../../../src/infrastructure/database/models/UserModel';

// jest.mock: Substitui a implementação real do UserModel por uma simulada
jest.mock('../../../src/infrastructure/database/models/UserModel');

describe('UserModel Unit Test', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('Should call create method with correct data', async () => {
        // jest.spyOn: Espiona métodos específicos para verificar como eles são chamados
        const mockCreate = jest.spyOn(UserModel, 'create').mockResolvedValue({
            name: 'Test User',
            email: 'testuser@example.com',
            password: 'password',
            userGroups: ['admin'],
            createdAt: new Date(),
            updatedAt: new Date(),
        } as any);

        const userData = {
            name: 'Test User',
            email: 'testuser@example.com',
            password: 'password',
            userGroups: ['admin'],
        };

        await UserModel.create(userData);

        expect(mockCreate).toHaveBeenCalledWith(userData);
        expect(mockCreate).toHaveBeenCalledTimes(1);
    });

    it('Should call findById with correct ID', async () => {
        const mockFindById = jest
            .spyOn(UserModel, 'findById')
            .mockResolvedValue({
                name: 'Test User',
                email: 'testuser@example.com',
                password: 'password',
                userGroups: ['admin'],
                createdAt: new Date(),
                updatedAt: new Date(),
            });

        const userId = 'mockedUserId';

        const user = await UserModel.findById(userId);

        expect(mockFindById).toHaveBeenCalledWith(userId);
        expect(mockFindById).toHaveBeenCalledTimes(1);
        expect(user?.email).toBe('testuser@example.com');
    });

    it('Should call findByIdAndUpdate with correct ID and data', async () => {
        const mockFindByIdAndUpdate = jest
            .spyOn(UserModel, 'findByIdAndUpdate')
            .mockResolvedValue({
                name: 'Updated User',
                email: 'updateduser@example.com',
                password: 'newpassword',
                userGroups: ['user'],
                createdAt: new Date(),
                updatedAt: new Date(),
            });

        const userId = 'mockedUserId';
        const updateData = {
            name: 'Updated User',
            email: 'updateduser@example.com',
        };

        const updatedUser = await UserModel.findByIdAndUpdate(
            userId,
            updateData,
            { new: true }
        );

        expect(mockFindByIdAndUpdate).toHaveBeenCalledWith(userId, updateData, {
            new: true,
        });
        expect(mockFindByIdAndUpdate).toHaveBeenCalledTimes(1);
        expect(updatedUser?.name).toBe('Updated User');
    });

    it('Should call findByIdAndDelete with correct ID', async () => {
        const mockFindByIdAndDelete = jest
            .spyOn(UserModel, 'findByIdAndDelete')
            .mockResolvedValue({
                name: 'Deleted User',
                email: 'deleteduser@example.com',
                password: 'password',
                userGroups: ['admin'],
                createdAt: new Date(),
                updatedAt: new Date(),
            });

        const userId = 'mockedUserId';

        const deletedUser = await UserModel.findByIdAndDelete(userId);

        expect(mockFindByIdAndDelete).toHaveBeenCalledWith(userId);
        expect(mockFindByIdAndDelete).toHaveBeenCalledTimes(1);
        expect(deletedUser?.email).toBe('deleteduser@example.com');
    });
});
