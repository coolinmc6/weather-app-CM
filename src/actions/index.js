import axios from 'axios';

const API_KEY = 'eb9e572aa3e9b1d320f7827ee66d8543';
const ROOT_URL = `https://api.openweathermap.org/data/2.5/forecast?appid=${API_KEY}`;

export const FETCH_WEATHER = 'FETCH_WEATHER';

export function fetchWeather(city) {
	const url = `${ROOT_URL}&q=${city},us`;
	const request = axios.get(url);

	

	return {
		type: FETCH_WEATHER,
		payload: request
	}
}