import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import UserStore from './models/user';

const app: express.Application = express();

const PORT = process.env.PORT || 3000;

const address: string = `localhost:${PORT}`;
const corsConfigurations = {
  origin: '127.0.0.1',
};

app.use(cors(corsConfigurations));
app.use(bodyParser.json());

app.get('/', async (req: Request, res: Response) => {
  res.send('Hello World');
});

app.listen(PORT, function () {
  console.log(`starting app on: ${address}`);
});
