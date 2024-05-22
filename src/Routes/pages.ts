import { Router, Request, Response } from "express";
import IndexController from "../Controllers/Pages/auth";

const pagesRouter = Router();
const auth = new IndexController();
pagesRouter.get("/pages", (req: Request, res: Response) =>
  auth.AuthPage(req, res)
);
export default pagesRouter;
