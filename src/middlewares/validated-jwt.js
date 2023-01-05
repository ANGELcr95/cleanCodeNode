import { response,  request } from "express"; // solo para tener el tipado
import jwt from 'jsonwebtoken';

import User from "../models/user";

const validatedJWT = async(req = request, res = response, next )=>{
    const token = req.header('x-token')

    if(!token){
        return res.status(401).json({ // no authorization 401
            status: 'error',
            message: 'No token provided'
        })
    }

    try {
        // si el jwt es valido
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY)
        const user = await User.findById(uid);

        // verificar si el estado es false o no exite
        if(!user || !user?.estado){
            return res.status(401).json({ // no authorization 401
                status: 'error',
                message: 'Invalid token - user state false or not exist'
            })
        }

        req.userAuth = user // paso a la request para posteriormente ser extraido o heredado en el controlador de ser posible

        next()

    } catch (error) {
        res.status(401).json({
            status: 'error',
            message: 'Invalid token'
        })
    }
}

export default validatedJWT