import { Application, Request, Response } from 'express';
import UserStore from '../models/user';
import { jwtSign } from '../utils/jwt_tokens';

const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await new UserStore().index();
    res.status(200).json({ users });
  } catch (error) {
    res.status(400).json({
      message: (error as Error).message,
    });
  }
};

const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, firstName, lastName, password } = req.body;

    const user = await new UserStore().create(
      username,
      firstName,
      lastName,
      password,
    );

    const token = jwtSign(user);

    res.status(201).json({ ...user, token });
  } catch (error) {
    res.status(400).json({
      message: (error as Error).message,
    });
  }
};
const authUser = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    const user = await new UserStore().authenticate(username, password);

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({
        message: 'No User Found',
      });
    }
  } catch (error) {
    res.status(400).json({
      message: (error as Error).message,
    });
  }
};

const users_routes = (app: Application) => {
  app.get('/users', getUsers);
  app.post('/users', createUser);
  app.post('/users/auth', authUser);
};

export default users_routes;
