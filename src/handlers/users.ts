import { Application, Request, Response } from 'express';
import { bodyValidator, paramsValidator } from '../middlewares/validator';
import {
  authUserSchema,
  createUserSchema,
} from '../libs/validator/validatorSchems/users';
import UserStore from '../models/user';
import { jwtSign } from '../utils/jwt_tokens';
import { idsSchema } from '../libs/validator/validatorSchems/ids';
import authenticated from '../middlewares/authenticated';

const index = async (_req: Request, res: Response): Promise<void> => {
  try {
    const users = await new UserStore().index();
    res.status(200).json(users);
  } catch (error) {
    res.status(422).json({ message: (error as Error).message });
  }
};

const show = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = parseInt(req.params.id);
    const user = await new UserStore().show(userId);
    res.json(user);
  } catch (error) {
    res.status(422).json({ message: (error as Error).message });
  }
};

const create = async (req: Request, res: Response): Promise<void> => {
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
    res.status(422).json({ message: (error as Error).message });
  }
};

const auth = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password } = req.body;

    const user = await new UserStore().authenticate(username, password);

    if (user) {
      const token = jwtSign(user);
      res.status(200).json({ ...user, token });
    } else {
      res.status(404).json({
        message: 'No User Found',
      });
    }
  } catch (error) {
    res.status(422).json({ message: (error as Error).message });
  }
};

const users_routes = (app: Application) => {
  app.get('/users', authenticated, index);
  app.get('/users/:id', authenticated, paramsValidator(idsSchema), show);
  app.post('/users', bodyValidator(createUserSchema), create);
  app.post('/users/auth', bodyValidator(authUserSchema), auth);
};

export default users_routes;
