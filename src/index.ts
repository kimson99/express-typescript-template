import * as http from 'http';
import * as dotenv from 'dotenv';
import app from './app';
import logger from './utils/logger';
import path from 'path';
dotenv.config({ path: path.join(__dirname, '../.env')});

const PORT = process.env.PORT || '8080';

http.createServer(app).listen(PORT, () => {
  logger.info(`Server starting on ${PORT}`);
});
