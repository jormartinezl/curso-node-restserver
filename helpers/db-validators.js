const Role = require('../models/rol');
const Usuario= require('../models/usuario');

const esRoleValido = async(rol='')=>{

        const existeRol=await Role.findOne({rol});

        if(!existeRol){
            throw new Error(`El rol ${rol} no esta registrado en la BD`)
        }
}

const emailExiste= async (email='')=>{
    //verificar si correo existe
    const existEmail = await Usuario.findOne({email});
    if(existEmail){
        throw new Error(`El Email ${email} ya esta registrado en la BD`)
    }
}
const existeUsuarioPorId= async (id)=>{
    console.log(id);
    //verificar si correo existe
    const existeId = await Usuario.findById(id);
    if(!existeId){
        throw new Error(`El Id ${id} no existe`)
    }
}

module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId
}