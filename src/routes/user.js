import { Router } from 'express';
import { check } from 'express-validator';

import { usersGet, usersPut, usersPost, usersDelete } from '../controllers/user';
import {isRoleValidated, existEmail, existUserById} from '../helpers/db-validators';
import validatedInputs from '../middlewares/validated-inputs';
import validatedJWT from '../middlewares/validated-jwt';
import {validateRoleAdmin, validateRole} from '../middlewares/validated-roles';

const router = Router();

//los middelwares sirven para ejecutar funciones y si todas pasan
// ahi si llamar controllador

router.get('/',usersGet)

router.put('/:id',[
    check('id', 'No es un Id valido').isMongoId(),
    check('id').custom(existUserById),
    validatedInputs
],usersPut)

router.post('/',[
    check('nombre', 'El correo es obligatorio').not().isEmail(),
    check('password', 'La password es obligatorio mas de 6 caracters').isLength({ min: 6}),
    check('correo', 'El correo no es valido').isEmail(),
    // check('rol', 'No es un role').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    // check('rol').custom((rol)=> isRoleValidated(rol)), native form for write a callback
    check('rol').custom(isRoleValidated), // asi envio el primer argumneto emite custom seria rol
    check('correo').custom(existEmail), 
    validatedInputs
],usersPost)

router.delete('/:id',[
    validatedJWT,
    // validateRoles, // si es necedario sea administrator
    validateRole('ADMIN_ROLE', 'VENTAS_ROLE'), // si contiene alguno de estos roles
    check('id', 'No es un Id valido').isMongoId(),
    check('id').custom(existUserById),
    validatedInputs
],usersDelete)

export default router;