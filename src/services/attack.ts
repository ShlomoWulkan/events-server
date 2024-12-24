import e from "express";
import responseDTO from "../types/response";
import { newEventDTO } from "../types/newEventDTO";
import event, { IEvent } from "../models/event";

export const createService = async (
  body: newEventDTO
): Promise<responseDTO> => {
  try {
    let {
      attacktype1_txt,
      city,
      country_txt,
      gname,
      iday,
      imonth,
      iyear,
      latitude,
      longitude,
      nkill,
      nperps,
      nwound,
      ransomamt,
      region_txt,
      summary,
      target1,
      targtype1_txt,
      weaptype1_txt,
    } = body;

    if (
      !attacktype1_txt ||
      !city ||
      !country_txt ||
      !gname ||
      !iday ||
      !imonth ||
      !iyear ||
      !latitude ||
      !longitude ||
      !nkill ||
      !nperps ||
      !nwound ||
      !ransomamt ||
      !region_txt ||
      !summary ||
      !target1 ||
      !targtype1_txt ||
      !weaptype1_txt
    ) {
      throw new Error("missing information");
    }

    let lastEventInSameDate: IEvent[] = await event.aggregate([
      { $match: { iyear: iyear, imonth: imonth, iday: iday } },
      { $sort: { eventid: -1 } },
      { $limit: 1 },
    ]);

    const numCurrEventInDate = parseInt(lastEventInSameDate[0].eventid.toString().slice(-4)) + 1;

    const eventid = ("000" + numCurrEventInDate).slice(-4);

    const newEvent = await event.create({
      eventid,
      iyear,
      imonth,
      iday,
      country_txt,
      region_txt,
      city, 
      latitude,
      longitude,
      attacktype1_txt,
      targtype1_txt,
      target1,
      gname,
      weaptype1_txt,
      nkill,
      nwound,
      ransomamt,
      summary,
      nperps,
    });

    return {  data: newEvent };
  } catch (err: any) {
    return err.message;
  }
};
