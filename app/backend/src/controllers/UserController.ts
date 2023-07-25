import { Request, Response } from 'express';
import JWT from '../utils/JWT';
import UserService from '../services/UserService';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class UserController {
  constructor(
    private userService = new UserService(),
  ) { }

  public async getAllUsers(req: Request, res: Response): Promise<Response> {
    const response = await this.userService.getAllUsers();
    return res.status(mapStatusHTTP(response.status)).json(response.data);
  }

  public async getUserById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const response = await this.userService.getUserById(Number(id));

    if (response.status !== 'SUCCESSFUL') {
      return res.status(mapStatusHTTP(response.status)).json(response.data);
    }

    return res.status(200).json(response.data);
  }

  public async login(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    const response = await this.userService.login(email, password);

    if (response.status !== 'SUCCESSFUL') {
      return res.status(mapStatusHTTP(response.status)).json(response.data);
    }
    return res.status(200).json({ token: JWT.createToken(email) });
  }

  public async getUserRole(req: Request, res: Response) {
    const { authorization } = req.headers as { authorization: string };

    const token = authorization.split(' ')[1];
    const email = JWT.verifyToken(token) as string;

    const response = await this.userService.getUserRole(email);

    if (response.status !== 'SUCCESSFUL') {
      return res.status(mapStatusHTTP(response.status)).json(response.data);
    }

    return res.status(200).json({ role: response.data.role });
  }
}
