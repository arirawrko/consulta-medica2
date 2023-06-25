//* definir la tabla que se va a crear en la base de datos

import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

export const ConsultaDetalle = sequelize.define(
  "consulta_detalle",
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
    motivo: {
      type: DataTypes.STRING,
      allowNull: false
    },
    diagnostico: {
      type: DataTypes.STRING,
      allowNull:false
    },
    tratamiento: {
      type: DataTypes.STRING,
      allowNull:false
    }
  },
  {
    timestamps: false,
  },
  {
    tableName: "consulta_detalle",
  },
  {
    freezeTableName: true,
  }
);
