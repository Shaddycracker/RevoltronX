// import MasterController from '../../../utils/MasterController';
// import { StatusCodes } from '../../../enums/StatusCodes';
// import ResponseBuilder from '../../../utils/ResponseBuilder';
// import RequestBuilder from '../../../utils/RequestBuilder';
// import Joi from 'joi';
// import userService from '../services/user.service';
// import { IRegisterUser } from '../interfaces';
//
// export default class RegisterUserController extends MasterController<null, null, IRegisterUser> {
//
//     public static validate(): RequestBuilder {
//         const payload = new RequestBuilder();
//
//         payload.addToBody(
//             Joi.object().keys({
//                 name: Joi.string().required(),
//                 email: Joi.string().email().required(),
//                 password: Joi.string().min(8).max(20).required(),
//             })
//         );
//
//         return payload;
//     }
//
//     async restController(
//         params: null,
//         query: null,
//         body: IRegisterUser,
//         headers: any,
//         allData: any
//     ): Promise<ResponseBuilder> {
//         const { name, email, password } = body;
//
//         const response = await userService.registerUser({ name, email, password });
//
//         return new ResponseBuilder(StatusCodes.SUCCESS, response, 'User registered successfully');
//     }
// }

// controllers/registerUser.controller.ts
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
