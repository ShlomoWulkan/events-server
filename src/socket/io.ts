import { io } from "../app";
import { newEventDTO } from "../types/newEventDTO";
import event from "../models/event";
import { createService } from "../services/attack";

io.on("connection", (socket) => {
  console.log("A user connected"); // הדפסת התחברות לקוח

  socket.on("newAttack", async (data: newEventDTO) => {
    try {
      const newAttack = await createService(data);
      console.log({ newAttack });
  
      const allAttacks = await event.find();

      io.emit("updateAttacks", allAttacks);
    } catch (error: any) {
      console.log(error.message);
    }
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected"); // הדפסת התנתקות לקוח
  });
});
