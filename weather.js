async function fetchConfig() {
  try {
    const response = await fetch('conf.json');
    const config = await response.json();
    fetchWeather(config.city, config.apiKey);
  } catch (error) {
    console.error("Erreur de configuration", error);
  }
}

async function fetchWeather(city, apiKey) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=fr`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    if (response.ok) {
      displayWeather(data);
    } else {
      console.error("Erreur de données", data.message);
    }
  } catch (error) {
    console.error("Erreur", error);
  }
}

function displayWeather(data) {
  document.querySelector("#city span").textContent = data.name;
  document.querySelector("#temperature span").textContent = `${data.main.temp}°C`;
  document.querySelector("#description span").textContent = data.weather[0].description;
}

fetchConfig();

setInterval(fetchConfig, 3600000);