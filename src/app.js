//* archivo que contine la configuración de express

import express from "express";
import cors from "cors";
import pacienteRoutes from "./routes/paciente.routes.js";
import medicoRoutes from './routes/medico.routes.js';
const app = express();

//middelwares para manejar las peticiones una vez que pasen por la aplicación

app.use(express.json());
app.use(cors());

app.use(pacienteRoutes);
app.use(medicoRoutes);

export default app;
