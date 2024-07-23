/* 
  Events Routes
  /api/events
*/

const { Router } = require('express');
const { check } = require('express-validator');

const { isDate } = require('../helpers/isDate');
const { validarCAmpos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { getEventos, crearEvento, actualizarEvento, eliminarEvento } = require('../controllers/events');

const router = Router();

// Todas tienen que pasar por la validación del token
router.use(validarJWT);

// Obtener eventos
router.get('/', getEventos);

// Crear un nuevo evento
router.post(
	'/',
	[
		check('title', 'El título es obligatorio').not().isEmpty(),
		check('start', 'fecha de inicio es obligatoria').custom(isDate),
		check('end', 'fecha de finalización es obligatoria').custom(isDate),
		validarCAmpos,
	],
	crearEvento
);

// Actualizar evento
router.put(
	'/:id',
	[
		check('title', 'El título es obligatorio').not().isEmpty(),
		check('start', 'fecha de inicio es obligatoria').custom(isDate),
		check('end', 'fecha de finalización es obligatoria').custom(isDate),
		validarCAmpos,
	],
	actualizarEvento
);

// Borrar evento
router.delete('/:id', eliminarEvento);

module.exports = router;
