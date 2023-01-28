import './css/styles.css';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
import { fetchCountries } from './fetchCountries.js';

const DEBOUNCE_DELAY = 300;
const inputCountry = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryDetails = document.querySelector('.country-info');


inputCountry.addEventListener('input', debounce(event => {
    const name = short(event.target.value);
    name !== '' ? getCountryInfo(name) : clear();
  }, DEBOUNCE_DELAY)
);

function getCountryInfo(name) {
  fetchCountries(name)
    .then(country => {
      if (country.length > 1 && country.length <= 10) {
         return addToList(country);
      }
      if (country.length > 10) {
        clear();
        return Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
      }
      return showCountryDetails(country);
    })
    .catch(() => {
      clear();
      Notiflix.Notify.failure('Oops, there is no country with that name');
    });
}

function clear() {
  countryList.innerHTML = '';
  countryDetails.innerHTML = '';
}

function addToList(countries) {
  clear();
  const list = countries.sort((first, second) =>
      first.name.common.localeCompare(second.name.common)
    ).map(country =>
        `<li class="country-list__item">
        <img src="${country.flags.svg}" />
           <p>${country.name.common}</p>
         </li>`
    ).join('\n');
  countryList.innerHTML = list;
}

function showCountryDetails(country) {
  clear();
  const languages = Object.values(country[0].languages).join(', ');
  const info = country.map(
    country =>
      `<h2><img src="${country.flags.svg}" />${country.name.common}</h3>
         <p><span class="bold">Capital: </span>${country.capital}</p>
         <p><span class="bold">Population: </span>${country.population}</p>
         <p><span class="bold">Laungages: </span>${languages}</p>`
  );
  countryDetails.innerHTML = info;
}

function short(name) {
    let subject = '';
    name.split(' ').forEach((element, i) => {
        if (element !== '') {
            subject += ' ' + element;
        }
    });
    return subject.trim();
}