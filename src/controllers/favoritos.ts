import { Request, Response } from "express";
import { Favorito } from "../models/favoritos";
import { Inmueble } from "../models/inmuebles";

export const obtenerFavoritosPorUsuario = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;

  const favoritosUsuario = await Favorito.find({
    usuario: id,
  }).populate({
    path: "inmueble",
    select: ["titulo", "slug", "imgs"],
    populate: { path: "usuario", select: ["nombre", "apellido"] },
  });

  res.json({
    ok: true,
    favoritosUsuario,
  });
};

export const obtenerFavoritosPorUsuarioSolicitud = async (
  req: Request,
  res: Response
) => {
  const { limite = 20, desde = 0, solicitud = "Pendiente" } = req.query;
  const { id } = req.params;

  const favoritosUsuario = await Favorito.find({
    usuario: id,
    solicitud,
  })
    .populate({
      path: "inmueble",
      select: ["titulo", "slug", "imgs"],
      populate: { path: "usuario", select: ["nombre", "apellido"] },
    })
    .skip(Number(desde))
    .limit(Number(limite));

  res.json({
    ok: true,
    favoritosUsuario,
  });
};

export const agregarFavoritos = async (req: Request, res: Response) => {
  const { usuario, inmueble } = req.body;

  const existeFavorito = await Favorito.findOne({ usuario, inmueble });
  const inmuebleId = await Inmueble.findById(inmueble);

  if (existeFavorito) {
    return res.status(400).json({
      ok: false,
      msg: `Ya has agregado este inmueble a favoritos`,
    });
  }

  if (inmuebleId?.usuario.toString() === usuario) {
    return res
      .status(400)
      .json({ ok: false, msg: "No puedes agregar tu inmueble a favoritos" });
  }

  const favoritos = new Favorito({ usuario, inmueble });

  await favoritos.save();

  res.json({
    ok: true,
    msg: "El inmueble se ha añadido a sus favoritos",
  });
};

export const eliminarFavoritos = async (req: Request, res: Response) => {
  const { id } = req.params;

  const favorito = await Favorito.findByIdAndDelete(id, { new: true });

  res.json({
    ok: true,
    msg: "Se ha eliminado de tus favoritos",
    favorito,
  });
};
