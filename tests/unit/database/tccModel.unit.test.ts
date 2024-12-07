import { TCCModel } from '../../../src/infrastructure/database/models/TCCModel';

jest.mock('../../../src/infrastructure/database/models/TCCModel');

describe('TCCModel Unit Test', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('Should call create method with correct data', async () => {
        const mockCreate = jest.spyOn(TCCModel, 'create').mockResolvedValue({
            title: 'Test TCC',
            authorId: 'mockedAuthorId',
            contentPath: 'uploads/test-tcc.pdf',
            createdAt: new Date(),
            updatedAt: new Date(),
        } as any);

        const tccData = {
            title: 'Test TCC',
            authorId: 'mockedAuthorId',
            contentPath: 'uploads/test-tcc.pdf',
        };

        await TCCModel.create(tccData);

        expect(mockCreate).toHaveBeenCalledWith(tccData);
        expect(mockCreate).toHaveBeenCalledTimes(1);
    });

    it('Should call findById with correct ID', async () => {
        const mockFindById = jest
            .spyOn(TCCModel, 'findById')
            .mockResolvedValue({
                title: 'Test TCC',
                authorId: 'mockedAuthorId',
                contentPath: 'uploads/test-tcc.pdf',
                createdAt: new Date(),
                updatedAt: new Date(),
            });

        const tccId = 'mockedTCCId';

        const tcc = await TCCModel.findById(tccId);

        expect(mockFindById).toHaveBeenCalledWith(tccId);
        expect(mockFindById).toHaveBeenCalledTimes(1);
        expect(tcc?.title).toBe('Test TCC');
    });

    it('Should call findByIdAndUpdate with correct ID and data', async () => {
        const mockFindByIdAndUpdate = jest
            .spyOn(TCCModel, 'findByIdAndUpdate')
            .mockResolvedValue({
                title: 'Updated TCC',
                authorId: 'mockedAuthorId',
                contentPath: 'uploads/updated-tcc.pdf',
                createdAt: new Date(),
                updatedAt: new Date(),
            });

        const tccId = 'mockedTCCId';
        const updateData = {
            title: 'Updated TCC',
            contentPath: 'uploads/updated-tcc.pdf',
        };

        const updatedTCC = await TCCModel.findByIdAndUpdate(tccId, updateData, {
            new: true,
        });

        expect(mockFindByIdAndUpdate).toHaveBeenCalledWith(tccId, updateData, {
            new: true,
        });
        expect(mockFindByIdAndUpdate).toHaveBeenCalledTimes(1);
        expect(updatedTCC?.title).toBe('Updated TCC');
    });

    it('Should call findByIdAndDelete with correct ID', async () => {
        const mockFindByIdAndDelete = jest
            .spyOn(TCCModel, 'findByIdAndDelete')
            .mockResolvedValue({
                title: 'Deleted TCC',
                authorId: 'mockedAuthorId',
                contentPath: 'uploads/deleted-tcc.pdf',
                createdAt: new Date(),
                updatedAt: new Date(),
            });

        const tccId = 'mockedTCCId';

        const deletedTCC = await TCCModel.findByIdAndDelete(tccId);

        expect(mockFindByIdAndDelete).toHaveBeenCalledWith(tccId);
        expect(mockFindByIdAndDelete).toHaveBeenCalledTimes(1);
        expect(deletedTCC?.title).toBe('Deleted TCC');
    });
});
