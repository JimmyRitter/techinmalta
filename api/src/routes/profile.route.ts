import express from 'express';
import { getUserProfile, updateUserProfile } from '../services';

const ProfileRoute = express.Router();

ProfileRoute.get('/', getUserProfile);
ProfileRoute.put('/', updateUserProfile);

export default ProfileRoute;