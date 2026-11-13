import path from 'path';
import fs from 'fs';
import multer from 'multer';
import crypto from 'crypto';

const ALLOWED_MIME = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/gif']);
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

export const UPLOADS_DIR = path.join(process.cwd(), 'uploads');

function ensureUploadsDir(): void {
  if (!fs.existsSync(UPLOADS_DIR)) {
    fs.mkdirSync(UPLOADS_DIR, { recursive: true });
  }
}

function safeFilename(mime: string): string {
  const ext = mime.substring(mime.indexOf('/') + 1);
  return `${Date.now()}-${crypto.randomBytes(8).toString('hex')}.${ext}`;
}

export const uploadImage = multer({
  storage: multer.diskStorage({
    destination: (_req, _file, cb) => {
      ensureUploadsDir();
      cb(null, UPLOADS_DIR);
    },
    filename: (_req, file, cb) => {
      cb(null, safeFilename(file.mimetype));
    },
  }),
  limits: { fileSize: MAX_FILE_SIZE, files: 1 },
  fileFilter: (_req, file, cb) => {
    if (ALLOWED_MIME.has(file.mimetype)) {
      cb(null, true);
    } else {
      const err = new multer.MulterError('LIMIT_UNEXPECTED_FILE', file.fieldname);
      err.message = 'Only image files are allowed (JPEG, PNG, WEBP, GIF).';
      cb(err);
    }
  },
});