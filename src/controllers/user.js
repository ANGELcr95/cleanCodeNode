import { response,  request } from "express"; // solo para tener el tipado
import bcryptjs from "bcryptjs";

import User from "../models/user";

export const usersGet = async ( req = request, res = response)=>{
    
    const { nombre, apikey, page, limit = 5, since = 0 } = req.query; // la desectrucutracion es buena por que si no  envio nada lo toma como indefinido
    const query = { estado: true }

    
    // con el AWAIT espera el codigo la resolucion de las promesas
    const [total, users ] = await Promise.all([ // ejecutar dos promesas al tiempo y  no bloquear una await debajo de otro
        User.countDocuments(query),
        User.find(query)
            .skip(Number(since))
            .limit(Number(limit))
    ])

    res.json({
      total,
      users
    });
}

export const usersPut = async ( req, res = response)=>{

    try {
        const {_id, password, google, ...resto } = req.body  // saco el id para que no lo intente actualizar y estalle
        const id  = req.params.id;
        const strPassword = password.toString();

        if (password) {
            const salt = bcryptjs.genSaltSync()
            resto.password = bcryptjs.hashSync(strPassword, salt)
        }

        const userPut = await User.findByIdAndUpdate(id, resto, {new: true})
    
        res.json({
            msg: 'put, API -  controller',
            user: userPut
        });
        
    } catch (error) {
        console.log(error);
    }

}

export const usersPost = async ( req, res = response)=>{



    try {
        const {nombre, correo, password, rol} = req.body
        const user = new User({nombre, correo, password, rol });
        // const {google, ...resto } = req.body con esto extriago lo que neceisot y el resto se va en el rest

    
        // encryptar la contraseña

        const salt = bcryptjs.genSaltSync()
        user.password = bcryptjs.hashSync(password, salt)

        // guardar en DB
        await user.save();
    
        res.status(201).json({
            msg: 'post, API -  controller',
            user
        });
        
    } catch (error) {
        console.log(error);
        
    }
}

export const usersDelete = async ( req, res = response)=>{

    try {
        const { id } = req.params;
        const userAuth = req.userAuth

        // const user = await User.findByIdAndDelete(id);  con esto remuevo el usuario por completo de la data

        const user = await User.findByIdAndUpdate(id, {estado: false}, {new: true})

        res.json({
            msg: `the user ${user.nombre} have been desactivated successfully`,
            user,
            userAuth
        });
        
    } catch (error) {
        console.log(error);
    }
}