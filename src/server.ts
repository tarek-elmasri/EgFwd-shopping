import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";

const app: express.Application = express();

dotenv.config();

const PORT = process.env.PORT || 3000;
const address: string = `localhost:${PORT}`;
const corsConfigurations = {
  origin: "127.0.0.1",
};

app.use(cors(corsConfigurations));
app.use(bodyParser.json());

app.get("/", function (req: Request, res: Response) {
  res.send("Hello World!");
});

app.listen(PORT, function () {
  console.log(`starting app on: ${address}`);
});
