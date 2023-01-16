import path from "path";
import { response,  request } from "express"; // solo para tener el tipado
import { v4 as uuidv4 } from 'uuid';

// Por logica cuando no tiene un await
// debo realcionarlo si esasync l controller con una promise
export const uploadsFilesHelper =  async (files, extValidates = [ 'png', 'jpg', 'jpeg', 'gif'], folder='' ) =>{

    return new Promise((resolve, reject) => {

        const { file } = files;
        const nameExt = file.name.split('.').pop();
    
        // validate extension file
        if (!extValidates.includes(nameExt)) {
            return reject(`The extension ${nameExt} is not permitted`)
        }
        
        const nameUniqueId = uuidv4() + '.' + nameExt 
        const uploadPath = path.join(__dirname,'../../uploads/',folder, nameUniqueId)
        console.log(uploadPath , '======> saved');
        
        file.mv(uploadPath, function(err) {
          if (err) {
            reject(err)
          }
          resolve( nameUniqueId )
        });
    })
}

