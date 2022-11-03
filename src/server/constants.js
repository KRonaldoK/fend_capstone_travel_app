const GEONAMES_API_USERNAME = process.env.GEONAMES_USERNAME;
const WEATHERBIT_API_KEY = process.env.WEATHERBIT_API_KEY;
const PIXABAY_API_KEY = process.env.PIXABAY_API_KEY;
const WEATHERBIT_API_BASE_URL = "https://api.weatherbit.io/v2.0/forecast/daily"
const GEONAMES_API_BASE_URL = "http://api.geonames.org/searchJSON?formatted=true"
const PIXABAY_API_BASE_URL = "https://pixabay.com/api/?image_type=photo&category=travel&safesearch=true&order=popular&orientation=horizontal"

module.exports = {GEONAMES_API_USERNAME: GEONAMES_API_USERNAME, WEATHERBIT_API_KEY, PIXABAY_API_KEY, WEATHERBIT_API_BASE_URL, GEONAMES_API_BASE_URL, PIXABAY_API_BASE_URL}
