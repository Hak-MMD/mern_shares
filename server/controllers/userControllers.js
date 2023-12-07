const UserModel = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


const register = async (req, res) => {
    const { email, username, password } = req.body;
        // console.log('here');


    try {
        if (!username || !email || !password) {
            return res.status(400).json({ message: "Please provide all values" });
        }
        const userExists = await UserModel.findOne({ email });

        if (userExists) {
            return res.status(400).json({ message: 'User already exist! Try with another email!' });
        }

        const salt = await bcrypt.genSalt(7);
        const hashedPass = await bcrypt.hash(password, salt);
        let aToken = process.env.ACCESS_SECRET

        aToken.toString();
        const accessToken = jwt.sign({
            "username": username,
            "email": email,
        }, aToken, { expiresIn: '15m' });

        const refreshToken = jwt.sign({
            "username": username,
            "email": email
        }, process.env.REFRESH_SECRET, { expiresIn: '7d' });

        res.cookie('jwt', refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'None',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        const user = await UserModel.create({ username, email, password: hashedPass });

        res.json({ accessToken, user });

    } catch (error) {
        console.log(error);
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return res.status(400).json({ message: "Please provide all values" });
        }

        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: 'User does not exist! Try with another email!' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
            const accessToken = jwt.sign({
                "userId": user._id,
                "username": user.username,
                "email": user.email
            }, process.env.ACCESS_SECRET, { expiresIn: '15m' });

            const refreshToken = jwt.sign({
                "userId": user._id,
                "username": user.username,
                "email": user.email
            }, process.env.REFRESH_SECRET, { expiresIn: '7d' });

            res.cookie('jwt', refreshToken, {
                httpOnly: true,
                secure: true,
                sameSite: 'None',
                maxAge: 7 * 24 * 60 * 60 * 1000
            });

            res.json({ accessToken, user });
        } else {
            return res.status(400).json({ message: 'Invalid credentials!' });
        }
    } catch (error) {
        console.log(error);
    }
};

const getMe = async (req,res) => {
    try {
        const user = await UserModel.findOne({ email: req.email });

        if (!user) {
            return res.status(403).json({ message: 'UnAuthorized, Forbidden!' });
        }

        res.status(200).json(user);
    } catch (error) {
        console.log(error);
    }
};

const refresh = async (req, res) => {
    const cookies = req.cookies

    try {
        if (!cookies?.jwt) {
            return res.status(401).json({ message: 'Unauthorized!' });
        }

        const refreshToken = cookies.jwt;
        
        jwt.verify(refreshToken, process.env.REFRESH_SECRET, async (err, decoded) => {
            try {
                if (err) return res.status(403).json({ message: 'Forbidden' });

                const user = await UserModel.findOne({ email: decoded.email }).exec();

                if (!user) return res.status(401).json({ message: 'UnAuthorized' });

                const accessToken = jwt.sign({
                    "userId": user._id,
                    "username": user.username,
                    "email": user.email
                }, process.env.ACCESS_SECRET, { expiresIn: '15m' });

                res.json({ accessToken });

            } catch (error) {
                console.log(error);
            }
         
        });
    } catch (error) {
        console.log(error);
    }
};

const logout = async (req, res) => {
    const cookies = req.cookies;
    console.log('logout ', cookies)

    try {
        if (!cookies?.jwt) return res.sendStatus(204); 

        res.clearCookie('jwt', { httpOnly: true, secure: true, sameSite: 'None'  });

        res.json({ message: 'Cookie cleared!' });
    } catch (error) {
        console.log(error);
    }
};

const deleteUser = async (req, res) => {
    const id = req.params.id;
    try {
        await UserModel.findByIdAndDelete(id);

        res.json({ message: 'User Deleted!' })
    } catch (error) {
        console.log(error);
    }
};

// const root = (req,res) => {
//     try {
//         res.json({ message: 'root' })
//     } catch (error) {
//         console.log(error);
//     }
// };

module.exports = {
    login, logout, refresh, register, deleteUser, getMe
}