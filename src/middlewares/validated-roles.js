import { response,  request } from "express"; // solo para tener el tipado


export const validateRoleAdmin =(req = request, res = response, next )=>{

    if (!req.userAuth) {
        return res.status(500).json({ // no authorization 401
            status: 'error',
            message: 'Verficar role sin validar token'
        })
    }

    const { rol, nombre} = req.userAuth

    if (rol !== 'ADMIN_ROLE') {
        return res.status(401).json({ // no authorization 401
            status: 'error',
            message:  `${nombre} have not permissions administrator`
        })
    }

    next(); // el next valida si tengo todo ok siga hasta el controlador
}

export const validateRole =( ...roles ) => {
    return (req, res, next) => {
        if (!req.userAuth) {
            return res.status(500).json({ // no authorization 401
                status: 'error',
                message: 'Verficar role sin validar token'
            })
        }

        const { rol, nombre} = req.userAuth
        
        if ( !roles.includes( rol )) {
            return res.status(401).json({ // no authorization 401
                status: 'error',
                message:  `${nombre} have not permissions de estos roles ${roles}`
            })
        }
        next(); // el next valida si tengo todo ok siga hasta el controlador
    }
}

