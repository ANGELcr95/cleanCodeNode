
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

const categoriesSchema = new Schema({
    nombre: {
        type: String,
        unique: true,
        required: [true, 'name obligatorio'],
    },
    estado: {
        type: Boolean,
        default: true,
        required: [true, 'name user obligatory'],
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }
})

// puedo crearme metodos o sobrescribir como el findOne

categoriesSchema.methods.toJSON = function() { // aqui lo que hago es oviar la subida de algunos clave valor
    const {__v, ...category} = this.toObject();
    return category
}

export default mongoose.model('Categorie', categoriesSchema);