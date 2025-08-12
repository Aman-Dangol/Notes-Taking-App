import express from "express";

import { userRouter } from "./routes/user-routes";
import { authRouter } from "@/routes/auth-routes";
import { tokenValidatorMiddleWare } from "@/middlewares/token-validator/token-validator";
import cp from "cookie-parser";
import { noteRouter } from "@/routes/note-routes";
import { categoryRouter } from "@/routes/category-route";
const app = express();

app.use(cp());
app.use(
  /^\/(?!(login|register|verify-token)(\/|$)).*/,
  tokenValidatorMiddleWare
);

app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);

app.use("/user", userRouter);
app.use("/note", noteRouter);
app.use("/category", categoryRouter);

app.use("/", authRouter);

app.listen("8000", () => {
  console.log("localhost:8000/");
});
