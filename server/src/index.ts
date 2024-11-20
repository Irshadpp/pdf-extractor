import "dotenv/config";
import express from "express";
import cors from "cors";
import { json } from "body-parser";
import { appRouter } from "./app/routes";
import errorHandler from "./app/middleware/error-handler";
import { CustomError } from "./app/utils/custom-error";

const app = express();

const router = express.Router();

app.use(cors());
app.use(json());

router.use("/api/v1", appRouter);

app.all("*", () => {
  throw new CustomError("Not found", 404);
});

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
