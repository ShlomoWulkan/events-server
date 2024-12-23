import event, { IEvent } from "../models/event";

export const initDatabase = async () => {
    try {
      let mylist: IEvent[] = require("../../data/globalterrorismdb_0718dist.json");
      const insertAll = await event.insertMany(mylist);
      return insertAll;
    } catch (err: any) {
      console.log("Error in sid data: ", err.message);
      return err.message;
    }
  };
