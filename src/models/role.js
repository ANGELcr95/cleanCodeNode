// las collecciones vienen sin una para el fichero de los scripts

import mongoose from 'mongoose';

const { Schema } = mongoose;

const rolesSchema = new Schema({
    rol: {
        type: String,
        required: [true, 'El rol es obligatorio'],
    }
})

export default mongoose.model('Role', rolesSchema);