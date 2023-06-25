//* encargado de arrancar la aplicación

import app from "./app.js";
import { sequelize } from "./database/database.js";

async function main() {
  try {
    await sequelize.sync({ force: true });
    console.log("Conexión establecida exitosamente");
    app.listen(4000);
    console.log("Servidor corriendo en el puerto ", 4000);
  } catch (error) {
    console.error("No se puede conectar a la base de datos", error);
  }
}

main();
