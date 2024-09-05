const apiKey = 'YOUR_OPENWEATHERMAP_API_KEY'; // Replace with your OpenWeatherMap API key
const unsplashApiKey = 'YOUR_UNSPLASH_API_KEY'; // Replace with your Unsplash API key

document.getElementById('get-weather').addEventListener('click', function() {
    const city = document.getElementById('city-input').value;

    // Fetch weather data
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    fetch(weatherUrl)
        .then(response => response.json())
        .then(data => {
            if (data.cod === 200) {
                const temperature = data.main.temp;
                document.getElementById('city-name').textContent = city;
                document.getElementById('temperature').textContent = `${temperature}°C`;

                // Change color based on temperature
                if (temperature >= 30) {
                    document.getElementById('temperature').style.color = "red";
                } else {
                    document.getElementById('temperature').style.color = "blue";
                }

                // Fetch city image from Unsplash
                const unsplashUrl = `https://api.unsplash.com/search/photos?query=${city}&client_id=${unsplashApiKey}&orientation=landscape&per_page=1`;
                fetch(unsplashUrl)
                    .then(response => response.json())
                    .then(imageData => {
                        if (imageData.results.length > 0) {
                            const imageUrl = imageData.results[0].urls.regular;
                            const cityImage = document.getElementById('city-image');
                            cityImage.src = imageUrl;
                            cityImage.style.display = 'block'; // Show the image
                        }
                    })
                    .catch(error => console.error('Error fetching city image:', error));
            } else {
                document.getElementById('temperature').textContent = 'City not found. Please try again.';
            }
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            document.getElementById('temperature').textContent = 'An error occurred. Please try again.';
        });
});
