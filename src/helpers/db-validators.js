import Role from "../models/role"
import User from "../models/user"

export const isRoleValidated = async(rol = '') => { // validate for data ENUM(opciones)
    const existRol = await Role.findOne({rol})
    if(!existRol){
        throw new Error(`${rol} no is registered DB`)
    }
}

// verificar si el correo existe

export const existEmail = async(correo = '') => { // validate for data ENUM(opciones)
    const existCorreo = await User.findOne({ // modelo
        correo
    });

    if (existCorreo) {
        throw new Error(`${correo} email already exists`);
    }

}

// si existe usuario por Id

export const existUserById = async(id = '') => { // validate for data ENUM(opciones)
    const existUser = await User.findById(id);

    if (!existUser) {
        throw new Error(`${id} user does not exist`);
    }

}

