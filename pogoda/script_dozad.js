const input = document.querySelector('input')
const button = document.querySelector('button')

const cityName = document.querySelector('.city-name')
const warning = document.querySelector('.warning')

const photo = document.querySelector('.photo')

const weather = document.querySelector('.weather')
const temperature = document.querySelector('.temperature')
const humidity = document.querySelector('.humidity')

const forecast = document.querySelector('.forecast')

// API
const API_LINK = 'https://api.openweathermap.org/data/2.5/weather?q='
const API_FORECAST = 'https://api.openweathermap.org/data/2.5/forecast?q='
const API_KEY = '&appid=4175180b200f50441fdebf0f59a76734'
const API_UNITS = '&units=metric'
const API_LANG = '&lang=pl'

// AKTUALNA POGODA
const getWeather = () => {

    const city = input.value || 'Kraków'
    const URL = API_LINK + city + API_KEY + API_UNITS + API_LANG

    axios.get(URL)
        .then(res => {

            const temp = res.data.main.temp
            const hum = res.data.main.humidity
            const description = res.data.weather[0].description
            const status = res.data.weather[0].main

            cityName.textContent = res.data.name
            temperature.textContent = Math.floor(temp) + '°C'
            humidity.textContent = 'Wilgotność: ' + hum + '%'
            weather.textContent = description

            warning.textContent = ''

            // ikony
            if (status === 'Clear') {
                photo.setAttribute('src', './img/sun.png')
            } else if (status === 'Clouds') {
                photo.setAttribute('src', './img/cloud.png')
            } else if (status === 'Rain') {
                photo.setAttribute('src', './img/rain.png')
            } else if (status === 'Snow') {
                photo.setAttribute('src', './img/snow.png')
            } else if (status === 'Mist') {
                photo.setAttribute('src', './img/mist.png')
            } else {
                photo.setAttribute('src', './img/unknown.png')
            }

            // prognoza
            getForecast(city)

        })
        .catch(() => {
            warning.textContent = 'Nie znaleziono miasta!'
            cityName.textContent = ''
            temperature.textContent = ''
            humidity.textContent = ''
            weather.textContent = ''
            forecast.innerHTML = ''
        })
}

// PROGNOZA 4 DNI
const getForecast = (city) => {

    const URL = API_FORECAST + city + API_KEY + API_UNITS + API_LANG

    axios.get(URL)
        .then(res => {

            forecast.innerHTML = ''

            // co 8 wpisów = 24h (4 dni = 32)
            for (let i = 8; i <= 32; i += 8) {

                const day = res.data.list[i]

                const date = day.dt_txt.slice(0, 10)
                const temp = Math.floor(day.main.temp)
                const desc = day.weather[0].description

                const div = document.createElement('div')
                div.classList.add('forecast-day')

                div.innerHTML = `
                    <p>${date}</p>
                    <p>${temp}°C</p>
                    <p>${desc}</p>
                `

                forecast.appendChild(div)
            }
        })
}

// EVENTY
button.addEventListener('click', getWeather)

input.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        getWeather()
    }
})

// start
getWeather()
api.openweathermap.org