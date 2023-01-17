import path from "path";
import { response,  request } from "express"; // solo para tener el tipado
import { uploadsFilesHelper } from "../helpers/upload-files";
import fs from 'fs'
import { v2 as cloudinary } from 'cloudinary'
import { v4 as uuidv4 } from 'uuid';
import bcryptjs from "bcryptjs";
import generatedJWT from "../helpers/generated-jwt";
import Product from "../models/product";
import Categorie from "../models/categorie";
import User from "../models/user";

import mongoose from 'mongoose';




export const showFiles =  async (req = request, res = response ) =>{
    const {id, collection} = req.params

    let model;
    const placeholderImg = path.join(__dirname, '../../assets/no-image.jpg')

    switch (collection) {
        case 'users':
            model = await User.findById(id)
            if (!model) {
                return res.status(400).sendFile(placeholderImg)
            }
            break;
        case 'products':
            model = await Product.findById(id)
            if (!model) {
                return res.status(400).sendFile(placeholderImg)
            }
            break;
    
        default:
            return res.status(400).sendFile(placeholderImg)
    }


    // limpiar imagens previas

    if (model.img) {
        // borra la imagen del servidor
        const pathImg = path.join(__dirname, '../../uploads/', collection, model.img)
        if( fs.existsSync(pathImg)){
            return res.sendFile(pathImg) // el plus de es que  no doy la  ruta a la db y donde esta ubicado en mi server o sea la carpeta uploads
        }
    }

    res.sendFile(placeholderImg)
}


export const uploadsFiles =  async (req = request, res = response ) =>{

    if (!req.files.file) {
        return res.status(400).json({
        masg:'Must rename key of flile to upload.'
      });
      
    }

    //  images
    try {
        const pathAll = await uploadsFilesHelper(req.files, undefined, 'imgs');
        res.json({
           nombre: pathAll
        })
    } catch (error) {
        res.status(400).json({msg: error})
    }
}

 // CON ESTE YO GUARDABA EN EL SERVER
// export const updateFiles =  async (req = request, res = response ) =>{

//     const { collection, id} = req.params

//     let model;

//     switch (collection) {
//         case 'users':
//             model = await User.findById(id)
//             if (!model) {
//                 return res.status(400).json({ 
//                     message: `Do not exist user with the id ${id} `
//                 })
//             }
//             break;
//         case 'products':
//             model = await Product.findById(id)
//             if (!model) {
//                 return res.status(400).json({ 
//                     message: `Do not exist user with the id ${id}`
//                 })
//             }
//             break;
    
//         default:
//             return res.status(500).json({msg: `This collection ${collection} no  is configurated by equipment of backend`})
//     }


//     // limpiar imagens previas

//     if (model.img) {
//         // borra la imagen del servidor

//         const pathImg = path.join(__dirname, '../../uploads/', collection, model.img)
//         if( fs.existsSync(pathImg)){
//             fs.unlinkSync(pathImg)
//         }
//     }

//     const pathAll = await uploadsFilesHelper(req.files, undefined, collection);

//     model.img = pathAll
//     await model.save()

//     res.json(model)
// }

export const updateFilesCloudinary =  async (req = request, res = response ) =>{

    const { collection, id} = req.params

    let model;

    switch (collection) {
        case 'users':
            model = await User.findById(id)
            if (!model) {
                return res.status(400).json({ 
                    message: `Do not exist user with the id ${id} `
                })
            }
            break;
        case 'products':
            model = await Product.findById(id)
            if (!model) {
                return res.status(400).json({ 
                    message: `Do not exist user with the id ${id}`
                })
            }
            break;
    
        default:
            return res.status(500).json({msg: `This collection ${collection} no  is configurated by equipment of backend`})
    }


    // limpiar imagens previas


    try {
        cloudinary.config({ 
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
            api_key: process.env.CLOUDINARY_API_KEY,  
            api_secret: process.env.CLOUDINARY_API_SECRET, 
            secure: true
        })

        if (model.img) {
            // borra la imagen del servidor
            const nameImgEnd = model.img.split('/').pop()
            const idPublic = nameImgEnd.split('.').shift()
            cloudinary.uploader.destroy(idPublic)        
        }
        const { tempFilePath } = req.files.file

        const { secure_url } = await cloudinary.uploader.upload(tempFilePath)
        model.img = secure_url
        await model.save()
        res.json({
            url:secure_url
        })
        
    } catch (error) {
        console.log(error);
        
    }
}

