import { Request, Router } from "express";
import { check } from "express-validator";
import { v2 } from "cloudinary";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { subirFotoPerfil } from "../controllers/subidas";
import { validarCampos } from "../middlewares/validarCampos";
import { validarJWT } from "../middlewares/validarJWT";

const router = Router();

v2.config({
  cloud_name: "du6f7alxg",
  api_key: "575558682358524",
  api_secret: "gFqgCCTVoJ-RrNufHsd8JHmIa3Y",
});

const storage = new CloudinaryStorage({
  cloudinary: v2,
  params: async (req: Request, file) => {
    return {
      folder: `red1a1/usuarios/${req.params.id}`,
      public_id: "foto-de-perfil",
    };
  },
});

const upload = multer({ storage });

router.post(
  "/usuarios/:id",
  [
    validarJWT,
    check("id", "No es un id válido").isMongoId(),
    upload.single("picture"),
    validarCampos,
  ],
  subirFotoPerfil
);

export default router;
