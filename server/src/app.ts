import express, { type Express } from "express";
import cors from "cors";

import routes from "./routes.js";

class App {
  public server: Express;
  constructor() {
    this.server = express();
    this.addMiddlewares();
    this.addRoutes();
  };

  private addMiddlewares() {
    this.server.use(express.json());
    this.server.use(express.urlencoded({ extended: true }));
    this.server.use(cors());
  }

  private addRoutes() {
    this.server.use(routes);
  }
}

export default new App().server;