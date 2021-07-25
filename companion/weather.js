import * as cbor from "cbor";
import { me as companion } from "companion";
import { outbox } from "file-transfer";
import { WeatherCondition, weather} from "weather";
import { dataFile, wakeTime } from "../common/constants";

export function init() {
  if (companion.permissions.granted("access_location")) {
    // Refresh on companion launch
    refreshData();

    // Schedule a refresh every 30 minutes
    companion.wakeInterval = wakeTime;
    companion.addEventListener("wakeinterval", refreshData);

  } else {
    console.error("This app requires the access_location permission.");
  }
  
}

function refreshData() {
  weather
    .getWeatherData()
    .then((data) => {
     if (data.locations.length > 0) {
        sendData({
          temperature: Math.floor(data.locations[0].currentWeather.temperature),
          condition: data.locations[0].currentWeather.weatherCondition,
          location: data.locations[0].name,
          unit: data.temperatureUnit, 
          icon: weather_icon[data.locations[0].currentWeather.weatherCondition],
          condition_text: weather_text[data.locations[0].currentWeather.weatherCondition]
        });
      } else {
        console.warn("No data for this location.")
      }
    })
    .catch((ex) => {
      console.error(ex);
    });
}

function sendData(data) {
  outbox.enqueue(dataFile, cbor.encode(data)).catch(error => {
    console.warn(`Failed to enqueue data. Error: ${error}`);
  });
}

const weather_icon = {
          [WeatherCondition.ClearNight]: "33.png",
          [WeatherCondition.Cloudy]: "7.png",
          [WeatherCondition.Cold]: "31.png",
          [WeatherCondition.Flurries]: "19.png",
          [WeatherCondition.Fog]: "11.png",
          [WeatherCondition.FreezingRain]: "26.png",
          [WeatherCondition.HazyMoonlight]: "37.png",
          [WeatherCondition.HazySunshineDay]: "5.png",
          [WeatherCondition.Hot]: "30.png",
          [WeatherCondition.Ice]: "24.png",
          [WeatherCondition.IntermittentCloudsDay]: "4.png",
          [WeatherCondition.IntermittentCloudsNight]: "36.png",
          [WeatherCondition.MostlyClearNight]: "34.png",
          [WeatherCondition.MostlyCloudyDay]: "6.png",
          [WeatherCondition.MostlyCloudyNight]: "38.png",
          [WeatherCondition.MostlyCloudyWithFlurriesDay]: "20.png",
          [WeatherCondition.MostlyCloudyWithFlurriesNight]: "43.png",
          [WeatherCondition.MostlyCloudyWithShowersDay]: "13.png",
          [WeatherCondition.MostlyCloudyWithShowersNight]: "40.png",
          [WeatherCondition.MostlyCloudyWithSnowDay]: "23.png",
          [WeatherCondition.MostlyCloudyWithSnowNight]: "44.png",
          [WeatherCondition.MostlyCloudyWithThunderstormsDay]: "16.png",
          [WeatherCondition.MostlyCloudyWithThunderstormsNight]: "42.png",
          [WeatherCondition.MostlySunnyDay]: "2.png",
          [WeatherCondition.Overcast]: "8.png",
          [WeatherCondition.PartlyCloudyNight]: "35.png",
          [WeatherCondition.PartlyCloudyWithShowersNight]: "39.png",
          [WeatherCondition.PartlyCloudyWithThunderstormsNight]: "41.png",
          [WeatherCondition.PartlySunnyDay]: "3.png",
          [WeatherCondition.PartlySunnyWithFlurriesDay]: "21.png",
          [WeatherCondition.PartlySunnyWithShowersDay]: "14.png",
          [WeatherCondition.PartlySunnyWithThunderstormsDay]: "17.png",
          [WeatherCondition.Rain]: "18.png",
          [WeatherCondition.RainAndSnow]: "29.png",
          [WeatherCondition.Showers]: "12.png",
          [WeatherCondition.Sleet]: "25.png",
          [WeatherCondition.Snow]: "22.png",
          [WeatherCondition.SunnyDay]: "1.png",
          [WeatherCondition.Thunderstorms]: "15.png",
          [WeatherCondition.Windy]: "32.png",          
        }

const weather_text = {
          [WeatherCondition.ClearNight]: "Clear Night",
          [WeatherCondition.Cloudy]: "Cloudy",
          [WeatherCondition.Cold]: "Cold",
          [WeatherCondition.Flurries]: "Flurries",
          [WeatherCondition.Fog]: "Fog",
          [WeatherCondition.FreezingRain]: "Freezing Rain",
          [WeatherCondition.HazyMoonlight]: "Hazy Moonlight",
          [WeatherCondition.HazySunshineDay]: "Hazy Sunshine",
          [WeatherCondition.Hot]: "Hot",
          [WeatherCondition.Ice]: "Ice",
          [WeatherCondition.IntermittentCloudsDay]: "Intermittent Clouds",
          [WeatherCondition.IntermittentCloudsNight]: "Intermittent Clouds",
          [WeatherCondition.MostlyClearNight]: "Mostly Clear",
          [WeatherCondition.MostlyCloudyDay]: "Mostly Cloudy",
          [WeatherCondition.MostlyCloudyNight]: "Mostly Cloudy",
          [WeatherCondition.MostlyCloudyWithFlurriesDay]: "MostlyCloudy with Flurries",
          [WeatherCondition.MostlyCloudyWithFlurriesNight]: "MostlyCloudy with Flurries",
          [WeatherCondition.MostlyCloudyWithShowersDay]: "MostlyCloudy with Showers",
          [WeatherCondition.MostlyCloudyWithShowersNight]: "MostlyCloudy with Showers",
          [WeatherCondition.MostlyCloudyWithSnowDay]: "MostlyCloudy with Snow",
          [WeatherCondition.MostlyCloudyWithSnowNight]: "MostlyCloudy with Snow",
          [WeatherCondition.MostlyCloudyWithThunderstormsDay]: "Mostly Cloudy with Thunderstorms",
          [WeatherCondition.MostlyCloudyWithThunderstormsNight]: "Mostly Cloudy with Thunderstorms",
          [WeatherCondition.MostlySunnyDay]: "Mostly Sunny",
          [WeatherCondition.Overcast]: "Overcast",
          [WeatherCondition.PartlyCloudyNight]: "Partly Cloudy",
          [WeatherCondition.PartlyCloudyWithShowersNight]: "Partly Cloudy with Showers",
          [WeatherCondition.PartlyCloudyWithThunderstormsNight]: "Partly Cloudy with Thunderstorms",
          [WeatherCondition.PartlySunnyDay]: "Partly Sunny",
          [WeatherCondition.PartlySunnyWithFlurriesDay]: "Partly Sunny with Flurries",
          [WeatherCondition.PartlySunnyWithShowersDay]: "Partly Sunny with Showers",
          [WeatherCondition.PartlySunnyWithThunderstormsDay]: "Partly Sunny with Thunderstorms",
          [WeatherCondition.Rain]: "Rain",
          [WeatherCondition.RainAndSnow]: "Rain and Snow",
          [WeatherCondition.Showers]: "Showers",
          [WeatherCondition.Sleet]: "Sleet",
          [WeatherCondition.Snow]: "Snow",
          [WeatherCondition.SunnyDay]: "Sunny",
          [WeatherCondition.Thunderstorms]: "Thunderstorms",
          [WeatherCondition.Windy]: "Windy",          
        }