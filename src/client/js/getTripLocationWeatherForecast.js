const getTripLocationWeatherForecast = async (daysAway, lat, lon) => {
  try{
    const weatherResponse = await fetch(`/weatherForecast?lat=${lat}&lon=${lon}&daysAway=${daysAway}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const weatherData = await weatherResponse.json()
    return weatherData;
  } catch (e){
    console.log(e)
    throw e
  }

}

export { getTripLocationWeatherForecast };
