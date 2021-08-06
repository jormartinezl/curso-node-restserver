const jwt = require('jsonwebtoken')

const generaJWT=(uuid='')=>{

    return new Promise ((resolve, reject) => {

        const payload=  {uuid};

        jwt.sign(payload,process.env.SECRETTOPRIVATEKEY,{
            expiresIn: '4h'
        },(err,token)=>{
            if(err){
                console.log(err);
                reject('No se pudo generar jwt')
            }else{
                resolve(token)
            }
        })
    })
}

module.exports={
    generaJWT
}