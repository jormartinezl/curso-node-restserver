const { response } = require('express');
const jwt = require('jsonwebtoken');
const Usuario= require('../models/usuario');

const validarJWT =async(req,res=response,next)=>{
    const token= req.header('Authorization');
    if(!token){
        return res.status(400).json({
            msg: 'No hay token en la peticion'
        });
    }
    
    try {
        //verifica jsw
        const {uuid}=jwt.verify(token,process.env.SECRETTOPRIVATEKEY);
        
        //leer usuario y pasarlo al request
        const usuario=await Usuario.findById(uuid);

        if(!usuario){
            return res.status(401).json({
                msg: 'Usuario no existe'
            })
        }

        //verificar uuid estado true
        if(!usuario.state){
            return res.status(401).json({
                msg: 'Toke no valido - usuario estado false'
            })
        }

        req.usuarioAutenticado = usuario;

        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Token no válido'
        })
    }

}

module.exports = {
    validarJWT
}