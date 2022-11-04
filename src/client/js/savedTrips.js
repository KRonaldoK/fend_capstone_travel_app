import { calculateDaysAway, buildHTMLTripCardTemplate } from './tripUtilities'

/**
 * Retrieves all saved trips by the user and then for each one stored trip retrieved,
 * builds the corresponding html card with the trip info and adds it to the view/DOM.
 */
const renderSavedTrips = () => {
    const localStorageSavedTrips = JSON.parse(localStorage.getItem('savedTrips') || "[]")

    let documentFragment = new DocumentFragment()
    for (let localStorageSavedTrip of localStorageSavedTrips) {
      const cardElement = document.createElement('div')
      cardElement.classList.add('card', 'card--column');

      const daysAway = calculateDaysAway(
        localStorageSavedTrip.departureDate
      )

      cardElement.innerHTML = buildHTMLTripCardTemplate(
        localStorageSavedTrip.locationImageData.webformatURL,
        localStorageSavedTrip.destination,
        daysAway,
        localStorageSavedTrip.weatherForecastData,
        localStorageSavedTrip.id,
        localStorageSavedTrip.departureDate,
        false
      );

      documentFragment.appendChild(cardElement);
    }
    const savedTripsSection = document.getElementById('savedTripsSection')
    savedTripsSection.innerHTML = ''
    savedTripsSection.appendChild(documentFragment)
}

/**
 * When the page is completely loaded show the saved trips.
 */
document.addEventListener('DOMContentLoaded', () => {
  renderSavedTrips()
})

/**
 * Saves the current searched trip to the browser local storage, adding it to the already saved trips.
 * Only saves trips that wasn't saved yet to avoid duplication.
 * @returns {Promise<void>}
 */
const saveTrip = async () => {
      const currentTrip = JSON.parse(localStorage.getItem('currentTrip'))
      if (currentTrip) {
        let savedTrips = JSON.parse(localStorage.getItem('savedTrips') || "[]")
        if (isTripSaved(currentTrip, savedTrips)) {
            return
        }
        savedTrips.push(currentTrip)
        localStorage.setItem('savedTrips', JSON.stringify(savedTrips))
        renderSavedTrips()
      }
}

/**
 * Remove an already saved trip from browser local storage.
 * @returns {Promise<void>}
 */
const removeTrip = async () => {
    const tripId = event.target.dataset.tripId
    let savedTrips = JSON.parse(localStorage.getItem('savedTrips') || "[]")
    savedTrips = savedTrips.filter((savedTrip) => {
      return savedTrip.id != tripId
    })
    localStorage.setItem('savedTrips', JSON.stringify(savedTrips))
    const parentCardElelement = event.target.closest('.card')
    parentCardElelement.remove()
}

/**
 * Verifies if the trip was already saved before in the browser local storage.
 * @param tripToSave Information gathered from the searched trip results.
 * @param savedTrips Local storage array of saved trips.
 * @returns {*} True (was already saved) ou false (it is not currently saved yet)
 */
const isTripSaved = (tripToSave, savedTrips) => {
    return savedTrips.some((trip, index) => {
      if ( (trip.coordinatesData.geonameId === tripToSave.id) && (trip.departureDate === tripToSave.departureDate) ) {
        return true
      } else{
        return false
      }
    })
}

export { saveTrip, removeTrip }
