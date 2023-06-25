//* definir la tabla que se va a crear en la base de datos

import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import { Consulta } from "./Consulta.js";

export const Paciente = sequelize.define(
  "paciente",
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
      allowNull: true,
    },
    fecha_nac: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    tipo: {
      type: DataTypes.STRING,
      allowNull: false,
      /*       validate: {
        isIn: [["P", "D"]],
        msg: "El tipo solo puede ser paciente o doctor",
      }, */
      defaultValue: "P",
    },
  },
  {
    timestamps: false,
  },
  {
    tableName: "paciente",
  },
  {
    freezeTableName: true,
  }
);

//* relaciones

// Un paciente puede tener varias consultas
Paciente.hasMany(Consulta, {
  foreignKey: {
    allowNull: false,
  },
  onDelete: "RESTRICT",
});
// Una consulta puede pertenecer a un solo paciente
Consulta.belongsTo(Paciente);
