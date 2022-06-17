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
    const {id} = req.params;
    const {user} = res.locals;

    try{
        const thisUrl = db.query(`SELECT * FORM urls WHERE id=$1`, [id]);
        if(!thisUrl.rowCount === 0) {
            res.sendStatus(404)
        }

        const {url} = thisUrl.rows;
        if(url.userId !== user.id) {
            return res.sendStatus(401);
        }

        await db.query(`DELETE FROM urls WHERE id=$1`, [id]);
        res.sendStatus(401);
    }catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export async function openShortURL(req,res) {
    const {shortUrl} = req.params;
    try{
        const thisUrl = db.query(`SELECT * FROM urls WHERE 'shortUrl'=$1`, [shortUrl]);
        if(!thisUrl) {
            return res.sendStatus(404);
        }
        const {url} = thisUrl.rows;

        await db.query(`UPDATE urls SET 'visitCount'='visitCount'+1 WHERE id=$1`, [url.id]);

        res.redirect(url.url);

    }catch(error){
        console.log(error);
        res.sendStatus(500);
    }   
}