import app from "./app.js";
import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

const PORT = process.env.PORT ?? 4000

const envErrors = [];

if (!process.env.COOKIE) {
    envErrors.push("COOKIE: add your linkedin cookie, format: `li_at=<li_at>; JSESSIONID=<JSESSIONID>`");
}
if (!process.env.CSRF) {
    envErrors.push("CSRF: add your JSESSIONID from linkedin");
}
if (!process.env.MONGO_URI) {
    envErrors.push("MONGO_URI");
}

if (envErrors.length > 0) {
    console.log("Please set Following Environment Variables");
    envErrors.forEach(error => {
        console.log(error);
    })
} else {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("connected to database");
        app.listen(PORT, () => {
            console.log(`Listening on port ${PORT}`);
        });
    } catch (error) {
        console.log(error);
    }
}


