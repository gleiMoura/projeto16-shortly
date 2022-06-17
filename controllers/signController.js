import bcrypt from "bcrypt";
import chalk from "chalk";
import db from "../config/db.js";
import uuid from "uuid";

export async function doSignup(req, res) {
    const user = req.body;
    try {
        const validEmail = await db.query(`SELECT * FROM users WHERE email = $1`, [user.email]);
        if (validEmail.rowCount > 0) {
            return res.sendStatus(409)
        }

        const { name, email, password } = user;

        const number = 10;
        const cryptPassword = bcrypt.hashSync(password, number);

        await db.query(`
            INSERT INTO users (name, email, password)
            VALUES ($1,$2,$3)`,
            [name, email, cryptPassword])

        res.sendStatus(201);

    } catch (error) {
        console.log(chalk.red("something wrong in signController, error: " + error));
        res.sendStatus(500);
    }
}

export async function doSignin(req, res) {
    const { email, password } = req.body;

    try {
        const { rows: users } = await db.query(`SELECT * FROM users WHERE email = $1`, [email]);
        const [user] = users;

        if (!user) {
            return res.sendStatus(401);
        }

        if (bcrypt.compareSync(password, user.password)) {
            const token = uuid();

            await db.query(`INSERT INTO sessions (token, 'userId)
        VALUES ($1, $2, $3)`,
                [token, user.id])

            return res.send(token);
        }
    } catch (error) {
        console.log(`there is something wrong in signController, ${error}`);
        res.sendStatus(500);
    }

}
