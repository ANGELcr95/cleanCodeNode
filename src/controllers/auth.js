import { response,  request } from "express"; // solo para tener el tipado
import User from "../models/user";
import bcryptjs from "bcryptjs";
import generatedJWT from "../helpers/generated-jwt";

export const userLogin = async ( req = request, res = response)=>{

    try {
        const { password, correo } = req.body

        const user = await User.findOne({ // modelo
            correo
        });

        // validate password
        const strPassword = password.toString();
        
        const validPassword = bcryptjs.compareSync(strPassword, user.password)
        if (!validPassword) {
            return res.status(400).json({
                msg: 'User / Password does not right'
            })
        }

        // Created JWT
        const token = await generatedJWT(user.id)

        res.json({
            user,
            token
        })

        
    } catch (error) {
        console.log(error);
        return res.status(500).json({ 
            msg: 'Contactese con el admin'
        })
    }
}

