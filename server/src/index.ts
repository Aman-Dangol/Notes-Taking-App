import express from "express";

import { userRouter } from "./routes/user-routes";
import { authRouter } from "@/routes/auth-routes";

const app = express();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);

app.use("/user", userRouter);

app.use("/", authRouter);

app.listen("8000", () => {
  console.log("localhost:8000/");
});
