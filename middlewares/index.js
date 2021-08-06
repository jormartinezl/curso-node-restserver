const validarUsuario= require('../middlewares/validarUsuario');
const validarJWT = require('../middlewares/validar-jwt');
const validarRol= require('../middlewares/validar-rol');

module.exports ={
    ...validarUsuario,
    ...validarJWT,
    ...validarRol
}