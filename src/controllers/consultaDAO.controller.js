//* funciones que se van a ejecutar cuando se llegue a medico

import { Consulta } from "../models/Consulta.js";
import { ConsultaDetalle } from "../models/ConsultaDetalle.js";

export const crearConsulta = async (req, res) => {
  try {
    const { pacienteId, medicoId, motivo, diagnostico, tratamiento } = req.body;
    const newConsulta = Consulta.create({
      pacienteId,
      medicoId,
    });
    const id_consumo = newConsumo.getDataValue("id");
    let consumoDetalle = await Promise.all(
      motivo.map(async (element) => {
        let newConsumoDetalle = await ConsultaDetalle.create({
          consumoId: id_consumo,
          motivo,
          diagnostico,
          tratamiento,
        });
      })
    );
  } catch (error) {
    return res.status(500).json({ Message: error.message });
  }
};
