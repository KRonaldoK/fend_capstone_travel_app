import { calculateDaysAway, buildHTMLTripCardTemplate } from './tripUtilities'

const savedTripsSection = document.getElementById('savedTripsSection')

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

document.addEventListener('DOMContentLoaded', () => {
  renderSavedTrips()
})

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

const removeTrip = async (url = '/remove-saved-trip', data = {}) => {
    const tripId = event.target.dataset.tripId
    let savedTrips = JSON.parse(localStorage.getItem('savedTrips') || "[]")
    savedTrips = savedTrips.filter((savedTrip) => {
      return savedTrip.id != tripId
    })
    localStorage.setItem('savedTrips', JSON.stringify(savedTrips))
    const parentCardElelement = event.target.closest('.card')
    parentCardElelement.remove()
}

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
