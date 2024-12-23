import { Request, Response } from "express";
import { initDatabase } from "../services/sid";

export const sid = async (req: Request, res: Response) => {
  try {
    await initDatabase();
    res.sendStatus(201);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};
