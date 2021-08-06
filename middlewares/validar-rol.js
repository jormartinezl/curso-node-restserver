const { response } = require("express")


const esAdminRol= (req,res=response,next)=>{

    if(!req.usuarioAutenticado){
        return res.status(500).json({
            msg: 'Se quiere verificar el rol sin verificar el token primero'
        })
    }
    
    const {rol,name} = req.usuarioAutenticado;
    
    if(rol!=='ADMIN_ROLE'){
        return res.status(401).json({
            msg: `${name} no es administrador`
        })
    }
    
    next();
}

const tieneRole=(...roles)=>{
    return(req,res=response,next) =>{
        if(!req.usuarioAutenticado){
            return res.status(500).json({
                msg: 'Se quiere verificar el rol sin verificar el token primero'
            })
        }
        
        if(!roles.includes(req.usuarioAutenticado.rol)){
            return res.status(401).json({
                msg: `El servicio requiere uno de los roles ${roles}`
            })

        }


        next();
    }
}

module.exports = {
    esAdminRol,
    tieneRole
}