import { Response } from 'express';
import type { AuthRequest } from '../../../handlers/type';
import User from '../../../models/user.model'; // adjust based on your model path

export const getUserProfile = async (req: AuthRequest, res: Response) => {
    try {
        const user = await User.findById(req.userId).select('-password'); // remove sensitive fields
        if (!user) return res.status(404).json({ message: 'User not found' });

        res.status(200).json(user);
    } catch (error) {
        console.error('Get user profile error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
