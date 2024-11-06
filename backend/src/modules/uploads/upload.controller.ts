import { NextFunction, Request, Response } from 'express';
import { upload } from '../../middleware/multer.middleware';
import { MulterError } from 'multer';
import path from 'path'; // Import path for handling file paths
import FileUpload from './upload.model';

export const uploadController = async (req: Request, res: Response, next: NextFunction) => {
  upload.single('image')(req, res, async (err) => {
    if (err instanceof MulterError) {
      return res.status(400).json({ message: err.message });
    } else if (err) {
      return res.status(500).json({ message: err.message });
    }

    try {
      if (!req.file) {
        return res.status(400).send('No file uploaded');
      }

      const file = req.file;

      // Get the relative path from 'public/uploads'
      const relativeFilePath = path.relative('public', file.path);

      const newFile = await FileUpload.create({
        filename: file.filename,
        filepath: `/${relativeFilePath}`, // Save the path relative to 'public'
      });

      return res.send({
        message: 'File uploaded successfully',
        file: {
          id: newFile.id,
          filename: newFile.filename,
          filepath: newFile.filepath, // The path stored will be relative
        },
      });
    } catch (error) {
      console.error(error);
      return res.status(500).send('An error occurred while uploading the file.');
    }
  });
};
