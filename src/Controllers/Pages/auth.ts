import { Request, Response } from "express";
import path from "path";
class IndexController {
  public AuthPage(req: Request, res: Response): void {
    const filePath = path.join(__dirname, "../../Public/Login.html");
    res.sendFile(filePath);
  }
}

export default IndexController;
