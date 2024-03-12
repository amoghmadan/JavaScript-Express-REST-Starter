import path from 'path';

import 'dotenv/config';

export const BASE_DIR = path.dirname(__dirname);

export const DATABASE_URL = process.env.DATABASE_URL;
