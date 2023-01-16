import { response,  request } from "express"; // solo para tener el tipado
import bcryptjs from "bcryptjs";
import generatedJWT from "../helpers/generated-jwt";
import Product from "../models/product";
import Categorie from "../models/categorie";
import User from "../models/user";

import mongoose from 'mongoose';

const collectionsTrue = [
    'users',
    'categories',
    'products',
    'roles'
]

const searchUsers =  async (termino = '', res = response ) =>{
    const isIdMongo = mongoose.Types.ObjectId.isValid(termino) // true or false

    if (isIdMongo) {
        const user =  await User.findById(termino)
        return res.json({
            results:user ? [user]: []
        })
    }

    const regex = new RegExp(termino, 'i' )

    const users = await User.find({ // meotod .count cuento el numero de users
        $or: [{nombre: regex}, {correo: regex}], // que coincida con expresion regular
        $and: [{estado: true}]
    })
    

    return res.json({
        total: users.length,
        results: users
    })
}

const searchCategories =  async (nombre = '', res = response ) =>{

    const regex = new RegExp(nombre, 'i' )

    const categories = await Categorie.find({ // meotod .count cuento el numero de categories
        nombre: regex, // que coincida con expresion regular
        estado: true
    })

    return res.json({
        total: categories.length,
        results: categories
    })
}

const searchProducts =  async (termino = '', res = response ) =>{

    const isIdMongo = mongoose.Types.ObjectId.isValid(termino) // true or false

    if (isIdMongo) {
        const product =  await Product.findById(termino)
            .populate('usuario', 'nombre') // relaciona el id que esta en la clave usuario los buca en las collecions y  yatengo acceso a sus porpeties
            .populate('categoria', 'nombre') // relaciona el id que esta en la clave usuario los buca en las collecions y  yatengo acceso a sus porpeties

        return res.json({
            results:product ? [product]: []
        })
    }


    const regex = new RegExp(termino, 'i' )

    const products = await Product.find({ // meotod .count cuento el numero de products
        termino: regex, // que coincida con expresion regular
        estado: true
    })
        .populate('usuario', 'nombre') // relaciona el id que esta en la clave usuario los buca en las collecions y  yatengo acceso a sus porpeties
        .populate('categoria', 'nombre') // relaciona el id que esta en la clave usuario los buca en las collecions y  yatengo acceso a sus porpeties


    return res.json({
        total: products.length,
        results: products
    })
}


export const search = async ( req = request, res = response)=>{

    try {
        const { colleccion, termino } = req.params

        if (!collectionsTrue.includes(colleccion)) {
            return res.status(400).json({
                msg: `Las collecciones permitidas son: ${collectionsTrue}`
            })
        } 

        switch (colleccion) {
            case 'users':
                searchUsers(termino, res )
            case 'categories':
                searchCategories(termino, res)
                break;
            case 'products':
                searchProducts(termino, res)
                break;
        
            default:
                res.status(500).json({
                    msg:'This collection no is considered for search, communicating with the equipment back'
                })
                break;
        }
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({ 
            msg: 'Contactese con el admin'
        })
    }
}

