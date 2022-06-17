import { nanoid } from "nanoid";
import db from "../config/db.js";

export async function shortenURL(req,res) {
    const {id} = res.locals.user;
    const {url} = req.body;

    const numberCarac = 8;
    const shortURL = nanoid(numberCarac);

    try{
        await db.query(`INSERT INTO urls (url, "shortUrl, "userId) 
        VALUES ($1,$2,$3)`, [url, shortURL, id]);

        res.status(201).send(shortURL)
    } catch{
        res.sendStatus(500);
    }
}

export async function getURLById(req,res) {
    const {id} = req.params;

    try{
        const thisUrl = db.query(`SELECT * FORM urls WHERE id=$1`, [id]);
        if(!thisUrl.rowCount === 0) {
            res.sendStatus(404)
        }

        const {url} = thisUrl.rows;
        delete url.visitCount;
        delete url.userId;

        res.send(url);
    }catch (error){
        console.log(error)
        return res.sendStatus(500);
    }
}

export async function deleteURL(req,res) {
    
}

export async function openShortURL(req,res) {
    
}