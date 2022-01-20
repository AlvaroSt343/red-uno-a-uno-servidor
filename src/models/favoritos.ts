import { Schema, model, Types } from "mongoose";

interface Favorito {
  usuario: Types.ObjectId;
  inmueble: Types.ObjectId;
}

const FavoritoSchema = new Schema<Favorito>(
  {
    usuario: { type: Schema.Types.ObjectId, ref: "Usuario", required: true },
    inmueble: { type: Schema.Types.ObjectId, ref: "Inmueble", required: true },
  },
  { timestamps: true }
);

FavoritoSchema.methods.toJSON = function () {
  const { __v, ...data } = this.toObject();

  return data;
};

export const Favorito = model<Favorito>("Favorito", FavoritoSchema);
