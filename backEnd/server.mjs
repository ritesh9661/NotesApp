import express from "express";
import cors from "cors";
import routes from "./routes/routes.mjs";
import mongoose from "mongoose";

const app = express();
const url ="mongodb+srv://ritesh:riteshkumar@cluster0.wx0ngt6.mongodb.net/?retryWrites=true&w=majority";
const PORT = 8002;

app.use(express.json());
app.use(cors());
app.use("/", routes);

app.listen(PORT, () => {
  console.log(`Listening in ${PORT}`);
});

async function connection() {
  await mongoose
    .connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Connected!");
    })
    .catch((err) => {
      console.error(err);
    });
}

connection();
