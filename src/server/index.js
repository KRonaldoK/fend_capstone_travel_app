const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const middleware = require('./middleware')

const app = express()
const port = 8081

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true}))
app.use(express.static('dist'))

app.listen(port, () => {
    console.log(`FEND Travel app listening on port ${port}`)
    validateEnvVariables()
    function validateEnvVariables() {
      if (!process.env.GEONAMES_USERNAME || !process.env.WEATHERBIT_API_KEY || !process.env.PIXABAY_API_KEY) {
        console.error('All Environment variables needed were not set')
      }
    }
})

app.get('/', middleware.getTravelAppHome)
app.get('/locationCoordinates', middleware.getLocation)
app.get('/weatherForecast', middleware.getWeatherForecast)
app.get('/locationImage', middleware.getLocationImage)

module.exports = app;
