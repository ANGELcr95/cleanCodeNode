import { response,  request } from "express"; // solo para tener el tipado
import bcryptjs from "bcryptjs";

import Categorie from "../models/categorie";
import Product from "../models/product";
 
// get products - paginado - total - populte> relacion del ultmo usuario creo la categoria
export const productsGet = async ( req = request, res = response)=>{

    try {
        const { limit = 10, since = 0 } = req.query; // la desectrucutracion es buena por que si no  envio nada lo toma como indefinido
        const query = { estado: true }
        
        const [total, products ] = await Promise.all([ // ejecutar dos promesas al tiempo y  no bloquear una await debajo de otro
        Product.countDocuments(query),
        Product.find(query)
            .populate('usuario', 'nombre') // relaciona el id que esta en la clave usuario los buca en las collecions y  yatengo acceso a sus porpeties
            .populate('categoria', 'nombre') // relaciona el id que esta en la clave usuario los buca en las collecions y  yatengo acceso a sus porpeties
            .skip(Number(since))
            .limit(Number(limit))
        ])

        res.json({
        total,
        products
        });
    
    } catch (error) {
        console.log(error);
    }

}

// get products by id- paginado - total - populte> relacion del ultmo usuario creo la categoria

export const productsGetById = async ( req = request, res = response)=>{
    try {

        const { id } = req.params 
        const product = await Product.findById(id)
            .populate('usuario', 'nombre') 
            .populate('categoria', 'nombre') 

        res.json({
            product
        });
    } catch (error) {
        console.log(error);
    }
}

export const productsPost = async ( req, res = response)=>{

    try {
        let {...data} = req.body
        const nombre = req.body.nombre.toUpperCase()
        const productsDB = await Product.findOne({nombre});

        if(productsDB){
           return res.status(400).json({
            msg: `The Product ${productsDB.nombre} already exists`
           }) 
        }
        
        // generate data to save
        data.nombre = nombre
        data.usuario = req.userAuth._id

        const product = new Product(data)

        await product.save()

        res.status(201).json(product)
        
    } catch (error) {
        console.log(error);
        
    }
}

//actualizar catageory name

export const productsPut = async ( req, res = response)=>{

    try {
        const { id } = req.params
        const { estado, categoria, ...data } = req.body 
        
        data.nombre = data.nombre.toUpperCase()
        data.usuario = req.userAuth._id
        const productPut = await Product.findByIdAndUpdate(id,  data , {new: true})
        
        res.json({
            msg: 'succes products - put successfully',
            product: productPut,
        })
        
    } catch (error) {
        console.log(error);
    }

}

// change status to false 

export const productsDelete = async ( req, res = response)=>{

    try {
        const { id } = req.params;
        const userAuth = req.userAuth

        const product = await Product.findByIdAndUpdate(id, {estado: false}, {new: true})

        res.json({
            msg: `the product ${product.nombre} have been desactivated successfully`,
            product,
            userAuth
        });
        
    } catch (error) {
        console.log(error);
    }
}