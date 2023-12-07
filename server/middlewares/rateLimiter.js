const rateLimiter = require('express-rate-limit');


const apiLimiter = rateLimiter({
    windowMs: 60 * 1000,
    max: 5,
    message: { message: 'Too many request. Try again in a minute!'},
    handler: (req, res, next, options) => {
        console.log('rate limiter')
        res.status(403).json({ message: 'Too many request. Try again in a minute!' })
        // next();
    },
    standardHeaders: true,
    legacyHeaders: false,
});

module.exports = apiLimiter;