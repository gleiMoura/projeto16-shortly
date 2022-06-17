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
    
}

export async function deleteURL(req,res) {
    
}

export async function openShortURL(req,res) {
    
}