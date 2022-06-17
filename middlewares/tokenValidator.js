export async function validateToken( req, res, next) {
    const authorization = req.headers.authorization;
    const token = authorization?.replace('Bearer ', "");

    if(!token) {
        return res.send(401).status("no toke.");
    }

    try{
        const {rows:sessions} = db.query(`SELECT * FROM sessions WHERE token = $1`, [token]);
        const [session] = sessions;
        if(!session) {
            return res.status(401).send("session not found");
        }

        const {rows:users} = db.query(`SELECT * FROM users WHERE id = $1`, [id]);
        const [user] = users;

        if(!user) {
            return res.status(401).send("user not found")
        }

        res.locals.user = user;
        next();
    }catch(error) {
        res.sendStatus(500);
    }
}