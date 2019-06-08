module.exports = (app)=>{
    app.post('/login',(req,res,next)=>{
        if(req.body.user === 'andre' && req.body.pwd === "260215"){
            const jwt = req.app.locals.jwt;
            const id = 1;
            
            const token = jwt.sign({id},process.env.SECRET,{
                expiresIn: 300
            });
    
            res.status(200).send({auth:true,token:token});
            next();
        } else {
            res.status(500).send("Login invalido");
        }
    })
}
//jwt.sign(payload, secretOrPrivateKey, [options, callback])
// type return 
//(Asynchronous) If a callback is supplied, the callback is called with the err or the JWT.
//(Synchronous) Returns the JsonWebToken as string
//payload: could be an object literal, buffer or string representing valid JSON.
//secretOrPrivateKey (process.env.SECRET) is a string, buffer, or object containing either the secret for HMAC algorithms or the PEM encoded private key for RSA and ECDSA.
//options: expiresIn: expressed in seconds or a string describing a time span zeit/ms.