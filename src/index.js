//* encargado de arrancar la aplicación

import app from "./app.js";
import { sequelize } from "./database/database.js";


import {fileURLToPath} from 'url';
import {dirname} from 'path';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function main() {
  try {
    await sequelize.sync({ force: false });
    console.log("Conexión establecida exitosamente");
    app.listen(4000);
    console.log("Servidor corriendo en el puerto ", 4000);

    console.log("-->"+__dirname+"<--");

    /* Para rederizar el index */
    app.set("view engine", "ejs");
    app.set("views", __dirname + "/views");

    app.get("/", (req, res) => {
      res.render("index");
    });
  } catch (error) {
    console.error("No se puede conectar a la base de datos", error);
  }
}

main();
