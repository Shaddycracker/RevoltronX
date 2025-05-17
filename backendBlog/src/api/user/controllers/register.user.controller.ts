import { Request, Response } from 'express';
import Joi from 'joi';
import userService from '../services/user.service';

export const registerUserSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(20).required(),
});

export const RegisterUserController = async (req: Request, res: Response) => {
    try {
        const { error } = registerUserSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const { name, email, password } = req.body;
        const response = await userService.registerUser({ name, email, password });

        return res.status(201).json({ message: 'User registered successfully', data: response });
    } catch (err) {
        return res.status(500).json({ message: 'Internal server error', error: err });
    }
};
