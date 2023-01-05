
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

const userSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'name obligatorio'],
    },
    correo: {
        type: String,
        required: [true, 'correo obligatorio'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'password obligatorio'],
    },
    img: {
        type: String,
    },
    rol: {
        type: String,
        required: true,
        emun:['ADMIN_ROLE', 'USER_ROLE']
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false,
    }
})

// puedo crearme metodos o sobrescribir como el findOne

userSchema.methods.toJSON = function() { // aqui lo que hago es oviar la subida de algunos clave valor
    const {__v, password, _id, ... user} = this.toObject();
    user.uid = _id
    return user
}

export default mongoose.model('User', userSchema);