const cpInput   = document.getElementById('codePostal');
const communeEl = document.getElementById('commune');
const searchBtn = document.getElementById('searchBtn');
const errorMsg  = document.getElementById('errorMsg');
const loader    = document.getElementById('loader');
const resultsEl = document.getElementById('results');

const showError = (msg) => {
  errorMsg.textContent = msg;
  errorMsg.classList.add('active');
};

const hideError = () => {
  errorMsg.textContent = '';
  errorMsg.classList.remove('active');
};

const setLoading = (on) => {
  loader.classList.toggle('active', on);
  searchBtn.disabled = on;
};

let cpTimeout = null;

cpInput.addEventListener('input', () => {
  const cp = cpInput.value.trim();
  hideError();

  communeEl.innerHTML = '<option value="">— Sélectionnez une commune —</option>';
  communeEl.disabled = true;
  searchBtn.disabled = true;

  if (!/^\d{5}$/.test(cp)) return;

  clearTimeout(cpTimeout);
  cpTimeout = setTimeout(() => fetchCommunes(cp), 400);
});

async function fetchCommunes(cp) {
  try {
    const url = `https://geo.api.gouv.fr/communes?codePostal=${cp}&fields=nom,code,codesPostaux&format=json`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Erreur HTTP ${res.status}`);
    const communes = await res.json();

    if (!communes.length) {
      showError('Aucune commune trouvée pour ce code postal.');
      return;
    }

    communeEl.innerHTML = '<option value="">— Choisissez une commune —</option>';
    communes
      .sort((a, b) => a.nom.localeCompare(b.nom))
      .forEach(c => {
        const opt = document.createElement('option');
        opt.value = c.code;
        opt.textContent = c.nom;
        communeEl.appendChild(opt);
      });

    communeEl.disabled = false;

    if (communes.length === 1) {
      communeEl.selectedIndex = 1;
      updateSearchBtn();
    }

  } catch (err) {
    showError('Impossible de récupérer les communes. Vérifiez votre connexion.');
    console.error(err);
  }
}

communeEl.addEventListener('change', updateSearchBtn);

function updateSearchBtn() {
  const ready = communeEl.value && communeEl.value !== "";
  searchBtn.disabled = !ready;
}

searchBtn.addEventListener('click', fetchWeather);

async function fetchWeather() {
  if (typeof API_KEY === 'undefined' || API_KEY === "VOTRE_CLÉ_ICI") {
    showError("Clé API manquante. Veuillez configurer config.js.");
    return;
  }

  hideError();
  resultsEl.style.display = 'none';
  resultsEl.innerHTML = '';
  setLoading(true);

  const token    = API_KEY;
  const insee    = communeEl.value;
  const nomVille = communeEl.options[communeEl.selectedIndex].textContent;

  try {
    const url = `https://api.meteo-concept.com/api/forecast/daily/0?token=${token}&insee=${insee}`;
    const res = await fetch(url);

    if (res.status === 401) throw new Error('Clé API invalide ou expirée.');
    if (!res.ok) throw new Error(`Erreur de l'API météo (code ${res.status}).`);

    const data = await res.json();
    const forecast = data.forecast;

    if (!forecast) throw new Error('Données météo indisponibles pour cette commune.');

    renderResults(nomVille, forecast);

  } catch (err) {
    showError(err.message || 'Une erreur est survenue lors de la récupération des données météo.');
    console.error(err);
  } finally {
    setLoading(false);
  }
}

function renderResults(ville, f) {
  const today   = new Date();
  const opts    = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const dateStr = today.toLocaleDateString('fr-FR', opts);

  const tmin   = f.tmin      !== undefined ? f.tmin      + '°C' : 'N/D';
  const tmax   = f.tmax      !== undefined ? f.tmax      + '°C' : 'N/D';
  const pluie  = f.probarain !== undefined ? f.probarain + ' %' : 'N/D';
  const soleil = f.sun_hours !== undefined ? f.sun_hours + ' h' : 'N/D';

  resultsEl.innerHTML = `
    <div class="result-location">
      <h2>${ville.toUpperCase()}</h2>
      <p class="result-date">${dateStr}</p>
    </div>
    <div class="weather-grid" role="list">
      <article class="weather-card temp-min" role="listitem" aria-label="Température minimale : ${tmin}" style="transform: rotate(${Math.random() * 4 - 2}deg)">
        <span class="card-icon" aria-hidden="true">🌡️</span>
        <p class="card-label">Temp. minimale</p>
        <p class="card-value cold">${tmin}</p>
        <p class="card-unit">Celsius</p>
      </article>
      <article class="weather-card temp-max" role="listitem" aria-label="Température maximale : ${tmax}" style="transform: rotate(${Math.random() * 4 - 2}deg)">
        <span class="card-icon" aria-hidden="true">🔥</span>
        <p class="card-label">Temp. maximale</p>
        <p class="card-value warm">${tmax}</p>
        <p class="card-unit">Celsius</p>
      </article>
      <article class="weather-card rain" role="listitem" aria-label="Probabilité de pluie : ${pluie}" style="transform: rotate(${Math.random() * 4 - 2}deg)">
        <span class="card-icon" aria-hidden="true">🌧️</span>
        <p class="card-label">Probabilité de pluie</p>
        <p class="card-value blue">${pluie}</p>
        <p class="card-unit">Pourcentage</p>
      </article>
      <article class="weather-card sun" role="listitem" aria-label="Ensoleillement : ${soleil}" style="transform: rotate(${Math.random() * 4 - 2}deg)">
        <span class="card-icon" aria-hidden="true">☀️</span>
        <p class="card-label">Ensoleillement</p>
        <p class="card-value gold">${soleil}</p>
        <p class="card-unit">Heures</p>
      </article>
    </div>
    <div class="divider" aria-hidden="true"></div>
  `;

  resultsEl.style.display = 'block';
  resultsEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
}