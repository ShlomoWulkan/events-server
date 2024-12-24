import responseDTO from "../types/response";
import event from "../models/event";

export const topGroupsService = async (quary: {
  country: string;
  top?: boolean;
}): Promise<responseDTO> => {
  try {
    const { country, top } = quary;
    if (!country) throw new Error("country quary is required!");

    let topGroups;
    const matchStage = { $match: { country_txt: country, gname: { $ne: "Unknown" } } };

    if (top) {
      topGroups = await event.aggregate([
        matchStage,
        { $group: { _id: "$gname", count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 5 },
      ]);
    } else {
      topGroups = await event.aggregate([
        matchStage,
        { $group: { _id: "$gname", count: { $sum: 1 } } },
        { $sort: { count: -1 } },
      ]);
    }
    return {
      data: topGroups,
    };
  } catch (err: any) {
    return err.message;
  }
};

export const groupByYearService = async (quary: {
  gname?: string;
  year?: string;
}): Promise<responseDTO> => {
  try {
    const { gname, year } = quary;
    if (!gname && !year) throw new Error("gname or year quary is required!");
    let groupBy;

    if (gname) {
      groupBy = await event.aggregate([
        { $match: { gname: gname } },
        { $group: { _id: { year: "$iyear" }, count: { $sum: 1 } } },
        { $sort: { "_id.year": 1 } },
      ]);
    } else if (year) {
      groupBy = await event.aggregate([
        { $match: { iyear: parseInt(year), gname: { $ne: "Unknown" } } },
        { $group: { _id: { gname: "$gname" }, count: { $sum: 1 } } },
        { $sort: { count: -1 } },
      ]);
    }
    return {
      data: groupBy,
    };
  } catch (err: any) {
    return err.message;
  }
};

export const deadliestRegionsService = async (query: { gname: string }): Promise<responseDTO> => {
  try {
    const { gname } = query;
    if (!gname) throw new Error("gname query is required!");

    const allCurrGnameAttacks = await event.aggregate([
      { $match: { gname: gname } }, // רק אירועים של הקבוצה הספציפית
      {
        $group: {
          _id: "$country_txt",
          totalVictims: { $sum: { $add: ["$nkill", "$nwound"] } },
          longitude: { $first: { $cond: [{ $ne: ["$longitude", null] }, "$longitude", null] } },
          latitude: { $first: { $cond: [{ $ne: ["$latitude", null] }, "$latitude", null] } },
        },
      },
      { $sort: { totalVictims: -1 } }, 
    ]);

    if (!allCurrGnameAttacks || allCurrGnameAttacks.length === 0) {
      throw new Error("No events found for the specified group!");
    }

    const arrToReturn = allCurrGnameAttacks.map((attack) => ({
      country: attack._id,
      totalVictims: attack.totalVictims,
      latitude: attack.latitude != null ? attack.latitude : "Unknown", 
      longitude: attack.longitude != null ? attack.longitude : "Unknown", 
    }));

    return {
      data: arrToReturn,
    };
  } catch (err: any) {
    return err.message;
  }
};

export const allGroupsService = async (): Promise<responseDTO> => {
  try {
    const topGroups = await event.aggregate([
      { $match: { gname: { $ne: "Unknown" } } },
      { $group: { _id: "$gname" } },
      { $sort: { _id: 1 } }, 
    ]);
    return {
      data: topGroups,
    };
  } catch (err: any) {
    return err.message;
  }
};
