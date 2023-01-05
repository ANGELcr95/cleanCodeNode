import { Router } from 'express';
import { check } from 'express-validator';
import { userLogin } from '../controllers/auth';
import { existUserByEmail } from '../helpers/db-validators';
import validatedInputs from '../middlewares/validated-inputs';


const router = Router();

//los middelwares sirven para ejecutar funciones y si todas pasan
// ahi si llamar controllador

router.post('/login',[
    check('correo', 'email is obligatory').isEmail(),
    check('password', 'the password is obligatory').not().isEmpty(),
    check('correo').custom(existUserByEmail),
    validatedInputs
],userLogin)

export default router;