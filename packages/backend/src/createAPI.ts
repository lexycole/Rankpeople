import "reflect-metadata";
import express, { Express, Router, RequestHandler } from "express";
import { Request, Response, NextFunction } from 'express';
import cors from "cors";
import graphqlPlayground from "graphql-playground-middleware-express";
import { graphqlHTTP } from "express-graphql";
import { MyContext } from "./utils/MyContext";
import { buildSchema } from "type-graphql";
import { RatingResolver, PersonResolver } from "./resolvers";
import {
  COOKIE_NAME,
  COOKIE_SECRET,
  DOCKER_ENV,
  FRONTEND_URL,
  __prod__,
} from "@repo/environment";
import { v4 as uuidv4 } from "uuid";
import { expressLogger, graphqlLogger } from "@repo/logger";
import cookieSession from 'cookie-session';

export async function createAPI(): Promise<Express> {
  const app = express();
  const router: Router = express.Router();

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(expressLogger);

  app.use(
    cookieSession({
      name: COOKIE_NAME,
      secret: COOKIE_SECRET,
      secure: __prod__,
      httpOnly: true,
      sameSite: DOCKER_ENV ? "lax" : "none",
      maxAge: 1000 * 60 * 60 * 24 * 14, // 2 weeks
    })
  );

  app.enable("trust proxy"); // trust first proxy

  app.use(
    cors({
      origin: FRONTEND_URL,
      credentials: true,
    })
  );

  // Fix: Define the middleware with proper RequestHandler type
  const sessionMiddleware: RequestHandler = (req, _res, next) => {
    if (req.session?.isNew) {
      req.session.userid = uuidv4();
    }
    next();
  };
  app.use(sessionMiddleware);

  const schema = await buildSchema({
    resolvers: [RatingResolver, PersonResolver],
    validate: false,
  });

  if (!__prod__) {
    const playground = graphqlPlayground({ endpoint: "/api/graphql" }) as express.RequestHandler;
    router.use("/playground", playground);
  }

  router.use(
    "/graphql",
    graphqlHTTP((req, res) => {
      const context: MyContext = { req, res };
      return {
        schema,
        context,
        customFormatErrorFn: (err) => {
          graphqlLogger.error(err);
          return err;
        },
      };
    })
  );

  router.get("/", (_req, res) => {
    res.send("Hello World!");
  });

  app.use("/api", router);

  return app;
}