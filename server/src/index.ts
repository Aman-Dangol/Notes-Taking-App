import express from "express";

import { userRouter } from "./routes/user-routes";
import { authRouter } from "@/routes/auth-routes";
import { tokenValidator } from "@/middlewares/token-validator";

const app = express();

app.use(/^\/(?!login|regiser)/, tokenValidator);

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
