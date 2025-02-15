const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    //get the token
    //verify the token
    //get the user out of the token
    console.log(req.headers.authorization);
    try{
        const token = req.headers.authorization.split(" ")[1];
        const verifiedToken = jwt.verify(token, "BMS-login");
        req.body.userId = verifiedToken.userId;
        console.log(verifiedToken);
        next();
    }catch(error) {
        res.status(401).send({success: false, message: "Token Invalid"});
        console.log(error);
    }
}