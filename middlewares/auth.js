const { verifyToken } = require("../utils/jwt");
const { User } = require("../models");

const authentication = async (req, res, next) => {
    try {
        const authHeader = req.headers["authorization"];

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            throw {
                code: 401,
                message: "Bearer token not provided!"
            };
        }

      
        const token = authHeader.split(" ")[1];

        const decoded = verifyToken(token);

        const userData = await User.findOne({
            where: {
                id: decoded.id,
                email: decoded.email,
            }
        });

        if (!userData) {
            throw {
                code: 401,
                message: "User not found"
            };
        }

       
        req.UserData = {
            id: userData.id,
            email: userData.email,
            username: userData.username,
        };

        next();
    } catch (error) {
        console.log(error);
        res.status(error.code || 500).json({
            statusCode: error.code || 500,
            error: error.message || "Internal Server Error"
        });
    }
};

const authorization = async (req, res, next) => {
    try {

        const userData = await User.findOne({
            where: {
                id: req.UserData.id,
                email: req.UserData.email
            },
            attributes: ['alamat'] 
        });
        if (!userData.alamat) {
            throw {
                code: 403,
                message: "Akses Ditolak: alamat user tidak tersedia"
            };
        }

        next();
    } catch (error) {
        console.log(error);
        res.status(error.code || 500).json({
            statusCode: error.code || 500,
            error: error.message || "Internal Server Error"
        });
    }
};
module.exports = {authentication,authorization};
