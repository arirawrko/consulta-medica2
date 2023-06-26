//* archivo para crear lar URL del Servidor

import { Router } from "express";
import {
  crearConsulta,
  getConsulta,
} from "../controllers/consultaDAO.controller.js";

// función de express para manejar las rutas
const router = Router();

//rutas

router.get("/consulta/buscar", getConsulta);
router.post("/consulta", crearConsulta);

export default router;
