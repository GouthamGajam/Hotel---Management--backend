import mongoose from "mongoose";
import config from "config";

let connectDB = async ()=>{
    try {
        let myurl = config.get("DB_URL");
        console.log(myurl)
        await mongoose.connect(config.get("DB_URL"))
        console.log(`DB connected successfully`)
    } catch (error) {
        console.log(error);
    }
}
connectDB()