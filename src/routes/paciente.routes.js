//* archivo para crear lar URL del Servidor

import { Router } from "express";
import {
  crearPaciente,
  deletePaciente,
  getPaciente,
  getPacientes,
  updatePaciente,
} from "../controllers/pacienteDAO.controller.js";

// función de express para manejar las rutas
const router = Router();

//rutas

router.get("/pacientes", getPacientes);
router.get("/paciente/:id", getPaciente);
router.post("/paciente", crearPaciente);
router.put("/paciente/:id", updatePaciente);
router.delete("/paciente/:id", deletePaciente);

export default router;
