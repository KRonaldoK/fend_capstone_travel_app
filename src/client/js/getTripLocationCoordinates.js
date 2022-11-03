const getTripLocationCoordinates = async (destination) => {
    try{
        const coordinatesResponse = await fetch(`/locationCoordinates?destination=${destination}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        })
        const coordinates = await coordinatesResponse.json()
        return coordinates
    } catch (e){
        console.log(e)
        throw e
    }
}

export { getTripLocationCoordinates }
