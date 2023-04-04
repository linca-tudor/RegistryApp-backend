import * as functions from "firebase-functions";
import * as express from "express";
import * as swaggerJsdoc from "swagger-jsdoc";
import { Request, Response } from "express";
import { setup as setupHobbiesRoutes } from "./routesHobbies";
import { setup as setupUserRoutes } from './routesUsers';

const app = express();

const checkApiKey = async (request: Request, response: Response, next: any) => {
  const apiKeyToken = request.header("X-api-key");

  if (!apiKeyToken || apiKeyToken !== "a2282b41-bd33-4eca-845c-0f37730e8305") {
    response.status(401);
    return next("Unauthorized");
  }

  return next();
};

app.all("*", checkApiKey);

const surveSwaggerSpecification = async (req: Request, res: Response) => {
  const swaggerDefinition = {
    info: {
      title: "Users API",
      version: "1.0.0",
      description: "A sample API",
    },
    host: req.protocol + "://" + req.get("host") + req.originalUrl,
    basePath: "/",
  };
  const options = {
    swaggerDefinition,
    apis: [`${__dirname}/routes*.js`],
  };
  const swaggerSpec = await swaggerJsdoc(options);

  res.setHeader("Content-Type", "application/json");
  return res.send(swaggerSpec);
};

app.get("/api-docs.json", surveSwaggerSpecification);

app.get("/", (_: Request, response: Response) =>
  response.status(200).send("Hello world!")
);

setupHobbiesRoutes(app);
setupUserRoutes(app);

exports.app = functions.https.onRequest(app);
