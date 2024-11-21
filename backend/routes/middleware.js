const jwt = require("jsonwebtoken");
const JWT_PASSWORD = "purvanchal"

function Middleware(req, res, next) {
    const authHeader = req.headers.authorization;
    console.log("Headers received:", req.headers); // Log all headers
    console.log("Authorization Header:", authHeader); // Log the Authorization header

    if (!authHeader || !authHeader.startsWith("Bearer")) {
        return res.status(403).json({ msg: "Invalid token 1" });
    }

    const token = authHeader.split(" ")[1];
    console.log("Extracted Token:", token);

    jwt.verify(token, JWT_PASSWORD, function (err, decoded) {
        if (err) {
            console.error("JWT Verification Error:", err.message);
            return res.status(403).json({ msg: "Invalid token 2" });
        }
        req.user_id = decoded.user_id;
        console.log("JWT Decoded Successfully:", decoded);
        next();
    });
}


module.exports = Middleware;