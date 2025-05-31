import mongoose from "mongoose"


async function connectDB()
{
    try {
        const connect = await mongoose.connect('mongodb://localhost:27017/');
        console.log('database connect successfully');
        return connect
    } catch (error) {
        console.log('error is occuse while connect database');
    }
}

export { connectDB }