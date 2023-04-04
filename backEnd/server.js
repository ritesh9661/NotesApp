const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = 8003;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
mongoose.connect(
    "mongodb+srv://ritesh:riteshkumar@cluster0.wx0ngt6.mongodb.net/?retryWrites=true&w=majority",
    {
        useNewUrlParser : true,
        useUnifiedTopology:true
    },
    (err) => {
        if(err) {
            console.log(err)
        } else {
            console.log("database connected");
        }
    }
)

const data = require('./routes/note'); 
app.use('/notes',data);

app.listen(PORT,()=>{
console.log(`Server is running on ${PORT}`)
});

module.exports=app;