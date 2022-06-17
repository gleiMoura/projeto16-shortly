import express,{json} from "express";
import chalk from "chalk";
import dotenv from "dotenv";
import db from "./config/db.js"
console.log(db)
dotenv.config();

const app = express();

app.use(json());

const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log(chalk.green(`Mode: ${process.env.MODE}`));
    console.log(chalk.green(`Server is working in port ${port}`));
})

