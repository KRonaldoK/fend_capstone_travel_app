const calculateDaysAway = (futureDate) => {
  const oneDay = 24 * 60 * 60 * 1000
  futureDate = new Date(futureDate).setHours(24,0,0,0)
  const today = new Date().setHours(0,0,0,0)
  const diffDays = Math.trunc((futureDate - today) / oneDay)
  return diffDays
}

const buildHTMLTripCardTemplate = (
  destinationImage,
  destination,
  daysToGo,
  weatherData,
  savedTripId,
  departureDate,
  save = true
) => {
  if (!destinationImage) {
    destinationImage = 'images/placeholder.png'
  }
  return `
        <div class="card__image">
            <img src="${destinationImage}">
        </div>
        <div class="card__body">
            <div class="card__text">
                ${
    save
      ? '<h2>' + destination + '</h2>'
      : '<h4>' + destination + '</h4>'
  }
                <p>${destination} is ${daysToGo} days away</p>
            </div>
            <div class="card__weather">
                <div class="card__weather--icon">
                    <img src="icons/${weatherData.weather.icon}.png" alt="">
                </div>
                <div class="card__weather--info">
                    <p class="temp">
                        ${weatherData.temp}<sup>&#8451;</sup>
                    </p>
                    <p>${weatherData.weather.description}</p>
                </div>
            </div>
        </div>
        <div class="card__footer">
            <button
                class="btn btn__save"
                type="button"
                data-trip-id="${savedTripId}"
                data-departure-date="${departureDate}"
                onclick="return ${
    save ? 'Client.saveTrip()' : 'Client.removeTrip()'
  }">
                    ${
    save
      ? ''
      : '<i class="far fa-trash-alt"></i>'
  }
                    ${save ? 'Save' : 'Remove'} Trip
            </button>
        </div>
    `;
}

export { calculateDaysAway, buildHTMLTripCardTemplate }
