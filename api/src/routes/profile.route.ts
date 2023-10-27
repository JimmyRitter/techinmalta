import express from 'express';
import { getUserProfile } from '../services';

const ProfileRoute = express.Router();

ProfileRoute.get('/', getUserProfile);

export default ProfileRoute;