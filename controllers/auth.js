const {response, json} = require('express');
const Usuario = require('../models/usuario');
const bcryptjs  = require('bcryptjs');
const { generaJWT } = require('../helpers/generar-jwt');
const { googleVerify } = require('../helpers/google-verify');

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

const googleSignIn = async (req,res=response,next)=>{

    
    const {id_token} = req.body;
    try {
        const {name,email,image} = await googleVerify(id_token);

        let usuario=await Usuario.findOne({email});

        if(!usuario){
            
            const data ={
                name,
                email,
                password: ':p',
                image,
                google: true,
                rol: 'SUPER_ROLE'
            }
            
            usuario = new Usuario(data);
            await usuario.save();
            console.log(usuario);
        }
        
        if(!usuario.state){
            return res.status(401).json({
                msg: 'Hable con el administardor usuario borrado'
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
        res.status(400).json({
            msg: 'Token de google no reconocido'
        })
    }
}

module.exports={
    login,
    googleSignIn
}