const container = document.querySelector(".container");

const searchInput = document.getElementById("searchInput");
const countryContainer = document.getElementById("countryContainer");
const themeSwitcher = document.querySelector(".theme-switcher");

let allCountries = [];

fetch(
  "https://restcountries.com/v3.1/all?fields=name,capital,population,flags,region"
)
  .then((res) => res.json())
  .then((data) => {
    allCountries = data;
    displayCountries(allCountries);
    // console.log(allCountries);
  });

let timeout;

searchInput.addEventListener("input", function () {
  clearTimeout(timeout);

  timeout = setTimeout(() => {
    const searchValue = searchInput.value.toLowerCase().trim();

    const filteredCountries = allCountries.filter((country) => {
      return country.name.common.toLowerCase().includes(searchValue);
    });

    displayCountries(filteredCountries);
  }, 300);
});

function displayCountries(countries) {
  let cards = "";

  countries.forEach((country) => {
    cards += `
        <div class="countryCard">
            <img src="${country.flags.png}" width="100%">
            <h2>${country.name.common}</h2>
            <p>Capital: ${
              country.capital ? country.capital[0] : "No Capital"
            }</p>
            <div class="about">
            <p>Population: ${country.population.toLocaleString()}</p>
            <p>Region: ${country.region}</p>
            </div>
        </div>
        `;
  });

  countryContainer.innerHTML = cards;
}

themeSwitcher.addEventListener("click", () => {
  container.classList.toggle("lightMode");
});
