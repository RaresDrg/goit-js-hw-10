const BREEDS_ENDPOINT = 'https://api.thecatapi.com/v1/breeds';
const CAT_ENDPOINT = 'https://api.thecatapi.com/v1/images/search';
const API_KEY =
  'live_5PSJH7OnACeC9l7rXlJbdHhhT4y6nq1PWy6XlpmfISwWjpusc94sAqAMyoazwfzo';

const options = {
  headers: {
    'X-Api-Key': API_KEY,
  },
};

function fetchBreeds() {
  return fetch(BREEDS_ENDPOINT, options).then(response => response.json());
}

function fetchCatByBreed(breedId) {
  const CAT_URL = `${CAT_ENDPOINT}?breed_ids=${breedId}`;

  return fetch(CAT_URL, options).then(response => response.json());
}

export { fetchBreeds, fetchCatByBreed };
