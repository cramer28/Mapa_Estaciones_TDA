const DATA_URL =
  'https://raw.githubusercontent.com/OpenDataCordoba/estado_tda/main/antenas_tda.json';

const map = L.map('map', { zoomControl: true }).setView([-38.5, -63.5], 4);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  maxZoom: 18,
}).addTo(map);

const loadingEl = document.getElementById('loading');
const errorEl = document.getElementById('error');

function hideLoading() {
  loadingEl.classList.add('hidden');
}

function showError(message) {
  errorEl.textContent = message;
  errorEl.classList.remove('hidden');
}

function parseCoordinate(value) {
  const num = Number(value);
  return Number.isFinite(num) ? num : null;
}

function isValidStation(station) {
  const lat = parseCoordinate(station.latitud);
  const lng = parseCoordinate(station.longitud);
  return lat !== null && lng !== null && lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180;
}

function buildPopupContent(station) {
  return `
    <div class="station-popup">
      <h3>${escapeHtml(station.estacion)}</h3>
      <dl>
        <dt>Provincia: </dt><dd>${escapeHtml(station.provincia)}</dd>
        <dt>Red: </dt><dd>${escapeHtml(station.red)}</dd>
        <dt>Acrónimo: </dt><dd>${escapeHtml(station.acronimo_maximo)}</dd>
        <dt>Estado: </dt><dd>${escapeHtml(station.estado)}</dd>
      </dl>
    </div>
  `;
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text ?? '';
  return div.innerHTML;
}

async function loadStations() {
  try {
    const response = await fetch(DATA_URL);
    if (!response.ok) {
      throw new Error(`No se pudo cargar el archivo de datos (${response.status})`);
    }

    const stations = await response.json();
    if (!Array.isArray(stations)) {
      throw new Error('El formato del archivo de datos no es válido');
    }

    const markers = [];
    let skipped = 0;

    for (const station of stations) {
      if (!isValidStation(station)) {
        skipped++;
        continue;
      }

      const lat = parseCoordinate(station.latitud);
      const lng = parseCoordinate(station.longitud);
      const marker = L.marker([lat, lng]).bindPopup(buildPopupContent(station));
      marker.addTo(map);
      markers.push(marker);
    }

    if (markers.length === 0) {
      throw new Error('No se encontraron estaciones con coordenadas válidas');
    }

    const group = L.featureGroup(markers);
    map.fitBounds(group.getBounds().pad(0.05));

    if (skipped > 0) {
      console.warn(`Se omitieron ${skipped} estaciones sin coordenadas válidas`);
    }
  } catch (err) {
    showError(
      err.message ||
        'Error al cargar las estaciones. Verifique su conexión e intente de nuevo.'
    );
  } finally {
    hideLoading();
  }
}

loadStations();
