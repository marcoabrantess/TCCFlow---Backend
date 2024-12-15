import { Request, Response } from 'express';
import { TCCService } from '../../domain/services/TCCService';
import { TCCFactory } from '../../domain/factories/TCCFactory';
import { TCCRepository } from '../../domain/repositories/TCCRepository';
import fs from 'fs';
import path from 'path';

interface CreateTCCRequestBody {
    title: string;
    authorName: string;
    advisorName: string;
    coadvisorName?: string;
    file: string;
}

const tccFactory = new TCCFactory();
const tccRepository = new TCCRepository(tccFactory);
const tccService = new TCCService(tccRepository);

const UPLOAD_DIR = path.join(__dirname, '../../../uploads');

export const createTCC = async (
    req: Request<object, object, CreateTCCRequestBody>,
    res: Response
): Promise<void> => {
    try {
        const { title, authorName, advisorName, coadvisorName, file } =
            req.body;

        if (!file) {
            throw new Error('File is required.');
        }

        const matches = file.match(/^data:(.+);base64,(.+)$/);
        if (!matches) {
            throw new Error('Invalid Base64 file format.');
        }

        const fileType = matches[1];
        const base64Data = matches[2];
        const fileExtension = fileType.split('/')[1];
        const fileName = `${title.replace(
            /\s+/g,
            '_'
        )}_${Date.now()}.${fileExtension}`;
        const filePath = path.join(UPLOAD_DIR, fileName);

        if (!fs.existsSync(UPLOAD_DIR)) {
            fs.mkdirSync(UPLOAD_DIR, { recursive: true });
        }

        fs.writeFileSync(filePath, base64Data, { encoding: 'base64' });

        const contentPath = `/uploads/${fileName}`;

        const tcc = await tccService.create({
            title,
            authorName,
            advisorName,
            coadvisorName,
            contentPath,
        });

        res.status(201).json(tcc);
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: 'An error occurred while creating the TCC',
            error: err instanceof Error ? err.message : 'Unknown error',
        });
    }
};

export const getTCC = async (req: Request<{ id: string }>, res: Response) => {
    try {
        const tccId = req.params.id;
        const tcc = await tccService.findById(tccId);

        res.status(200).json({
            data: tcc,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: 'An error occurred while fetching the TCC',
            error: err instanceof Error ? err.message : 'Unknown error',
        });
    }
};

export const getAllTCCs = async (req: Request, res: Response) => {
    try {
        const allTCCS = await tccService.getAll();

        res.status(200).json({
            data: allTCCS,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: 'An error occurred while fetching all TCCs',
            error: err instanceof Error ? err.message : 'Unknown error',
        });
    }
};

export const updateTCC = async (
    req: Request<{ id: string }>,
    res: Response
) => {
    try {
        const tccId = req.params.id;
        const tccData = req.body;

        const updatedTCC = await tccService.update(tccId, tccData);

        res.status(200).json({
            message: 'TCC updated successfully',
            data: updatedTCC,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: 'An error occurred while updating the TCC',
            error: err instanceof Error ? err.message : 'Unknown error',
        });
    }
};

export const deleteTCC = async (
    req: Request<{ id: string }>,
    res: Response
) => {
    try {
        const tccId = req.params.id;

        await tccService.delete(tccId);

        res.status(204).json({
            message: 'TCC deleted successfully',
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: 'An error occurred while deleting the TCC',
            error: err instanceof Error ? err.message : 'Unknown error',
        });
    }
};
