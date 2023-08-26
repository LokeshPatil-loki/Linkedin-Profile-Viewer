import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { getUserHandle } from "./utils.js";
import { NotFoundError } from "./errors/NotFoundError.js";
import { BadRequestError } from "./errors/BadRequestError.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { CustomError } from "./errors/CustomError.js";
import { profileRoutes } from "./routes/profileRoutes.js";

dotenv.config();

const PORT = 4000;
const app = express();
app.use(express.json());
app.use(cors());

app.use(profileRoutes);

app.all("*", (req, res,next) => {
    try {
        throw new NotFoundError();
    } catch (error) {
        next(error);
    }
});

app.use(errorHandler);



app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
});






