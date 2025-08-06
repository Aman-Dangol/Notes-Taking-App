import express from "express";

import { userRouter } from "./routes/user-routes";

const app = express();

app.use("/user", userRouter);

app.listen("8000", () => {
  console.log("localhost:8000/");
});
