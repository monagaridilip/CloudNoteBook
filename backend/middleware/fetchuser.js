const jwt = require('jsonwebtoken');
const privateKey = 'secreatkey';

const fetchuser = (req,res,next) =>{
    
        //Get the user from jwt token and add id to the req object
        const token = req.header('auth-token')
        if(!token){
            res.status(401).send("Please authenticate with valid token")
        }
        try {
            const data = jwt.verify(token,privateKey)
            req.user=data.user
            next();
            
            
        } catch (error) {
            res.status(401).send("Please authenticate with valid token")
            
        }
    
}

module.exports = fetchuser;