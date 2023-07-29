import { connect } from "mongoose";

export const ConnectMongo=async()=>{
    try {
        await connect("mongodb://127.0.0.1:27017/newCrud");
        console.log("connected...");
    } catch (err) {
        console.log("Unable to connect to Mongodb");
        process.exit(1);
    }
}