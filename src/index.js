import { app } from "./app.js";
import { connectDB } from "./db/index.js";



connectDB().then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log("Server running on the port 8000");
    })
}).catch((e)=>{
    console.log(e);
})

