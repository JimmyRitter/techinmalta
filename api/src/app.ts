import cors from "cors";
// import dotenv from "dotenv";
import express from "express";
import { ProfileRoute, AuthRoute } from "./routes";
import { VerifyToken } from "./middlewares/VerifyToken";

// configuring dotenv to access private API key
// dotenv.config();

const server = express();
server.use(cors());
server.use(express.json());
server.use(VerifyToken);

// configure services routes
server.use('/profile', ProfileRoute);
server.use('/auth', AuthRoute);

// backend should not be initiated without Exchange Rates API key properly defined
// if (!process.env.EXCHANGE_RATES_API_KEY) {
//   throw Error("Exchange Rates API Key must be specified within the environment file.");
// }

const port = process.env.PORT || 3001;
server.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});