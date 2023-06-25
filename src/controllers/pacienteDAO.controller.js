//* funciones que se van a ejecutar cuando se llegue a paciente
import { Paciente } from "../models/paciente.js";

export const crearPaciente = async (req, res) => {
  try {
    const { nombre, apellido, cedula, email, telefono, fecha_nac, tipo } =
      req.body; // recuperar los parámetros del body para la inserción en la BD

    //usar create de sequelize para asignar lo recuperado del req para crear un nuevo paciente
    const newPaciente = await Paciente.create({
      nombre,
      apellido,
      cedula,
      email,
      telefono,
      fecha_nac,
      tipo,
    });

    //enviar la respuesta al cliente en formato json
    res.json(newPaciente);
  } catch (error) {
    return res.status(500).json({ Message: error.message });
  }
};

export const getPacientes = async (req, res) => {
  try {
    //método de sequelize para obtener todas los pacientes
    const pacientes = await Paciente.findAll();
    //enviar al cliente
    res.json(pacientes);
  } catch (error) {
    return res.status(500).json({ Message: error.message });
  }
};

export const getPaciente = async (req, res) => {
  try {
    // extraer el id de un paciente del request

    const { id } = req.params;
    // buscar en la BD por el id
    const paciente = await Paciente.findOne({
      where: {
        id,
      },
    });

    // validar que exista el paciente
    if (!paciente)
      return res.status(200).json({ id: 0, message: "Paciente no existe!" });
    res.json(paciente);
  } catch (error) {
    return res.status(500).json({ Message: error.message });
  }
};
export const updatePaciente = async (req, res) => {
  try {
    const { id } = req.params;
    const paciente = await Paciente.findOne({
      where: {
        id,
      },
    });

    paciente.set(req.body);
    await paciente.save();
    console.log(paciente);
    return res.json(paciente);
  } catch (error) {
    return res.status(500).json({ Message: error.message });
  }
};
export const deletePaciente = async (req, res) => {
  const { id } = req.params;
  try {
    // buscar y eliminar a la vez por id
    const result = await Paciente.destroy({
      where: { id },
    });
    console.log(result)
    return res.sendStatus(204)
  } catch (error) {
    return res.status(500).json({ Message: error.message });
  }
};
