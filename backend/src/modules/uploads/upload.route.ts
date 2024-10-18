import express from 'express';
import { uploadController } from './upload.controller';

const router = express.Router();

router.post('/', uploadController);

export default router;
