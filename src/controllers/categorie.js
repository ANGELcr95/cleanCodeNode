import { response,  request } from "express"; // solo para tener el tipado
import bcryptjs from "bcryptjs";

import Categorie from "../models/categorie";
 
// get categories - paginado - total - populte> relacion del ultmo usuario creo la categoria
export const categoriesGet = async ( req = request, res = response)=>{

    try {
        const { limit = 10, since = 0 } = req.query; // la desectrucutracion es buena por que si no  envio nada lo toma como indefinido
        const query = { estado: true }
        
        const [total, categories ] = await Promise.all([ // ejecutar dos promesas al tiempo y  no bloquear una await debajo de otro
        Categorie.countDocuments(query),
        Categorie.find(query)
            .populate('usuario', 'nombre') // relaciona el id que esta en la clave usuario los buca en las collecions y  yatengo acceso a sus porpeties
            .skip(Number(since))
            .limit(Number(limit))
        ])

        res.json({
        total,
        categories
        });
    
    } catch (error) {
        console.log(error);
    }

}

// get categories by id- paginado - total - populte> relacion del ultmo usuario creo la categoria

export const categoriesGetById = async ( req = request, res = response)=>{
    try {

        const { id } = req.params 
        const category = await Categorie.findById(id);

        res.json({
            category
        });
    } catch (error) {
        console.log(error);
    }
}

export const categoriesPost = async ( req, res = response)=>{

    try {

        const nombre = req.body.nombre.toUpperCase()
        const categoriesDB = await Categorie.findOne({nombre});

        if(categoriesDB){
           return res.status(400).json({
            msg: `The categorie ${categoriesDB.nombre} already exists`
           }) 
        }

        // generate data to save

        const data ={
            nombre,
            usuario: req.userAuth._id
        }

        const categorie = new Categorie(data)

        await categorie.save()

        res.status(201).json(categorie)
        
    } catch (error) {
        console.log(error);
        
    }
}

//actualizar catageory name

export const categoriesPut = async ( req, res = response)=>{

    try {
        const { id } = req.params
        const { estado, usuario, ...data } = req.body 
        
        data.nombre = data.nombre.toUpperCase()
        data.usuario = req.userAuth._id
        const categoryPut = await Categorie.findByIdAndUpdate(id, { data }, {new: true})
        
        res.json({
            msg: 'succes categories - put successfully',
            category: categoryPut,
        })
        
    } catch (error) {
        console.log(error);
    }

}

// change status to false 

export const categoriesDelete = async ( req, res = response)=>{

    try {
        const { id } = req.params;
        const userAuth = req.userAuth

        const category = await Categorie.findByIdAndUpdate(id, {estado: false}, {new: true})

        res.json({
            msg: `the category ${category.nombre} have been desactivated successfully`,
            category,
            userAuth
        });
        
    } catch (error) {
        console.log(error);
    }
}