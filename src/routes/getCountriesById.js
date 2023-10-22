const { Country } = require("../db");
const {Activity} = require("../db")// Importar los modelos Country y Activity desde el archivo models.js
const { Op } = require('sequelize');

const getCountriesById = async (req, res) => {
      const idPais = req.params.id;
      console.log(idPais)
      try {
        const country = await Country.findOne({
          where: {
            id: idPais.toUpperCase()
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
      } catch (error) {
        console.log(error);
        return res.status(500).send("Error en el servidor");
      }
    };

module.exports = getCountriesById