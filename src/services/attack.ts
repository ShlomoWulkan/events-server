import e from "express";
import responseDTO from "../DTO/response";
import { newEventDTO } from "../DTO/newEventDTO";
import event, { IEvent } from "../models/event";

//חמשת ארגוני הטרור הבולטים באזור מסוים
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
    //בדיקה שלא חסר מידע
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
      throw new Error("חסר מידע ליצירת אירוע חדש!");
    }
    //קבלה לתוך משתנה את האירוע האחרון שהיה באותה שנה וחודש ויום
    let lastEventInSameDate: IEvent[] = await event.aggregate([
      { $match: { iyear: iyear, imonth: imonth, iday: iday } },
      { $sort: { eventid: -1 } },
      { $limit: 1 },
    ]);

    //חיתוך מספר האירוע לאותו יום
    const numCurrEventInDate = parseInt(lastEventInSameDate[0].eventid.toString().slice(-4)) + 1;

    //הכנסה לתוך משתנה eventid = את השנה + חודש + יום + מספר אחד מעל ה-eventid של האירוע האחרון
    const eventid = ("000" + numCurrEventInDate).slice(-4);
    // console.log({eventid})

    //שמירת האירוע ושינוי כל פרמטר לפי ה-'סוג' שלו
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

    //החזרת תוצאת שמירת האירוע
    return { description: "האירוע שנוצר", data: newEvent };
  } catch (err: any) {
    return err.message;
  }
};
