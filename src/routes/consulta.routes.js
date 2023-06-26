//* archivo para crear lar URL del Servidor

import { Router } from "express";
import {
  crearConsulta,
  getConsulta,
} from "../controllers/consultaDAO.controller.js";

import { Paciente } from "./../models/paciente.js";
import { Medico } from "./../models/Medico.js";

// función de express para manejar las rutas
const router = Router();

//rutas

router.get("/consulta/buscar", getConsulta);
router.post("/consulta", crearConsulta);

router.get('/registro', async (req, res) => {
    
  res.render("crearconsulta");  
 });

 router.get('/informe', async (req, res) => {
    
  const medicos   = await Medico.findAll();
  const pacientes = await Paciente.findAll();;

  res.render("informeconsulta",
  {
    rows_medico: medicos,
    rows_paciente: pacientes 
  });  
 });

export default router;
