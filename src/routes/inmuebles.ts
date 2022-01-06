import { Router } from "express";
import { check } from "express-validator";
import {
  actualizarInmueble,
  crearInmuebles,
  eliminarInmueble,
  obtenerInmueblePorId,
  obtenerInmuebles,
  obtenerInmueblesPorUsuario,
} from "../controllers/inmuebles";
import {
  existeCategoriaPorId,
  existeInmueblePorId,
} from "../helpers/dbValidators";
import { validarCampos } from "../middlewares/validarCampos";
import { validarJWT } from "../middlewares/validarJWT";

const router = Router();

router.get("/", obtenerInmuebles);

router.get("/usuario/:id", obtenerInmueblesPorUsuario);

router.get(
  "/:id",
  [
    check("id", "No es un id válido").isMongoId(),
    check("id").custom(existeInmueblePorId),
    validarCampos,
  ],
  obtenerInmueblePorId
);

router.post(
  "/",
  [
    validarJWT,
    check("titulo", "El título es obligatorio").not().isEmpty(),
    check("precio", "El precio es obligatorio").not().isEmpty(),
    check("precio", "El precio debe ser mayor a 0").isFloat({ min: 1 }),
    check("categoria", "No es un id válido").isMongoId(),
    check("categoria").custom(existeCategoriaPorId),
    check("lat", "La latitud es obligatoria").not().isEmpty(),
    check("lat", "La latitud es obligatoria").isFloat({ min: -90, max: 90 }),
    check("lng", "La longitud es obligatoria").not().isEmpty(),
    check("lng", "La latitud es obligatoria").isFloat({ min: -180, max: 180 }),
    validarCampos,
  ],
  crearInmuebles
);

router.put(
  "/:id",
  [validarJWT, check("id").custom(existeInmueblePorId), validarCampos],
  actualizarInmueble
);

router.delete(
  "/:id",
  [
    validarJWT,
    check("id", "No es un id válido").isMongoId(),
    check("id").custom(existeInmueblePorId),
    validarCampos,
  ],
  eliminarInmueble
);

export default router;
