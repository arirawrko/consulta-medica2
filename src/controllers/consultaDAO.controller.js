//* funciones que se van a ejecutar cuando se llegue a medico

import { json } from "sequelize";
import { Consulta } from "../models/Consulta.js";
import { ConsultaDetalle } from "../models/ConsultaDetalle.js";
import { Paciente } from "../models/paciente.js";
import { Medico } from "../models/Medico.js";
import { Op } from "sequelize";
export const crearConsulta = async (req, res) => {
  try {
    const { pacienteId, medicoId, fecha, detalle } = req.body;
    const newConsulta = await Consulta.create({
      pacienteId,
      medicoId,
      fecha,
    });
    console.log(newConsulta);
    const id_consulta = newConsulta.getDataValue("id");
    console.log("ID Consulta es este: ", id_consulta);
    let consultaDetalle = await Promise.all(
      detalle.map(async (element) => {
        let aux = {
          consultumId: id_consulta,
          motivo: element.motivo,
          diagnostico: element.diagnostico,
          tratamiento: element.tratamiento,
        };
        let newConsultaDetalle = await ConsultaDetalle.create(aux);
        console.log("Consulta Detalle: " + aux.id_consulta + "- " + element);
        return newConsultaDetalle;
      })
    );
    console.log(consultaDetalle);
    const data = {
      status: "Exito",
      consulta: newConsulta,
      consultaDetalleMas: consultaDetalle,
    };
    console.log("Terminando proceso");
    res.json(data);
  } catch (error) {
    return res.status(500).json({ Message: error.message });
  }
};

export const getConsulta = async (req, res) => {
  // http://localhost:4000/buscar?especialidad=esp1&idMedico=3&paciente=4
  try {
    const especialidad = req.query.especialidad || undefined;
    const medicoId = req.query.medicoId || undefined;
    const pacienteId = req.query.pacienteId || undefined;
    const fecha = req.query.fecha || undefined;

    let filtro = {};
    let filtro2 = {};
    if (especialidad !== undefined) {
      filtro2 = { especialidad: { [Op.eq]: especialidad } };
    }
    if (medicoId !== undefined) {
      filtro.medicoId = medicoId;
    }
    if (pacienteId !== undefined) {
      filtro.pacienteId = pacienteId;
    }
    if (fecha !== undefined) {
      filtro.fecha = fecha;
    }

    const newConsulta = await Consulta.findAll({
      where: filtro,
      include: [ConsultaDetalle, Paciente, { model: Medico, where: filtro2 }],
    });
    res.send(newConsulta);
  } catch (error) {
    return res.status(500).json({ Message: error.message });
  }
};
