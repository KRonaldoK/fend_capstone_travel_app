const getTripLocationImage = async (destination) => {
    try{
          const locationImageResponse = await fetch(`/locationImage?destination=${destination}`, {
              method: 'GET',
              headers: {
                  'Content-Type': 'application/json'
              }
          })
          const locationImageData = await locationImageResponse.json()
          return locationImageData
    } catch (e){
          console.log(e)
          throw e
    }
}

export { getTripLocationImage }
