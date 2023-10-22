
const { Router } = require('express');
const { Op, Country, Activity } = require("../db");
const e = require('express'); // Corregir el nombre de la variable


const jsonFile = require("../../api/db.json");


const router = Router();

//trae los paises de la API
const getApiInfo = async () => {
    const map = jsonFile.countries.map(e => {
    const country = {
        id: e.cca3,
        name: e.name.common,
        image: e.flags.png,
        continent: e.continents[0],
        capital: e.capital != null ? e.capital[0] : "No data",
        subregion: e.subregion,
        area: e.area,
        population: e.population,
        
        }
        return country
    
    })
    return map
    
    };

    //Carga
    const countriesToDb = async () => {
        try {
            const countries = await Country.findAll();
            if(!countries.length) {
                const array = await getApiInfo();
                // console.log("Array de paises a insertar",array,"Array de paises a insertar")
                await Country.bulkCreate(array)
                }
        } catch (error) {
          console.log(error)
        }
    };

    //alimenta la DB con lo que trajo
   countriesToDb() 
    




    const checkCountriesInDb = async () => {
        try {
            const countries = await Country.findAll();
            // console.log(countries,"Países en la base de datos:" );
        } catch (error) {
            console.log(error,"Error al obtener países de la base de datos:" );
        }
    };
    
    // Llama a la función para verificar los países en la base de datos
    checkCountriesInDb();

module.exports = router;