const jwt = require('jsonwebtoken');


const protect = (req,res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;

    if (!authHeader?.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'unauthorized!' })
    }

    const token = authHeader.split(' ')[1]

    // console.log(process.env.ACCESS_SECRET);

    jwt.verify(
        token,
        process.env.ACCESS_SECRET,
        (err, decoded) => {
            if (err) return res.status(403).json({ message: 'Forbidden!1' });
            req.userId = decoded.userId
            req.user = decoded.username
            req.email = decoded.email
            next()
        }
    )
}

module.exports = protect