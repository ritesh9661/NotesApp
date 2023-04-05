import express from "express";
import cors from "cors";
import routes from "./routes/routes.mjs";
import { connection } from "./db/conf.mjs";

const app = express();

const PORT = 8002;

// parse json request body
app.use(express.json());
app.use(cors());

app.use("/", routes);

app.listen(PORT, () => {
  console.log(`Listening in ${PORT}`);
});

connection();
