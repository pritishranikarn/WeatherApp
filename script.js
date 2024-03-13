const subscriptionKey = 'ZzP1yvu-OUoktFzIhp2SeASUjG-4-i0320Wep2YAIws'; // Microsoft Entra subscription key || Primary key ||Api key

function fetchWeather(location) {
    const apiUrl = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(location)}&format=json`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (data.length === 0) {
                throw new Error('No location found');
            }
            const { lat, lon } = data[0];
            const weatherApiUrl = `https://atlas.microsoft.com/weather/currentConditions/json?api-version=1.0&query=${lat},${lon}&subscription-key=${subscriptionKey}`;
            
            return fetch(weatherApiUrl);
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Weather data:', data);

            if (data.results.length === 0) {
                throw new Error('No weather data found');
            }

            const result = data.results[0]; // Get the first result

            const phrase = result.phrase;
            const temperature = result.temperature.value;
            const precipitation = result.hasPrecipitation ? 'Yes' : 'No';
            const humidity = result.relativeHumidity;
            const windSpeed = result.wind.speed.value;

            // Display weather information in the HTML
            document.getElementById('location').textContent = location;
            document.getElementById('phrase').textContent = phrase;
            document.getElementById('temperature').textContent = `${temperature}°C`;
            document.getElementById('precipitation').textContent = precipitation;
            document.getElementById('humidity').textContent = `${humidity}%`;
            document.getElementById('wind-speed').textContent = `${windSpeed} km/h`;

            // Set background image
            document.body.style.backgroundImage = `url('https://source.unsplash.com/1600x900/?${location}')`;
        })
        .catch(error => console.error('Error fetching weather data:', error));
}

function searchWeather() {
    const location = document.getElementById('search-input').value;
    fetchWeather(location);
}
