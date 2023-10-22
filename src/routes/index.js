const { Router } = require("express");

const countriesInDb = require("./countriesInDb.js")
const getCountriesById = require("./getCountriesById.js")
const getCountries = require("./getCountries.js")
const getActivities = require("./getActivities.js")
const postActivities = require("./postActivities.js")

const router = Router();




router.use("/",countriesInDb)
router.get("/countries/:id",getCountriesById)
router.get("/countries",getCountries)
router.get("/activity",getActivities)
router.post("/activity",postActivities)

module.exports = router;
