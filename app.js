import express from "express";
import config from "config";
import ("./util/dbconnect.js");
import router from "./controllers/hotelController.js";

const app = express();
const PORT = config.get("PORT");
app.use(express.json());

app.get("/", (req,res)=>{
    try {
        res.status(200).json({message:"Hello connected"});
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"not connected"});
    }
});

app.use("/hotels",router);

app.use((req,res)=>{
    res.send("Not found ")
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });