import express from 'express';
import path from "path";
import cors from "cors";
import users from "../routes/user"
import auth from "../routes/auth"
import categories from "../routes/categorie"
import products from "../routes/products"
import dbConnection from '../database/config';
import search from '../routes/search';

export class Server {
    constructor( ){
        this.app = express(); 
        this.port = process.env.PORT;  // el hosting automaticmante me asigna en las variables de entorno un puerto

        this.paths = {
            users: '/api/users',
            login: '/api/auth',
            categories: '/api/categories',
            products: '/api/products',
            search: '/api/buscar'
        }

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
        this.app.use(this.paths.login, auth)
        this.app.use(this.paths.users, users)
        this.app.use(this.paths.categories, categories)
        this.app.use(this.paths.products, products)
        this.app.use(this.paths.search, search)
    }

    listen() {
        this.app.listen(this.port,() => {
            console.log(`Running on PORT ${this.port}`);
        })
    }

}