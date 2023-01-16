import { Router } from 'express';
import { check } from 'express-validator';
import { userLogin, googleSignIn } from '../controllers/auth';
import { categoriesDelete, categoriesGet, categoriesGetById, categoriesPost, categoriesPut } from '../controllers/categorie';
import validatedJWT from '../middlewares/validated-jwt'
import { existCategory, existProduct, existUserByEmail } from '../helpers/db-validators';
import validatedInputs from '../middlewares/validated-inputs';
import { validateRoleAdmin } from '../middlewares/validated-roles';
import { productsDelete, productsGet, productsGetById, productsPost, productsPut } from '../controllers/product';
import { validateCategory } from '../middlewares/validated-category';


const router = Router();

// get all categories  - public
router.get('/',productsGet)

// get categorie by id  - public
router.get('/:id',[
    check('id', 'No es un Id valido').isMongoId(),
    check('id').custom(existProduct),
    validatedInputs
],productsGetById)

// crear categorie  - any can create a category if have a token validation
router.post('/',[
    validatedJWT,
    check('nombre', 'the name is obligatory').not().isEmpty(),
    validateCategory,
    validatedInputs
],productsPost)

// get all categories  - any can create a category if have a token validation
router.put('/:id',[
    validatedJWT,
    check('nombre', 'the name is obligatory').not().isEmpty(),
    check('id', 'No es un Id valido').isMongoId(),
    check('id').custom(existProduct),
    validatedInputs
],productsPut)

// get all categories  - user admin
router.delete('/:id',[
    validatedJWT,
    validateRoleAdmin,
    check('id', 'No es un Id valido').isMongoId(),
    check('id').custom(existProduct),
    validatedInputs
],productsDelete)


export default router;