const express = require('express')
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server{

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';

        //conectar a base de datos
        this.conectarDB();

        //midelware
        this.midelware();

        //rutas de mi aplicacion
        this.routes();
    }

    async conectarDB(){
        await dbConnection();
    }
    
    midelware(){
        //cors
        this.app.use(cors())

        //leectura y parseo
        this.app.use(express.json());

        //Directorio publico
        this.app.use(express.static('public'))
    }

    routes(){
        this.app.use(this.usuariosPath, require('../routes/usuarios'));
    }

    listen(){
        this.app.listen(this.port, ()=>{
            console.log('Servidor corriendo en puerto',this.port);
        })
    }
}

module.exports = Server;