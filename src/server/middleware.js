const dotenv = require('dotenv');
dotenv.config();

const axios = require('axios')

const {GEONAMES_API_USERNAME, WEATHERBIT_API_KEY, PIXABAY_API_KEY, WEATHERBIT_API_BASE_URL, GEONAMES_API_BASE_URL, PIXABAY_API_BASE_URL} = require('./constants.js')

exports.getTravelAppHome = (req, res) => {
    res.sendFile('./dist/index.html');
};

exports.getLocation = async (req, res) => {
    const destination = req.query.destination
    try{
      const response = await axios.get(
          `${GEONAMES_API_BASE_URL}&q=${destination}&username=${GEONAMES_API_USERNAME}`
      );
      res.send(response.data)
    } catch (e){
      console.log(e)
      throw e
    }
}

exports.getWeatherForecast = async (req, res) => {
    const lat = req.query.lat
    const lon = req.query.lon
    let daysAway = parseInt(req.query.daysAway)
    //console.log(`daysAway received was [${daysAway}]`)
    try{
      const response = await axios.get(
        `${WEATHERBIT_API_BASE_URL}?lat=${lat}&lon=${lon}&key=${WEATHERBIT_API_KEY}`
      )
      const weatherForecastDayInfo = getWeatherForecastFromResultsForTripDay(response);
      res.send(weatherForecastDayInfo)
    } catch (e){
      console.log(e)
      throw e
    }
    function getWeatherForecastFromResultsForTripDay(response) {
      const weatherDayInfoArray = response.data.data;
      setDaysAwayToValidIndex();
      //console.log(`daysAway to be used is [${daysAway}]`)
      //console.log(JSON.stringify(weatherDayInfoArray[daysAway]))
      const weatherDayInfo = { data: weatherDayInfoArray[daysAway] };
      return weatherDayInfo;
      function setDaysAwayToValidIndex() {
        while (typeof weatherDayInfoArray[daysAway] === 'undefined') {
          daysAway--;
        }
      }
    }
}

exports.getLocationImage = async (req, res) => {
  const destination = req.query.destination
  try{
    const response = await axios.get(
        `${PIXABAY_API_BASE_URL}&q=${destination}&key=${PIXABAY_API_KEY}`
    )
    res.send(response.data)
  } catch (e){
    console.log(e)
    throw e
  }
}
