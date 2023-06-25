//* funciones que se van a ejecutar cuando se llegue a medico

import { json } from "sequelize";
import { Consulta } from "../models/Consulta.js";
import { ConsultaDetalle } from "../models/ConsultaDetalle.js";

export const crearConsulta = async (req, res) => {
  try {
    const { pacienteId, medicoId, detalle } = req.body;
    const newConsulta = await Consulta.create({
      pacienteId,
      medicoId,
    });
    console.log(newConsulta)
    const id_consulta = newConsulta.getDataValue("id");
    console.log("ID Consulta es este: ", id_consulta)
    let consultaDetalle = await Promise.all(
      detalle.map(async (element) => {
        let aux = {
          consultumId: id_consulta,
          motivo: element.motivo,
          diagnostico: element.diagnostico,
          tratamiento: element.tratamiento
        }
        let newConsultaDetalle= await ConsultaDetalle.create(aux);
        console.log("Consulta Detalle: " + aux.id_consulta + "- " + element)
        return newConsultaDetalle
      })
    );
    console.log(consultaDetalle)
    const data = {
      status: "Exito",
      consulta: newConsulta,
      consultaDetalleMas: consultaDetalle
    }
    console.log("Terminando proceso")
    res.json(data)
  } catch (error) {
    return res.status(500).json({ Message: error.message });
  }
};

export const getConsulta = async (req, res) => {
  // http://localhost:4000/buscar?especialidad=esp1&idMedico=3&paciente=4
  try {
    const {id1, id2} = req.query
    if (id1 === 'especialidad') {
      const consultas = await Consulta.findAll({
        where: {especialidad: id2}
      })
      res.json(consultas)
    }else if (id1 === 'medico') {
      const consultas = await Consulta.findAll({
        where: {nombre: id2}
      })
      res.json(consultas)
    }else {
      const consultas = await Consulta.findAll({
        where: {createdAt: id2}
      })
      res.json(consultas)
    }
  } catch (error) {
    return res.status(500).json({ Message: error.message });
  }
}