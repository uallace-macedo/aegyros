import { Router, type IRouter } from "express";

const routes: IRouter = Router();
routes.get("/", (req, res) => {
  res.status(200).json({ status: "ok" });
})

export default routes;