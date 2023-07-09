$(document).ready(function() {
  var map;
  var marker;

  // Función para obtener y mostrar la información de la IP
  function getIPInfo(ip) {
    var apiKey = 'at_C2plxR6fMwbgjFRbvHUKeeo0dy76s'; // Reemplaza 'tu_api_key' con tu clave de API de ipify

    // Realiza una solicitud GET a la API de ipify para obtener la información de la IP
    axios.get(`https://geo.ipify.org/api/v1?apiKey=${apiKey}&ipAddress=${ip}`)
      .then(function(response) {
        var data = response.data;
        var ipAddress = data.ip;
        var country = data.location.country;
        var city = data.location.city;
        var timezone = data.location.timezone;
        var lat = data.location.lat;
        var lng = data.location.lng;
        var isp = data.isp;

        // Actualiza los elementos HTML con la información de la IP
        $('#ip').text(ipAddress);
        $('#country').text(country);
        $('#city').text(city);
        $('#timezone').text(timezone);
        $('#coordinates').text(`${lat}, ${lng}`);
        $('#isp').text(isp);

        // Muestra la ubicación en el mapa
        showLocationOnMap(lat, lng);
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  // Función para mostrar la ubicación en el mapa
  function showLocationOnMap(lat, lng) {
    if (map) {
      // Elimina el marcador existente del mapa
      if (marker) {
        map.removeLayer(marker);
      }

      // Crea un nuevo marcador en la ubicación proporcionada
      marker = L.marker([lat, lng]).addTo(map);

      // Centra el mapa en la nueva ubicación
      map.setView([lat, lng], 13);
    }
  }

  // Inicializa el mapa de Leaflet
  function initializeMap() {
    map = L.map('map').setView([0, 0], 2);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
      maxZoom: 18,
    }).addTo(map);
  }

  // Manejador de evento para el botón de búsqueda
  $('#btnSearch').on('click', function() {
    var query = $('#inputField').val();
    searchAddress(query);
  });

  // Función para buscar una dirección o ubicación en el mapa
  function searchAddress(query) {
    var apiKey = 'at_C2plxR6fMwbgjFRbvHUKeeo0dy76s'; // Reemplaza 'tu_api_key' con tu clave de API de ipify

    // Realiza una solicitud GET a la API de ipify para obtener la información de la dirección o ubicación
    axios.get(`https://geo.ipify.org/api/v1?apiKey=${apiKey}&domain=${query}`)
      .then(function(response) {
        var data = response.data;
        var ipAddress = data.ip;
        var lat = data.location.lat;
        var lng = data.location.lng;

        // Actualiza los elementos HTML con la información de la dirección o ubicación
        $('#ip').text(ipAddress);
        $('#country').text(data.location.country);
        $('#city').text(data.location.city);
        $('#timezone').text(data.location.timezone);
        $('#coordinates').text(`${lat}, ${lng}`);
        $('#isp').text(data.isp);

        // Muestra la ubicación en el mapa
        showLocationOnMap(lat, lng);
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  // Inicializa el mapa al cargar la página
  initializeMap();

  // Obtener la dirección IP del visitante al cargar la página
  axios.get('https://api.ipify.org?format=json')
    .then(function(response) {
      var ip = response.data.ip;
      getIPInfo(ip);
    })
    .catch(function(error) {
      console.log(error);
    });
});


// Cambiar moro oscuro-claro

const btn_darkMode = document.getElementById('darkMode');
btn_darkMode.addEventListener('click', ()=>{
  document.body.classList.toggle('dark')
})