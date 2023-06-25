//* funciones que se van a ejecutar cuando se llegue a medico 

import {Medico} from '../models/Medico.js';

export const crearMedico = async (req, res) => {
  try {
    const { nombre, apellido, cedula, email, telefono, fecha_nac, especialidad, tipo } =
      req.body; // recuperar los parámetros del body para la inserción en la BD

    //usar create de sequelize para asignar lo recuperado del req para crear un nuevo medico
    const newMedico= await Medico.create({
      nombre,
      apellido,
      cedula,
      email,
      telefono,
      fecha_nac,
      especialidad,
      tipo,
    });

    //enviar la respuesta al cliente en formato json
    res.json(newMedico);
  } catch (error) {
    return res.status(500).json({ Message: error.message });
  }
};

export const getMedicos = async (req, res) => {
  try {
    //método de sequelize para obtener todas los medicos
    const medicos = await Medico.findAll();
    //enviar al cliente
    res.json(medicos);
  } catch (error) {
    return res.status(500).json({ Message: error.message });
  }
};

export const getMedico = async (req, res) => {
  try {
    // extraer el id de un medico del request

    const { id } = req.params;
    // buscar en la BD por el id
    const medico = await Medico.findOne({
      where: {
        id,
      },
    });

    // validar que exista el medico
    if (!medico)
      return res.status(200).json({ id: 0, message: "Medico no existe!" });
    res.json(medico);
  } catch (error) {
    return res.status(500).json({ Message: error.message });
  }
};
export const updateMedico = async (req, res) => {
  try {
    const { id } = req.params;
    const medico = await Medico.findOne({
      where: {
        id,
      },
    });

    medico.set(req.body);
    await medico.save();
    console.log(medico);
    return res.json(medico);
  } catch (error) {
    return res.status(500).json({ Message: error.message });
  }
};
export const deleteMedico = async (req, res) => {
  const { id } = req.params;
  try {
    // buscar y eliminar a la vez por id
    const result = await Medico.destroy({
      where: { id },
    });
    console.log(result)
    return res.sendStatus(204)
  } catch (error) {
    return res.status(500).json({ Message: error.message });
  }
};
