import dotenv from 'dotenv'
import path from "path";
import express from 'express';
import cors from "cors";
import fileUpload from 'express-fileupload';
import { Server as SocketServer} from 'socket.io'
import http from 'http'
import { socketController } from './sockets/controller';

dotenv.config()

export class Server {
    constructor( ){
        this.app = express(); 
        this.port = process.env.PORT;  // el hosting automaticmante me asigna en las variables de entorno un puerto
        this.server = http.createServer(this.app)
        this.io = new SocketServer(this.server) // es toda la iformacion de mis sockets o clientes conectados
        this.paths = {
            home: '/'
        }

        // Connectar a base de datos
        // this.databaseConnect()

        // metodo de middleware
        this.middlewares()

        // metodo de rutas
        this.routes()

        // Sockets
        this.sockets()


        // run server
        this.listen()
    }

    // async databaseConnect(){
    //     await dbConnection()
    // }

    middlewares() {
        // CORS
        this.app.use(cors())

        //lectura y parseo de bdy
        this.app.use(express.json())

        // Public Directory
        this.app.use(express.static(path.join(__dirname, '../public'))) 


        // FileUpload - carga de archivos
        this.app.use(fileUpload({
            useTempFiles: true,
            tempFileDir: '/tmp/',
            createParentPath: true // crea carpeta si no exist en el path de guardar los files
        }))
    }

    routes() {
        this.app.use(this.paths.home, (req, res )=>{
            res.json({
                msg:'Hello to home!'
            })
        })
    }

    sockets() {
        this.io.on('connection', socketController)
    }


    listen() {
        this.server.listen(this.port,() => {
            console.log(`Running on PORT ${this.port}`);
        })
    }
}


new Server()
  
