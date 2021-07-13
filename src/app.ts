import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

const app = express();
app.use(helmet());
app.use(express.json());
app.use(cors());

app.use('*', (req, res) => {
  return res.status(404).json({
    message: 'Not Found'
  });
});

export default app;