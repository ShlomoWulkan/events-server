import { Request, Response } from "express";
import { createService } from "../services/attack";
import { newEventDTO } from "../DTO/newEventDTO";

export const create = async (
  req: Request<any, newEventDTO>,
  res: Response
) => {
  try {
    // console.log(req.body);
    const deadliestAttack = await createService(req.body);
    res.status(200).json(deadliestAttack);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};


