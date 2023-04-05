import mongoose from "mongoose";

const url =
"mongodb+srv://ritesh:riteshkumar@cluster0.wx0ngt6.mongodb.net/?retryWrites=true&w=majority"
   
;

export async function connection() {
  await mongoose
    .connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Connected to MongoDb");
    })
    .catch((err) => {
      console.error(err);
    });
}
