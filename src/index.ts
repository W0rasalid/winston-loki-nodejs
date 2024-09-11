// section 1
import express, { Express, Request, Response } from "express";
import { logger } from "./logger";

// section 2
const port: number = 4000;
const app: Express = express();

// section 3
app.use(express.json());

// section 4
app.get("/info", (req: Request, res: Response) => {
  const respSuccess = {
    statusCode: 200,
    statusText: "success",
    message: "Info Message",
  };

  logger.info({
    message: `Info Message`,
    labels: {
      ...respSuccess,
      path: req.url,
      method: req.method,
      url: req.hostname,
    },
  });

  return res.status(200).send(respSuccess);
});

app.get("/error", (req: Request, res: Response) => {
  const respError = {
    statusCode: 500,
    statusText: "Internal Server Error",
    message: "Error Message",
  };

  logger.error({
    message: `Error Message`,
    labels: {
      ...respError,
      severity: "critical",
    },
  });

  return res.status(500).send(respError);
});

// section 5
app.listen(port);
logger.warn(`Server is running on http://localhost:${port}`);
