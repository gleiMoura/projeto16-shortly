import express,{json} from "express";
import chalk from "chalk";
import cors from "cors"
import router from "./routes/index.js"
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(json());
app.use(cors())
app.use(router())

const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log(chalk.green(`Mode: ${process.env.MODE}`));
    console.log(chalk.green(`Server is working in port ${port}`));
})

