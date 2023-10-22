// Ruta para desplegar actividades
const {Activity} = require("../db")

const getActivities = async (req, res) => {

    const activities = await Activity.findAll();
    if(activities) {
      return res.status(200).json(activities);
    } else {
      return res.status(404).json(activities.length ? activities :"No se encontraron activdades"); 
    }
  
  };

  module.exports = getActivities