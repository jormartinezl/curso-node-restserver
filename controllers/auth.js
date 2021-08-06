const {response} = require('express');
const Usuario = require('../models/usuario');
const bcryptjs  = require('bcryptjs');
const { generaJWT } = require('../helpers/generar-jwt');

const login = async(req,res=response)=>{

    try {
        const {email,password} = req.body;

        //verificar email existe
        const usuario= await Usuario.findOne({email});
        if(!usuario ){
            return res.status(400).json({
                msg: 'Usuario/Passwor incorrecto'
            })
        }
        
        //verificar usuario activo
        if(!usuario.state){
            return res.status(400).json({
                msg: 'Usuario/Passwor incorrecto estado: false'
            })
        }
        
        //verificar contraseña
        const validPassword = bcryptjs.compareSync(password,usuario.password);

        if(!validPassword){
            return res.status(400).json({
                msg: 'Usuario/Passwor incorrecto password'
            })
        }

        //generar jwt
        const token = await generaJWT(usuario.id);

        res.json({
            usuario,
            token
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Ocurrio un error'
        })
    }
}

module.exports={
    login
}