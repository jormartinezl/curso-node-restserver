const {Router} = require('express');
const { check } = require('express-validator');
const { usuariosGet, 
    usuariosPut, 
    usuariosPost, 
    usuariosDelete, 
    usuariosPatch } = require('../controllers/usuarios');
const { esRoleValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validators');

const { validarCampos } = require('../middlewares/validarUsuario');

const router = Router();

router.get('/',  usuariosGet)

router.put('/:id', [
    check('id','No es un id valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    check('rol').custom(esRoleValido),
    validarCampos
],usuariosPut)

router.post('/', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio y mas de 6 letras').isLength({min: 6}),
    //validacion email contra la base
    check('email').custom(emailExiste),
    //check rol contra la base
    check('rol').custom(esRoleValido),
    validarCampos
], usuariosPost)

router.delete('/:id', [
    check('id','No es un id valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
], usuariosDelete)

router.patch('/',  usuariosPatch)

module.exports=router;