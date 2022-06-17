import db from "../config/db.js";

export async function getUserId (req, res) {
    const {id} = req.params;
    const {user} = res.locals;

    if(id !== user.id) {
        return res.sendStatus(401);
    }

    try{
        const visitResult = await db.query(`SELECT SUM(U.'visitCount') FROM urls u WHERE U.'userId'=$1`, [user.id]);
        const {visitCount} = visitResult.rows;

        const urlsResult = await db.query(`SELECT * FROM urls WHERE urls.'userId'=$1`,[user.id]);
        const userUrls = urlsResult.rows;

        res.send({
            id: user.id,
            name: user.name,
            visitCount: visitCount.sum || 0,
            shortenedUrls: userUrls
        })  
    }catch(error){
        console.log(error);
        res.sendStatus(500);
    }
}

export async function getRanking(req,res) {

    const urlsByUser = db.query(`SELECT usr.id, usr.name, COUNT(u.id) AS 'linksCount', SUM(u.'visitCOunt') AS 'visitCount'
    FROM urls u
    JOIN users usr ON u.'userId'=user.id
    GROUP BY usr.id
    ORDER BY 'visitCount' DESC
    LIMIT 10`);

    res.send(urlsByUser.rows);
}