import { response,  request } from "express"; // solo para tener el tipado
import User from "../models/user";
import bcryptjs from "bcryptjs";
import generatedJWT from "../helpers/generated-jwt";
import googleVerify from "../helpers/google-verify";

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

export const googleSignIn = async (req =request, res =response) => {
    try {
        const { id_token } = req.body;
        
        const { nombre, img, correo } = await googleVerify(id_token)
        
        let user = await User.findOne({
            correo
        });

        if (!user) {
            const data ={
                nombre,
                correo,
                password: ' ',
                rol:'USER_ROLE',
                img,
                google:true,
            }

            user = new User(data)
            await user.save()
        }

        if(!user.estado) {
            return res.status(401).json({ 
                msg : 'Request admin user is blocked'
            })
        }

        // // Created JWT
        const token = await generatedJWT(user.id)

        res.json({
            user,
            token
        })
        
    } catch (error) {
        return res.status(400).json({ 
            msg: 'No pudimos procesar login google'
        })
    }
}

