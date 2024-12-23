import responseDTO from "../DTO/response";
import event from "../models/event";

export const deadliestAttackTypesService = async (): Promise<responseDTO> => {
  try {
    const deadliestAttack = await event.aggregate([
      {
        $group: {
          _id: "$attacktype1_txt",
          count: { $sum: { $add: ["$nkill", "$nwound"] } },
        },
      },
      { $match: { _id: { $ne: "Unknown" } } }, 
      { $sort: { count: -1 } },
      {
        $project: {
          attackTypeName: "$_id",
          count: 1,
          _id: 0,
        },
      },
    ]);
    return {
      data: deadliestAttack,
    };
  } catch (err: any) {
    console.log("Error in deadliestAttackTypesService : ", err.message);
    return err.message;
  }
};

export const highestCasualtyRegionsService = async (
  region?: string
): Promise<responseDTO> => {
  try {
    let avgCasualty;
    if (region) {
      avgCasualty = await event.aggregate([
        { $match: { country_txt: region } },
        {
          $group: {
            _id: "$country_txt",
            avg: { $avg: { $add: ["$nkill", "$nwound"] } },
            longitude: { $first: "$longitude" },
            latitude: { $first: "$latitude" },
          },
        },
        { $match: { _id: { $ne: "Unknown" } } }, 
        {
          $project: {
            countryName: "$_id", 
            avg: 1,
            longitude: 1,
            latitude: 1,
            _id: 0, 
          },
        },
        { $sort: { avg: -1 } },
      ]);
    } else {
      avgCasualty = await event.aggregate([
        {
          $group: {
            _id: "$country_txt",
            avg: { $avg: { $add: ["$nkill", "$nwound"] } },
            longitude: { $first: "$longitude" },
            latitude: { $first: "$latitude" },
          },
        },
        { $match: { _id: { $ne: "Unknown" } } }, 
        {
          $project: {
            countryName: "$_id", 
            avg: 1,
            longitude: 1,
            latitude: 1,
            _id: 0, 
          },
        },
        { $sort: { avg: -1 } },
      ]);
    }
    return {
      data: avgCasualty,
    };
  } catch (err: any) {
    console.log("Error in avgCasualty : ", err.message);
    return err.message;
  }
};

export const incidentTrendsService = async (quary: {
  year?: string;
  month?: string;
  from?: string;
  to?: string;
}): Promise<responseDTO> => {
  try {
    let incidentTrends;
    const { from, month, to, year } = quary;

    console.log("Query parameters:", quary); 

    if (year && month) {
      const yearInt = parseInt(year);
      const monthInt = parseInt(month);

      incidentTrends = await event.aggregate([
        { $match: { iyear: yearInt, imonth: monthInt } },
        {
          $group: {
            _id: { year: "$iyear", month: "$imonth" },
            count: { $sum: 1 },
          },
        },
        { $match: { "_id.year": { $ne: "Unknown" }, "_id.month": { $ne: 0 } } }, 
        { $sort: { "_id.year": 1, "_id.month": 1 } },
      ]);

      console.log("Incident Trends:", incidentTrends); 
    } 
    else if (year) {
      const yearInt = parseInt(year);

      console.log(`Year: ${yearInt}`);

      incidentTrends = await event.aggregate([
        { $match: { iyear: yearInt } },
        {
          $group: {
            _id: { year: "$iyear", month: "$imonth" },
            count: { $sum: 1 },
          },
        },
        { $match: { "_id.year": { $ne: "Unknown" }, "_id.month": { $ne: 0 } } }, 
        { $sort: { "_id.year": 1, "_id.month": 1 } },
      ]);

      console.log("Incident Trends:", incidentTrends);
    } 
    else if (from && to) {
      const fromInt = parseInt(from);
      const toInt = parseInt(to);

      console.log(`From: ${fromInt}, To: ${toInt}`);

      incidentTrends = await event.aggregate([
        {
          $match: {
            iyear: { $gte: fromInt, $lte: toInt },
          },
        },
        {
          $group: {
            _id: { year: "$iyear" },
            count: { $sum: 1 },
          },
        },
        { $match: { "_id.year": { $ne: "Unknown" } } },
        { $sort: { "_id.year": 1 } },
      ]);
    } 
    else {
      return { data: [] };
    }

    if (incidentTrends && incidentTrends.length > 0) {
      return { data: incidentTrends };
    } else {
      console.log("No data found for the query.");
      return { data: [] };
    }
  } catch (err: any) {
    console.log("Error in incidentTrendsService: ", err.message);
    return {
      data: `Error: ${err.message}`,
    };
  }
};
