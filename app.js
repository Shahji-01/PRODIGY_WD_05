document.addEventListener('DOMContentLoaded', () => {
    const locationForm = document.getElementById('locationForm');
    const locationInput = document.getElementById('locationInput');
    const weatherInfo = document.getElementById('weatherInfo');
    const error = document.getElementById('error');

    locationForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const location = locationInput.value.trim();

        if (location) {
            getWeather(location);
        } else {
            showError('Please enter a location.');
        }
    });

    async function getWeather(location) {
        const apiKey = 'b4f624fd73270b7b584e03c304a63ffe'; // apikey has been deactivated.
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                alert("city or country is not found in api");
                throw new Error('Weather data not found.');
            }
            const weatherData = await response.json();
            displayWeather(weatherData);
        } catch (error) {
            showError('Weather data not found. Please try again.');
        }
    }

    function displayWeather(data) {
        const { name, main, weather } = data;
        const temperature = Math.round(main.temp);
        const description = weather[0].description;

        const weatherHTML = `
            <h2>${name}</h2>
            <p>Temperature: ${temperature}°C</p>
            <p>Conditions: ${description}</p>
        `;

        weatherInfo.innerHTML = weatherHTML;
        error.textContent = '';
    }

    function showError(message) {
        error.textContent = message;
        weatherInfo.innerHTML = '';
    }
});
