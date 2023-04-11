import mongoose from "mongoose";
import {data} from './config.js'
const url = `mongodb+srv://${data.name}:${data.password}@${data.cluster}.mongodb.net/?retryWrites=true&w=majority`;

export async function connection() {
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