import mongoose, { Document, Schema, model } from 'mongoose';

export interface IEvent extends Document {
  eventid: number;
  iyear: number;
  imonth: number;
  iday: number;
  country_txt: string;
  region_txt: string;
  city: string;
  latitude: number;
  longitude: number;
  attacktype1_txt: string;
  targtype1_txt: string;
  target1: string;
  gname: string;
  weaptype1_txt: string;
  nkill: number;
  nwound: number;
  ransomamt: number;
  summary:string;
  nperps: number;
}

const eventSchema = new Schema<IEvent>({
  eventid: { type: Number, required: true, unique: true },
  iyear: { type: Number, required: true },
  imonth: { type: Number, required: true },
  iday: { type: Number, required: true },
  country_txt: { type: String, required: true },
  region_txt: { type: String, required: true },
  city: { type: String },
  latitude: { type: Number },
  longitude: { type: Number },
  attacktype1_txt: { type: String, required: true },//סוג התקפה
  targtype1_txt: { type: String, required: true },
  target1: { type: String },
  gname: { type: String, required: true },//שם קבוצה
  weaptype1_txt: { type: String, required: true },
  nkill: { type: Number, default: 0 },//כמות הרוגים
  nwound: { type: Number, default: 0 },//כמות פצועים
  ransomamt: { type: Number, default: 0 },//כופר
  summary: {type : String},
  nperps: {type: Number, default: 1}//המספר הכולל של המחבלים המשתתפים באירוע
}); 

eventSchema.index({ attacktype1_txt: 1 });
eventSchema.index({ region_txt: 1 });
eventSchema.index({ iyear: 1 });
eventSchema.index({ region_txt: 1, gname: 1 });
// eventSchema.index({ gname: 1 });

export default model<IEvent>('Event', eventSchema);


