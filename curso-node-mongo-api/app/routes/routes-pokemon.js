const ctrl = require('../controllers/controller-pokemon');
module.exports = (app) => {

    var verifyJwt = (req,res,next)=>{
        var token = req.headers['x-access-token'];
        if(!token){ return res.status(401).send({auth:false,message:'Token não fornecido!'})}

        var jwt = req.app.locals.jwt;
        jwt.verify(token,process.env.SECRET,(err,decoded)=>{
            if(err){ return res.status(500).send({auth:false,message:'Falha na Autenticação!'})}
            req.userId = decoded.id; //(payload = id) foi indicado no método sign do login jwt.sign(payload, secretOrPrivateKey, [options, callback])
            next();
        })
    }

    app.get('/pokemon/pagination/:skip/:limit',verifyJwt,(req,res,next)=>{
        const collection = req.app.locals.collection;
        ctrl(collection).getPaginationPokemons(parseInt(req.params.skip),parseInt(req.params.limit)).then((result)=>{
            res.status(200).json(result);
            next();
        }).catch((error) => console.log(`[error]:${new Date()} : ${err}`));
    });

    app.get('/pokemon/:id',verifyJwt,(req,res,next)=>{
        const collection = req.app.locals.collection;
        ctrl(collection).getOnePokemon({'id': req.params.id}).then((result)=>{
            res.status(200).json(result);
            next();
        }).catch((error) => console.log(`[error]:${new Date()} : ${err}`));
    });

    // app.post('/pokemon/where',(req,res,next)=>{
    //     const collection = req.app.locals.collection;
    //     ctrl(collection).getOnePokemon(parseInt(req.params.id)).then(result=>{
    //         res.status(200).json(result);
    //         next();
    //     }).catch(error => console.log(`[error]:${new Date()} : ${err}`));
    // });
}