import express, { Request, Response } from 'express';
import featuresRoutes from './features-routes';
import indexRoutes from './index.routes';
import { errorHandler } from './infrastructure/middleware/error-handler';
import bodyParser from 'body-parser';
import cors from 'cors';
const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.get('/test-error', (req, res, next) => {
  const error = { message: 'Test error raised without breaking application' };
  next(error);
});

app.post('/login', (req: Request, res: Response) => {
  console.log("good morning");
  const { email, password } = req.body;
  if (email === 'admin@example.com' && password === 'password') {
    res.status(200).json({ message: 'Login successful!', token: 'dummy-token' });
  } else {
    res.status(401).json({ message: 'Invalid email or password.' });
  }
});

app.use(featuresRoutes);
app.use('/', indexRoutes);

app.use(errorHandler);

export default app;
