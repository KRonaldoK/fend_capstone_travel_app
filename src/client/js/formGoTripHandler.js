import { calculateDaysAway, buildHTMLTripCardTemplate } from './tripUtilities'
import { checkGoTripFormUserInput } from './checkGoTripFormUserInput'
import { getTripLocationCoordinates } from './getTripLocationCoordinates'
import { getTripLocationWeatherForecast } from './getTripLocationWeatherForecast'
import { getTripLocationImage } from './getTripLocationImage'

const handleGoTripSubmit = async (event) => {
    event.preventDefault()

    const destination = document.getElementById('destination')
    const departureDate = document.getElementById('departureDate')

    const isFormValid = validateGoSearchForm();
    if (!isFormValid) return

    let weatherForecast
    let locationImage

    try {

        const locationCoordinates = await getTripLocationCoordinates(destination.value)

        if (locationCoordinates.geonames.length === 0) return

        const daysAway = calculateDaysAway(departureDate.value)

        weatherForecast = await getTripLocationWeatherForecast(daysAway, locationCoordinates.geonames[0].lat, locationCoordinates.geonames[0].lng)

        locationImage = await getTripLocationImage(destination.value)

        const searchResultsForTripLocation = {
            id: locationCoordinates.geonames[0].geonameId,
            departureDate: departureDate.value,
            destination: destination.value,
            coordinatesData: { ...locationCoordinates.geonames[0] },
            weatherForecastData: weatherForecast.data,
            locationImageData: { ...locationImage.hits[0] }
        }

        const tripCardHTML = buildHTMLTripCardTemplate(
          searchResultsForTripLocation.locationImageData.webformatURL,
          searchResultsForTripLocation.destination,
          daysAway,
          searchResultsForTripLocation.weatherForecastData,
          searchResultsForTripLocation.id,
          searchResultsForTripLocation.departureDate
        )

        const tripInfo = document.getElementById('tripInfo')

        tripInfo.innerHTML = `
            <div class="card">
                ${tripCardHTML}
            </div>
        `;

        localStorage.setItem('currentTrip', JSON.stringify(searchResultsForTripLocation))

    } catch (error) {
        console.error(error)
    }

    function validateGoSearchForm() {
      const formElements = [destination, departureDate]
      const isFormValid = checkGoTripFormUserInput(formElements)
      return isFormValid
    }
}

document.addEventListener('keydown', (e) => {
  return submitOnEnter()
  function submitOnEnter() {
    var keyCode = e.which || e.keyCode
    if (keyCode == 13) // enter
    {
      const destinationInputElement = document.getElementById('destination')
      const departureDateInputElement = document.getElementById('departureDate')
      if (!destinationInputElement.checkValidity()) {
        destinationInputElement.setCustomValidity('Please Enter a valid location to go!')
        return;
      } else {
        destinationInputElement.setCustomValidity('')
      }
      if (!departureDateInputElement.checkValidity()) {
        departureDateInputElement.setCustomValidity('Please select or inform a date for departure!')
        return
      } else {
        departureDateInputElement.setCustomValidity('')
      }
      return handleGoTripSubmit(e)
    }
  }
})

export { handleGoTripSubmit }
