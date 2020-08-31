const express = require("express");
const router = express.Router();
const weather = require("../app/weather");
// const url = BASE_URL + "current" + "?access_key=" + API_KEY + "&query=" + query;

router.get("", (req, res) => {
    const query = req.query.query;
    console.log(query);
    if(query){
        res.status(200);
        return weather.getWeather(query).then((data) => res.send(data));
        
    }
    res.status(400);
    res.send({error: "Query was not provide"});
});

module.exports = router;
