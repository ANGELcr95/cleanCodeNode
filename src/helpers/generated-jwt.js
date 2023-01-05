import jwt from 'jsonwebtoken';


const generatedJWT = async (uid = '') => {
    return new Promise((resolve, reject) => {
        const payload = { uid }
        jwt.sign(payload, process.env.SECRETORPRIVATEKEY,{
            expiresIn:'4h'
        }, ( err, token)=>{
            if (err) {
                console.log(err);
                reject('No se pudo generara JWT');
            } else{
                resolve(token);
            }
        })
    })
}

export default generatedJWT