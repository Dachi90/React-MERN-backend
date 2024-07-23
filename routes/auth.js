/* 
	Rutas de usuarios / Auth
	host + /api/auth
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCAmpos } = require('../middlewares/validar-campos');
const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.post(
	'/new',
	[
		//middlewares
		check('name', 'El nombre es obligatorio').not().isEmpty(),
		check('email', 'El email es obligatorio').isEmail(),
		check('password', 'El password debe de ser de 6 caracteres').isLength({ min: 6 }),
		validarCAmpos,
	],
	crearUsuario
);

router.post(
	'/',
	[
		// middlewares
		check('email', 'El email es obligatorio').isEmail(),
		check('password', 'El password debe de ser de 6 caracteres').isLength({ min: 6 }),
		validarCAmpos,
	],
	loginUsuario
);

router.get('/renew', validarJWT, revalidarToken);

module.exports = router;
