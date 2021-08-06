const {response} = require('express')
const bcrypt= require('bcryptjs')
const Usuario= require('../models/usuario');

const usuariosGet=async (req, res=response) =>{
    
    //se recuperan parametrsos uri
    const {limite=5,desde=0}= req.query;

    const estado={state:true};

    //const usuarios = await Usuario.find(estado)
    //.skip(Number(desde))
    //.limit(Number(limite));

    //const total = await Usuario.countDocuments(estado);

    //con el promise ejecuta las 2 al mismo tiempo y si una da error ambas dan error
    const [total,usuarios] = await Promise.all([
        Usuario.countDocuments(estado),
        Usuario.find(estado)
            .skip(Number(desde))
            .limit(Number(limite))
    ])

    res.status(200).json({
        total,usuarios
    })
}

const usuariosPut= async (req, res=response) =>{

    const {id}=req.params;

    const {_id,password,google,email,...resto} = req.body;

    //TODO validar contra base datos
    if(password){
        //encriptacion
        const salt=bcrypt.genSaltSync();
        resto.password=bcrypt.hashSync(password,salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id,resto);

    res.json(
        usuario
    )
}

const usuariosPost=async(req, res=response) =>{

    const {name, email, password, rol}=req.body;
    const usuario = new Usuario({name,email,password,rol});

    //encriptacion
    const salt=bcrypt.genSaltSync();
    usuario.password=bcrypt.hashSync(password,salt);

    //guardar en base
    await usuario.save();

    res.json({
        usuario
    })
}

const usuariosDelete=async (req, res=response) =>{
    const {id}=req.params;

    //fisicamente lo borramos
    //const usuario = await Usuario.findByIdAndDelete(id);

    //se cambia estado por false
    const usuario = await Usuario.findByIdAndUpdate(id,{state: false})
    const usuarioAutenticado = req.usuarioAutenticado;
    
    //obtener usuario autenticado
    res.json({
        usuario,usuarioAutenticado
    })
}

const usuariosPatch=(req, res) =>{
    res.status(403).json({
        msg: 'patch api - controlador'
    })
}

module.exports={
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosPatch,
    usuariosDelete
}