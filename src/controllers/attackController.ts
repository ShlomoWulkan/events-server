import { Request, Response } from "express";
import { createService, deleteService, updateService } from "../services/attack";
import { newEventDTO } from "../types/newEventDTO";

export const createEvent = async (
  req: Request<any, newEventDTO>,
  res: Response
) => {
  try {
    const deadliestAttack = await createService(req.body);
    res.status(200).json(deadliestAttack);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};

export const updateEvent = async (req: Request, res: Response) => {
  try {
    const deadliestAttack = await updateService(req.body);
    res.status(200).json(deadliestAttack);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};

export const deleteEvent = async (req: Request, res: Response) => {
  try {
    const deadliestAttack = await deleteService(req.body);
    res.status(200).json(deadliestAttack);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};
