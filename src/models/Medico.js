//* definir la tabla que se va a crear en la base de datos

import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import { Consulta } from "./Consulta.js";

export const Medico = sequelize.define(
  "medico",
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
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    apellido: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cedula: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    telefono: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fecha_nac: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    especialidad: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tipo: {
      type: DataTypes.STRING,
      allowNull: false,
      /*       validate: {
        isIn: [["P", "D"]],
        msg: "El tipo solo puede ser paciente o doctor",
      }, */
      defaultValue: "M",
    },
  },
  {
    timestamps: false,
  },
  {
    tableName: "medico",
  },
  {
    freezeTableName: true,
  }
);

//* relaciones

// un médico puede tener varias consultas
Medico.hasMany(Consulta, {
  foreignKey: {
    allowNull: false,
  },
  onDelete: "RESTRICT",
});
// una consulta puede ser hecha por un solo médico
Consulta.belongsTo(Medico);
