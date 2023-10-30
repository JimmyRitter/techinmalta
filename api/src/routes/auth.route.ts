import express from 'express';
import { login } from '../services';

const AuthRoute = express.Router();

AuthRoute.post('/login', login);

export default AuthRoute;