import { Request, Response } from "express";
import { allGroupsService, deadliestRegionsService, groupByYearService, topGroupsService } from "../services/relationships";

export const topGroups = async (
  req: Request<any, any, any, { country: string; top?: boolean }>,
  res: Response
) => {
  try {
    const top = await topGroupsService(req.query);
    res.status(200).json(top);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};


export const groupByYear = async (
  req: Request<any, any, any, { gname?: string; year?: string }>,
  res: Response
) => {
  try {
    const gangYear = await groupByYearService(req.query);
    res.status(200).json(gangYear);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};


export const deadliestRegions = async (
  req: Request<any, any, any, { gname: string; }>,
  res: Response
) => {
  try {
    const deadliestAttack = await deadliestRegionsService(req.query);
    res.status(200).json(deadliestAttack);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};

export const allGangs = async (req: Request, res: Response) => {
  try {
    const all = await allGroupsService();
    res.status(200).json(all);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};
