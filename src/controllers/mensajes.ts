import { Request, Response } from 'express';
import { Mensaje } from '../models/mensaje';

export const obtenerMensajes = async (req: any, res: Response) => {
  const { id } = req.params;
  const miId = req.uid;

  const mensajes = await Mensaje.find({
    $or: [
      { remitente: miId, para: id },
      { remitente: id, para: miId },
    ],
  }).sort({ createdAt: 'asc' });

  res.json({ ok: true, mensajes, miId, id });
};

export const crearMensaje = async (req: Request, res: Response) => {
  const { conversacion, remitente, mensaje } = req.body;

  const nuevoMensaje = new Mensaje({ conversacion, remitente, mensaje });

  try {
    const mensajeGuardado = await nuevoMensaje.save();

    res.status(200).json({ ok: true, msg: 'Mensaje enviado', mensajeGuardado });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ ok: false, error });
  }
};
