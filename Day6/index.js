const API = 'https://pokeapi.co/api/v2/pokemon/';
const descriptionAPI = 'https://pokeapi.co/api/v2/pokemon-species/';
const moreDetailsPopUp = document.getElementById('more-details');
const overlay = document.getElementById('overlay');
const overlay2 = document.getElementById('overlay2');
const main = document.getElementById('main');
const closePopUpBtn = document.getElementById('close');

async function getData() {
  let response = await fetch(API + '?limit=240');
  let data = await response.json();

  renderData(data.results);
}
async function renderData(data) {
  let stringData = '';
  for (let i = 0; i < data.length; i++) {
    let index = i + 1;
    let name = data[i].name.charAt(0).toUpperCase() + data[i].name.slice(1);
    stringData += createCard(index, name);
  }
  main.innerHTML = stringData;
}

async function getPokemonInfo(index) {
  let response = await fetch(API + index);
  let data = await response.json();
  let descriptionRespone = await fetch(descriptionAPI + index);
  let descriptionData = await descriptionRespone.json();
  let description = descriptionData.flavor_text_entries[0].flavor_text;
  let name = data.forms[0].name;
  let abilities = data.abilities;
  let abilitiesString = '';
  for (let i = 0; i < abilities.length; i++) {
    if (i == 0) {
      abilitiesString += '';
    } else {
      abilitiesString += ', ';
    }
    abilitiesString += abilities[i].ability.name;
  }
  let height = `${String((data.height * 0.1).toFixed(1))} metre${
    data.height * 0.1 != 1 ? 's' : ''
  }`;
  let weight = `${String((data.weight * 0.1).toFixed(1))} kilogram${
    data.weight * 0.1 != 0 ? 's' : ''
  }`;
  let imgLink = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${index}.png`;
  showPopUpInfo(name, height, weight, abilitiesString, description, imgLink);
  hideLoading();
}

function createCard(index, name) {
  return `
    <div class="card mt-4" style="width: 20rem">
      <img class="card-img-top" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${index}.png">
      <div class="card-body">
        <h5 class="card-title" id="pokemon-name-${index}">${name}</h5>
        <a class="btn btn-primary" onclick="showDetailPopUp(${index})">More Detail</a>
      </div>
    </div>`;
}

function showDetailPopUp(index) {
  showLoading();
  getPokemonInfo(index);
  moreDetailsPopUp.classList.add('more-details-active');
  overlay.classList.add('overlay-active');
}

function removeDetailsPopUp() {
  showPopUpInfo();
  moreDetailsPopUp.classList.remove('more-details-active');
  overlay.classList.remove('overlay-active');
}

function showPopUpInfo(
  name = '',
  height = '',
  weight = '',
  abilities = '',
  description = '',
  imgLink = ''
) {
  const nameNode = document.getElementById('pokemon-name');
  const abilitiesNode = document.getElementById('pokemon-abilities');
  const heightNode = document.getElementById('pokemon-height');
  const weightNode = document.getElementById('pokemon-weight');
  const descriptionNode = document.getElementById('pokemon-description');
  const img = document.getElementById('pokemon-image');
  nameNode.textContent = name;
  abilitiesNode.textContent = abilities;
  heightNode.textContent = height;
  weightNode.textContent = weight;
  descriptionNode.textContent = description;
  img.src = imgLink;
}
const showLoading = () => {
  overlay2.classList.remove('d-none');
  overlay2.classList.add('d-flex');
};
const hideLoading = () => {
  overlay2.classList.remove('d-flex');
  overlay2.classList.add('d-none');
};
getData();
closePopUpBtn.onclick = removeDetailsPopUp;
overlay.onclick = removeDetailsPopUp;
