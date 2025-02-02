const jwt = require('jsonwebtoken');
const jwtAutMiddleware = (req,res,next)=>{

    const authorization = req.headers.authorization
    if(!authorization) return res.status(401).json({error: 'Token not found'})
    //extract the jwt token from the request header

    const token = req.headers.authorization.split(' ')[1];
    if(!token) return res.status(401).json({ error: 'Unauthorized'});
    try{
        //Verify jwt token
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        //Attach user info to the req object
        req.user = decoded
        next();
    }catch(err){
        console.error(err);
        res.status(401).json({error: 'Invalid token'});
    }
}

//Function to generate token

const generateToken=(userData)=>{
    return jwt.sign(userData,process.env.JWT_SECRET);
}

module.exports = {jwtAutMiddleware,generateToken}