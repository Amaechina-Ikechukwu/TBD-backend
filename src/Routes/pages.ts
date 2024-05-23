import { Router, Request, Response, NextFunction } from "express";
import IndexController from "../Controllers/Pages/auth";

class PagesRouter {
  private readonly router: Router;
  private readonly auth: IndexController;

  constructor() {
    this.router = Router();
    this.auth = new IndexController();
    this.initializeRoute();
  }
  private initializeRoute(): void {
    this.router.get("/pages", this.loadPage.bind(this));
  }

  private async loadPage(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    this.auth.AuthPage(req, res);
  }
  public getRouter(): Router {
    return this.router;
  }
}
export default PagesRouter;
