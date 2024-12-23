import mongoose, { Schema, Document } from 'mongoose';

interface ICountryData extends Document {
  country_txt: string;
  latitude: number;
  longitude: number;
  avgCasualty: number;
}

const countryDataSchema = new Schema<ICountryData>({
  country_txt: { type: String, required: true, unique: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  avgCasualty: { type: Number, required: true },
});

const CountryData = mongoose.model<ICountryData>('CountryData', countryDataSchema);

export default CountryData;
