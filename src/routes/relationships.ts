import { Request, Response } from "express";
import { deadliestRegionsService, groupByYearService, topGroupsService } from "../services/relationships";
import { config } from "dotenv";

export const topGroups = async (
  req: Request<any, any, any, { region: string; top?: boolean }>,
  res: Response
) => {
  try {
    // console.log(req.query);
    const deadliestAttack = await topGroupsService(req.query);
    res.status(200).json(deadliestAttack);
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
    // console.log(req.query);
    const deadliestAttack = await groupByYearService(req.query);
    res.status(200).json(deadliestAttack);
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
    console.log(req.query);
    const deadliestAttack = await deadliestRegionsService(req.query);
    res.status(200).json(deadliestAttack);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};
