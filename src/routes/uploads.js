import { Router } from 'express';
import { check } from 'express-validator';
import { showFiles, updateFiles, uploadsFiles } from '../controllers/uploads';
import { acceptedCollections } from '../helpers/db-validators';
import { validateFile } from '../middlewares/validated-file';
import validatedInputs from '../middlewares/validated-inputs';


const router = Router();

//los middelwares sirven para ejecutar funciones y si todas pasan
// ahi si llamar controllador

router.get('/:collection/:id',[
    check('id','The id must be id of mongoDB').isMongoId(),
    check('collection').custom( c => acceptedCollections(c, ['users','products'])),
    validatedInputs,
],showFiles)

router.post('/',[
    validateFile,
],uploadsFiles)

router.put('/:collection/:id',[
    validateFile,
    check('id','The id must be id of mongoDB').isMongoId(),
    check('collection').custom( c => acceptedCollections(c, ['users','products'])),
    // check('id').custom(existUserById), es lo mismo solo que enviamos dos argumentos 
    // uno etatico es el  array y el otro es las colleccioes que recibimos de las request  entoces necesitamos ejecutat un callback
    validatedInputs
],updateFiles)

export default router;