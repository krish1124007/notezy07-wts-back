import mongoose from "mongoose"


async function connectDB()
{
    try {
        const connect = await mongoose.connect(process.env.MONGO_URL);
        console.log('database connect successfully');
        return connect
    } catch (error) {
        console.log('error is occuse while connect database');
    }
}

export { connectDB }