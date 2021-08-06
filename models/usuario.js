
const {Schema,model} = require('mongoose');

const UsuarioSchema= Schema({
    name: {
        type: String,
        required: [true,'El nombre es obligatorio']
    },
    email: {
        type: String,
        required: [true,'El correo es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true,'La contraseña es obligatorio']
    },
    image: {
        type: String
    },
    rol: {
        type: String,
        required: true
    },
    state: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    },

})
//Se sobre escribe metodo para quitar version y password y unicamente regresar usuario
UsuarioSchema.methods.toJSON= function(){
    const {__v,password,_id, ...usuario } = this.toObject();
    usuario.uuid=_id;
    return usuario;
}

module.exports=model('Usuario',UsuarioSchema);