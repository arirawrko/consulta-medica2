//* conexión a la base de datos con sequelize

import Sequelize from "sequelize";

// parámetros de la BD a la que se va a conectar la aplicación
export const sequelize = new Sequelize(
  "sist_consulta_medica",
  "postgres",
  "1234",
  {
    host: "localhost",
    dialect: "postgres",
  }
);
