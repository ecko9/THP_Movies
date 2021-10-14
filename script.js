let myKey = "apikey=????????";
let url = "http://www.omdbapi.com/?";
let mySearch = "";
let form = document.querySelector('#form');
let search = document.querySelector('#search');
let selector = document.querySelector('#info');
let selectorDetails = document.querySelector('#details');

form.addEventListener('submit', (event) => {
  if (search.value != null && search.value != "") {
    fetch(`${url}s=${search.value}&${myKey}`)
      .then((response) => response.json())
      .then((response) => displaySearch(response.Search))
      .catch((error) => console.error('error:', error));
  }
  event.preventDefault();
})

const displayFilm = (hash) => {
  if (selectorDetails != undefined || selectorDetails != null)
    selectorDetails.remove();
  document.querySelector('body').insertAdjacentHTML('beforebegin', `<div id="details"></div>`);
  selectorDetails = document.querySelector('#details');
  let title = hash.Title;
  let actors = hash.Actors;
  let country = hash.Country;
  let dvd = hash.DVD;
  let director = hash.Director;
  let genre = hash.Genre;
  let metascore = hash.Metascore;
  let synopsis = hash.Plot;
  let time = hash.Runtime;
  let year = hash.Year;

  selectorDetails.insertAdjacentHTML("beforeend", `<p>Film: ${title}<br/>Année: ${year}<br/>Sortie dvd: ${dvd}<br/>Genre: ${genre}<br/>Pays: ${country}<br/>Directeur: ${director}<br/>Acteurs: ${actors}<br/>Durée: ${time}<br/>Note: ${metascore}<br/>Synopsis: ${synopsis}<br/></p>`);
}

const displaySearch = (hash) => {
  if (selector != undefined || selector != null)
    selector.remove();
  form.insertAdjacentHTML("beforeend", `<div id="info"></div>`);
  selector = document.querySelector('#info');
  for (let film of hash) {
    let title = film.Title;
    let year = film.Year;
    let type = film.Type;
    let img = film.Poster;
    let imdbID = film.imdbID;

    selector.insertAdjacentHTML("beforeend", `<img src="${img}" alt="poster du film ${title}" id="${imdbID}"/>`);
    let selectedImg = document.querySelector(`#${imdbID}`);
    selectedImg.addEventListener('click', (e) => {
      fetch(`${url}i=${imdbID}&${myKey}`)
        .then((response) => response.json())
        .then((response) => displayFilm(response))
        .catch((error) => console.error('error:', error));
    })
    selector.insertAdjacentHTML("beforeend", `<p>Film: ${title}<br/>Année: ${year}<br/>Type: ${type}<br/></p>`);
  }
}