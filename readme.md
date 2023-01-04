## BACKEND 
Languages:Node.js
Version: 14.18.1
## Dependencies
### Production
express (create url or routes)
mysql2 (module contection DB, async and await)
morgan (what type of query does the server receive ) 
cors ( defines which devices can connect to the server ) 
swagger-jsdoc ( documentation, poder cofigurar suagger ) 
swagger-ui-express ( documentation: ver en una interfaz grafica )
npm i multer(load of archives)
npm i sharp (resize images)
npm i fs (search img)
npm i bcryptjs -S  (encript plan text)
dotenv ( entorn variables )
### Development
nodemon ( reinit server )
@babel/core ( transpilador )
@babel/cli ( escribir comandos  desde consola )
@babel/preset-env ( convertr j moderno a actual )
@babel/node ( ejecute el codigo atraves de c node )

@babel/core
@babel/cli
@babel/preset-env
@babel/node

## project tree
### src
Contain all code of server


### steps
1 crated script Build ()
- lea todo lo de la carpeta src (busca ela rchivo index.js o si no lo rutea )y mandelo a dist 
donde en src puedo tener culaquier ES6 a anterior en dist
- creo otro comando(dev) para reiniciar mi servidor con

2 created rest api
estructuro esquelto
 -controllers: que es ejecutar una funcion dependiendo la ruta que es visitada,qui importo mi base  de  datos del fichero database.js
 -routes: las rutas que la aplicacion movl puede visitar
 -config.js: importo el modulo de sql
 -database.js: archivo para conectarme a una base de datos 
 -app.js: para tener mas orden solo confguracion de express

3 craeted DB  
- aplicacion de la base de datos (sql) solo guardar acrchivo de la estrucutura que se ejecuto en la consola de la base de datos(XAMPP)

### compilated
- run, npm run build
- created script packaje json for run compilated (node dist)