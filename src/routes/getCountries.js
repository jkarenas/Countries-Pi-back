const { Country } = require("../db.js"); // Importar los modelos Country y Activity desde el archivo models.js
const { Activity } = require("../db.js");

const getCountries = async (req, res) => {
    const name = req.query.name;
    
    try {
     
      if (!name) {
        const countries = await Country.findAll({
          include: [{
            model: Activity,
            attributes: ['name', 'difficulty', 'duration', 'season'],
            through: { attributes: [] }
          }]
        });
  
        if (countries) {
          return res.status(200).json(countries);
        } else {
          return res.status(404).send("No se encontró paises");
        }
      } else {
        const country = await Country.findAll({
          where: {
            name: name
          },
          include: [{
            model: Activity,
            attributes: ['name', 'difficulty', 'duration', 'season'],
            through: { attributes: [] }
          }]
        });
  
        if (country) {
          return res.status(200).json(country);
        } else {
          return res.status(404).send("País no encontrado");
        }
      }
    } catch (error) {
      console.log(error);
      return res.status(500).send("Error en el servidor");
    }
  };

module.exports = getCountries