import { fetchBreeds, fetchCatByBreed } from './CatsApi';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import Notiflix from 'notiflix';

const selectEl = new SlimSelect({
  select: '.breed-select',
  events: {
    afterClose: () => {
      onChange();
    },
  },
});
const loadingEl = document.querySelector('.loader');
const errorMessageEl = document.querySelector('.error');
const catInfoEl = document.querySelector('.cat-info');

window.addEventListener('DOMContentLoaded', () => {
  hideElements(selectEl);
  hideElements(errorMessageEl);
  loadData();
});

function loadData() {
  fetchBreeds()
    .then(data => createOptionsArray(data))
    .then(optionsArray => {
      updateSelectOptions(optionsArray);
      showElements(selectEl);
      hideElements(loadingEl);
    })
    .catch(error => {
      Notiflix.Notify.failure(error);
      hideElements(loadingEl);
      showElements(errorMessageEl);
    });
}

function createOptionsArray(data) {
  const optionsArray = [];

  data.forEach(({ id, name }) => {
    optionsArray.push({ text: name, value: id });
  });

  return optionsArray;
}

function updateSelectOptions(optionsArray) {
  selectEl.setData(optionsArray);
}

function hideElements(element) {
  if (element === selectEl) {
    selectEl.selectEl.classList.add('ss-hide');
    return;
  }
  element.classList.add('hidden');
}

function showElements(element) {
  if (element === selectEl) {
    selectEl.selectEl.classList.remove('ss-hide');
    return;
  }
  element.classList.remove('hidden');
}

function onChange() {
  const selectedOptionValue = selectEl.selectEl.value;
  showElements(loadingEl);
  hideElements(catInfoEl);
  loadDataByCatId(selectedOptionValue);
}

function loadDataByCatId(id) {
  fetchCatByBreed(id)
    .then(data => createCatMarkup(data))
    .then(markup => {
      hideElements(loadingEl);
      showElements(catInfoEl);
      printCatInfo(markup);
    })
    .catch(error => {
      Notiflix.Notify.failure(error);
      hideElements(loadingEl);
      showElements(errorMessageEl);
    });
}

function createCatMarkup(data) {
  const catImage = data[0].url;
  const catName = data[0].breeds[0].name;
  const catDescription = data[0].breeds[0].description;
  const catTemperament = data[0].breeds[0].temperament;

  return `
    <img src="${catImage}" alt="cat" />
    <div>
      <h3>${catName}</h3>
      <p>${catDescription}</p>
      <p><b>Temperament: </b>${catTemperament}</p>
    </div>
  `;
}

function printCatInfo(markup) {
  catInfoEl.innerHTML = markup;
}
