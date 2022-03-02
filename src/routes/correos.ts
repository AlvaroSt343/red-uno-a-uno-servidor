import { Router } from 'express';
import { check } from 'express-validator';
import { compartir, solicitudAprobada, solicitudRechazada } from '../emails/compartir';
import { contacto } from '../emails/contacto';
import { nuevoPedido, nuevoPedidoAdmin } from '../emails/pedido';
import { existeUsuarioPorId } from '../helpers/dbValidators';
import { validarCampos } from '../middlewares/validarCampos';
import { validarJWT } from '../middlewares/validarJWT';

const router = Router();

router.post(
  '/contacto',
  [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('apellido', 'El apellido es obligatorio').not().isEmpty(),
    check('telefono', 'El teléfono es obligatorio').not().isEmpty(),
    check('telefono', 'El número de teléfono debe de tener al menos 10 dígitos').isLength({ min: 10 }),
    check('mensaje', 'El mensaje es obligatorio').not().isEmpty(),
    check('mensaje', 'El mensaje debe de tener al menos 30 caracteres').isLength({ min: 30 }),
    check('correo', 'El correo electrónico ingresado no es correcto').isEmail(),
    validarCampos,
  ],
  contacto
);

router.post(
  '/nuevo-pedido',
  [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('apellido', 'El apellido es obligatorio').not().isEmpty(),
    check('correo', 'El correo electrónico ingresado no es correcto').isEmail(),
    check('nombrePaquete', 'El nombre del paquete es obligatorio').not().isEmpty(),
    check('precio', 'El precio es obligatorio').not().isEmpty(),
    check('importe', 'El precio es obligatorio').not().isEmpty(),
    check('idCompra', 'El id es obligatorio').not().isEmpty(),
    validarCampos,
  ],
  nuevoPedido
);

router.post(
  '/nuevo-pedido-admin',
  [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('apellido', 'El apellido es obligatorio').not().isEmpty(),
    check('nombrePaquete', 'El nombre del paquete es obligatorio').not().isEmpty(),
    check('precio', 'El precio es obligatorio').not().isEmpty(),
    check('importe', 'El precio es obligatorio').not().isEmpty(),
    check('idCompra', 'El id es obligatorio').not().isEmpty(),
    validarCampos,
  ],
  nuevoPedidoAdmin
);

router.post(
  '/solicitud-compartir',
  [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('apellido', 'El apellido es obligatorio').not().isEmpty(),
    check('titulo', 'El título es obligatorio').not().isEmpty(),
    check('id', 'No es un id válido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos,
  ],
  compartir
);

router.post(
  '/solicitud-aprobada',
  [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('apellido', 'El apellido es obligatorio').not().isEmpty(),
    check('titulo', 'El título es obligatorio').not().isEmpty(),
  ],
  solicitudAprobada
);

router.post(
  '/solicitud-rechazada',
  [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('apellido', 'El apellido es obligatorio').not().isEmpty(),
    check('titulo', 'El título es obligatorio').not().isEmpty(),
  ],
  solicitudRechazada
);

export default router;
