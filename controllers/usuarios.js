const {response} = require('express')

const usuariosGet=(req, res=response) =>{

    const {q,nombre="No name"}= req.query;

    res.status(403).json({
        msg: 'get api - controlador',
        q,
        nombre
    })
}

const usuariosPut=(req, res=response) =>{

    const {id}=req.params;

    res.status(400).json({
        msg: 'put api - controlador',
        id
    })
}

const usuariosPost=(req, res=response) =>{
    const {nombre,edad}=req.body;
    res.status(403).json({
        msg: 'post api - controlador',
        nombre,
        edad
    })
}

const usuariosDelete=(req, res=response) =>{
    res.status(403).json({
        msg: 'delete api - controlador'
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