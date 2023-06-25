//* definir la tabla que se va a crear en la base de datos

import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import { ConsultaDetalle } from "./ConsultaDetalle.js";

export const Consulta = sequelize.define(
  "consulta",
  //Aquí se definen los atributos del modelo
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      get() {
        return this.getDataValue("id");
      },
    },
  }
);

//* relaciones

// una consulta puede tener muchas consulta_detalles
Consulta.hasMany(ConsultaDetalle, {
  foreignKey: {
    allowNull: false,
  },
  onDelete: "RESTRICT",
});
// una consulta_detalle pertenece a una consulta
ConsultaDetalle.belongsTo(Consulta);
