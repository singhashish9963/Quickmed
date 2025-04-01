import mongoose from "mongoose";
const ConnectDB = async () => {
    mongoose.connection.on("connected", () => {
        console.log("MongoDB connected")
    })
    await mongoose.connect(`${process.env.MONGODB_URL}/quickmed` )
}
export default ConnectDB;