const BASE_URL = 'https://restcountries.eu/rest/v2';

function fetchCountry(countyName) {
  return fetch(`${BASE_URL}/name/${countyName}`).then(response => {
    return response.json();
  });
}

export default { fetchCountry };