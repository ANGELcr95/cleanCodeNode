
// {
//     nombre: 'miguel',
//     correo: 'miguel@hotmail.com',
//     password: 'qer23rsdjasdhg31',
//     img: 'http://www.img.com',
//     rol: 'admin',
//     estado: false,
//     google: false
// }


import mongoose from 'mongoose';

const { Schema } = mongoose;

const productsSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'name obligatorio'],
    },
    estado: {
        type: Boolean,
        default: true,
        required: true,
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'User',  //  este es el nombre de usario referencado en el schema user
        required: true
    },
    precio: {
        type: Number,
        default: 0
    },
    categoria: {
        type: Schema.Types.ObjectId,
        ref: 'Categorie',
        required: true
    },
    descripcion: {
        type: String
    },
    disponible: {
        type: String,
        default: true
    },
    img:  {
        type: String
    }
})

// puedo crearme metodos o sobrescribir como el findOne

productsSchema.methods.toJSON = function() { // aqui lo que hago es oviar la subida de algunos clave valor
    const {__v, estado, ...product} = this.toObject();
    return product
}

export default mongoose.model('Product', productsSchema);