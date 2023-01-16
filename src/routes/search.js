import { Router } from 'express';
import { check } from 'express-validator';
import { userLogin, googleSignIn } from '../controllers/auth';
import { search } from '../controllers/search';
import { existUserByEmail } from '../helpers/db-validators';
import validatedInputs from '../middlewares/validated-inputs';


const router = Router();

//los middelwares sirven para ejecutar funciones y si todas pasan
// ahi si llamar controllador

router.get('/:colleccion/:termino',[
    check('colleccion', 'the collecion is obligatory').not().isEmpty(),
    check('termino', 'the termino is obligatory').not().isEmpty(),
    validatedInputs
],search)


export default router;