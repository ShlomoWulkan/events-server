import Event from '../models/event';  // הייבוא של המודל
import axios from "axios";
import fs from 'fs';

const apiKey = '965278e87cbf4fac96fec430c8fa0450';

async function getCountriesFromDatabase() {
  try {
    const events = await Event.find().select('country_txt').distinct('country_txt');
    return events;
  } catch (error) {
    console.error('Error fetching countries from database:', error);
    return [];
  }
}

async function getCoordinates(country: any) {
  const url = `https://api.opencagedata.com/geocode/v1/json?key=${apiKey}&q=${country}&pretty=1`;

  try {
    const response = await axios.get(url);
    if (response.data.results.length > 0) {
      const { lat, lng } = response.data.results[0].geometry;
      return { country, lat, lng };
    } else {
      return { country, lat: null, lng: null };
    }
  } catch (error) {
    console.error(`Error fetching data for ${country}:`, error);
    return { country, lat: null, lng: null };
  }
}

export async function createJsonFile() {
  const countries = await getCountriesFromDatabase();
  
  const data = [];
  for (const country of countries) {
    const coordinates = await getCoordinates(country);
    data.push(coordinates);
  }

  fs.writeFileSync('countries_coordinates.json', JSON.stringify(data, null, 2));
  console.log('File created: countries_coordinates.json');
}
