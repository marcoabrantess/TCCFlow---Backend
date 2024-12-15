import { Router } from 'express';
import {
    createTCC,
    deleteTCC,
    getAllTCCs,
    getTCC,
    updateTCC,
} from '../../application/controllers/TCCController';
import multer from 'multer';

export const tccRoutes = Router();

const upload = multer({ dest: 'uploads/' });

tccRoutes.post('/tcc', upload.none(), createTCC);
tccRoutes.post('/tcc/:id', upload.none(), updateTCC);

tccRoutes.get('/tcc/:id', getTCC);
tccRoutes.get('/tcc', getAllTCCs);

tccRoutes.delete('/tcc/:id', deleteTCC);
