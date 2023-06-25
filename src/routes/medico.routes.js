//* archivo para crear lar URL del Servidor

import { Router } from "express";
import {
  crearMedico,
  deleteMedico,
  getMedico,
  getMedicos,
  updateMedico,
} from "../controllers/medicoDAO.controller.js";

// función de express para manejar las rutas
const router = Router();

//rutas

router.get("/medicos", getMedicos);
router.get("/medico/:id", getMedico);
router.post("/medico", crearMedico);
router.put("/medico/:id", updateMedico);
router.delete("/medico/:id", deleteMedico);

export default router;
