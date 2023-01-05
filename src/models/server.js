import express from 'express';
import path from "path";
import cors from "cors";
import users from "../routes/user"
import auth from "../routes/auth"
import dbConnection from '../database/config';

export class Server {
    constructor( ){
        this.app = express(); 
        this.port = process.env.PORT;  // el hosting automaticmante me asigna en las variables de entorno un puerto
        this.usuariosPath = '/api/users'
        this.loginPath = '/api/auth'

        // Connectar a base de datos
        this.databaseConnect()

        // metodo de middleware
        this.middlewares()

        // metodo de rutas
        this.routes()
    }

    async databaseConnect(){
        await dbConnection()
    }

    middlewares() {
        // CORS
        this.app.use(cors())

        //lectura y parseo de bdy
        this.app.use(express.json())

        // Public Directory
        this.app.use(express.static(path.join(__dirname, '../../public'))) 
    }

    routes() {
        this.app.use(this.loginPath, auth)
        this.app.use(this.usuariosPath, users)
    }

    listen() {
        this.app.listen(this.port,() => {
            console.log(`Running on PORT ${this.port}`);
        })
    }

}