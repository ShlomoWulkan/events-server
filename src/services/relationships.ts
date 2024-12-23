import responseDTO from "../DTO/response";
import event from "../models/event";

export const topGroupsService = async (quary: {
  region: string;
  top?: boolean;
}): Promise<responseDTO> => {
  try {
    const { region, top } = quary;
    if (!region) throw new Error("region quary is required!");
    let topGroups;
    if (top) {
      topGroups = await event.aggregate([
        { $match: { region_txt: region } },
        { $group: { _id: "$gname", count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 5 },
      ]);
    } else {
      topGroups = await event.aggregate([
        { $match: { region_txt: region } },
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
        { $match: { iyear: parseInt(year) } },
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


export const deadliestRegionsService = async (quary: {
  gname: string;
}): Promise<responseDTO> => {
  try {
    const { gname } = quary;
    if (!gname) throw new Error("gname quary is required!");

    const allCurrGnameAttacks = await event.aggregate([
      { $match: { gname: gname } },
      { $group: { _id: "$region_txt", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);

    console.log("before= ", { allCurrGnameAttacks });
    const arrToReturen = [];

    for (let i = 0; i < allCurrGnameAttacks.length; i++) {
      let curr = allCurrGnameAttacks[i];
      
      let mostInCurrentArea = await event.find({ region_txt: curr._id });
      if (!mostInCurrentArea || mostInCurrentArea.length == 0)
        throw new Error("!mostInCurrentArea || mostInCurrentArea.length == 0");
      mostInCurrentArea = mostInCurrentArea.sort(
        (a, b) => b.nkill + b.nwound - (a.nkill + a.nwound)
      );
      mostInCurrentArea = mostInCurrentArea.filter(
        (a) => a.gname !== "Unknown"
      );
      if (mostInCurrentArea[0].gname == gname)
        arrToReturen.push(allCurrGnameAttacks[i]);
      console.log(
        `in=${mostInCurrentArea[0].region_txt}, by${mostInCurrentArea[0].gname}= `,
        mostInCurrentArea[0].nkill + mostInCurrentArea[0].nwound
      );
    }
    console.log("after= ", { arrToReturen });

    return {
      data: arrToReturen,
    };
  } catch (err: any) {
    return err.message;
  }
};
