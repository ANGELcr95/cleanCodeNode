import { response,  request } from "express"; // solo para tener el tipado
import Categorie from "../models/categorie";

export const validateCategory = async (req = request, res = response, next )=>{
    try {
        const { categoria = '' } = req.body
        const category = await Categorie.findOne({nombre: categoria});
        
        if (!category) {
            return res.status(401).json({ 
                status: 'error',
                message:  `${categoria} the category do not exist must created first`
            })
        }

        req.body.categoria = category._id // paso a la request para posteriormente ser extraido o heredado en el controlador de ser posible

        next ()

    } catch (error) {
        res.json({
            status: 'error',
            message: 'must send categoria or error connecting to DB',
        })
    } 
}


