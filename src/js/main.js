import API from "./fetchCountries.js";

import { error } from '@pnotify/core';
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';

import countriesMarkup from '../templates/markup.hbs';
import countriesList from '../templates/list.hbs';
import debounce from 'lodash.debounce';

const refs = {
  input: document.querySelector('.input'),
  countriesList: document.querySelector('.js-card-container'),
};

refs.input.addEventListener('input', debounce(onSearch, 500));

function onSearch(e) {
  let countrySearch = e.target.value;
    clearMarkup();

  if (!countrySearch) {
    return;
  }

  API.fetchCountry(countrySearch).then(foundCountry).catch(onError);
}

function foundCountry(countries) {
  if (countries.length > 10) {
    tooManyMatchesFound();
  } else if (countries.length > 1 && countries.length <= 10) {
    renderCountryMarkup(countriesList, countries);
  } else if (countries.length === 1) {
    renderCountryMarkup(countriesMarkup, countries);
  } else {
    noResult();
  }
}

function renderCountryMarkup(option, countries) {
  const markup = option(countries);
  refs.countriesList.insertAdjacentHTML('beforeend', markup);
}

function clearMarkup() {
  refs.countriesList.innerHTML = '';
}

function onError(error) {
  clearMarkup();
}

function tooManyMatchesFound() {
  error({
    text: 'Too many matches found. Please, enter a more specific query!',
    delay: 2000,
  });
}

function noResult() {
  error({
    text: 'There is no matches. Please, try once more!',
    delay: 2000,
  });
}