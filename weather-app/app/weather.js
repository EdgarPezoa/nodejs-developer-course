const axios = require("axios");
const API_KEY = "5a35837a013d02bf1359d65b1ee70969";
const BASE_URL = "http://api.weatherstack.com/";

const getWeather = (query) => {
    const url =
        BASE_URL + "current" + "?access_key=" + API_KEY + "&query=" + query;
    return axios
        .get(url)
        .then(({ data }) => {
            return data;
        })
        .catch((error) => {
            return { error: "Hubo un error al llamar al API" };
        });
};

module.exports = {
    getWeather
}