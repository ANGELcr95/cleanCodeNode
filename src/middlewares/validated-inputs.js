import { validationResult } from "express-validator";


const validatedInputs =(req, res, next )=>{
    const erros = validationResult(req)
    if(!erros.isEmpty()){
        return res.status(400).json(erros)
    }

    next(); // el next valida si tengo todo ok siga hasta el controlador
}

export default validatedInputs;