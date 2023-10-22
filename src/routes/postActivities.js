const {Activity} = require("../db")
const { Op } = require("sequelize")
const {Country} = require("../db")

const postActivities = async (req,res,next)=>{
    try {
        const {name, difficulty, duration, season, countries}= req.body
        console.log("Received data:", { name, difficulty, duration, season, countries });
        if(name && difficulty && duration && season && countries){
            const activity = await Activity.create({
                name,
                difficulty,
                duration,
                season,
            });
            const countriesArray = Array.isArray(countries) ? countries : countries.split(',');
            console.log("countriesArray",countriesArray)
            for (const name of countriesArray) {
                const country = await Country.findOne({
                  where: { name: { [Op.iLike]: `%${name}%` } }
                });
                if (country) {
                  console.log("Found country:", country);
                  await country?.addActivity(activity);
                } else {
                  console.log(`El país con nombre ${name} no fue encontrado en la base de datos.`);
                }
              }
    
            return res.send(activity)
        } else {
            return res.status(404).json('Missing data')
        }
    } catch (error) {
        next(error)
    }
    }
    
    
    
    module.exports = postActivities;


//     const {Activity} = require("../db")
// const { Op } = require("sequelize")
// const {Country} = require("../db")

// const postActivities = async (req,res,next)=>{
//     try {
//         const {name, difficulty, duration, season, countries}= req.body
//         if(name && difficulty && duration && season && countries){
//             const activity = await Activity.create({
//                 name,
//                 difficulty,
//                 duration,
//                 season,
                
//             });
//             const countriesArray = Array.isArray(countries) ? countries : countries.split(',');
//             console.log(countriesArray)
//             for (const name of countriesArray) {
//                 const country = await Country.findOne({
//                   where: { name: { [Op.iLike]: `%${name}%` } }
//                 });
//                 if (country) {
//                   console.log(country);
//                   await country?.addActivity(activity);
//                 } else {
//                   console.log(`El país con nombre ${name} no fue encontrado en la base de datos.`);
//                 }
//               }
    
//             return res.send(activity)
//         } else {
//             return res.status(404).json('Missing data')
//         }
//     } catch (error) {
//         next(error)
//     }
//     }
    
    
    
//     module.exports = postActivities;