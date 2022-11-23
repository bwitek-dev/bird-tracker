import apiKey from "./api";
const birdApiUrl = "https://api.ebird.org/v2";
const countriesApi = "https://restcountries.com/v3.1";

export const environment = {
  production: true,
  apiBirdLocations: `${birdApiUrl}/data/obs`,
  apiBirdTaxonomy: `${birdApiUrl}/ref/taxonomy/ebird?fmt=json`,
  apiAllCountries : `${countriesApi}/all`,
  apiKey: apiKey
};
