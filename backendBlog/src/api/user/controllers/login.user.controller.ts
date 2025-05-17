// import MasterController from '../../../utils/MasterController';
// import RequestBuilder from '../../../utils/RequestBuilder';
// import Joi from 'joi';
// import { ILoginUser } from '../interfaces';
// import userService from '../services/user.service';
// import ResponseBuilder from '../../../utils/ResponseBuilder';
// import { StatusCodes } from '../../../enums/StatusCodes';
//
// export default class LoginUserController extends MasterController<any, any, ILoginUser> {
//
//     public static validate() {
//         const payload = new RequestBuilder();
//
//         payload.addToBody(
//             Joi.object().keys({
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
//         body: ILoginUser,
//         headers: any,
//         allData: any
//     ): Promise<ResponseBuilder> {
//         const { email, password } = body;
//
//         const response = await userService.loginUser({ email, password });
//
//         return new ResponseBuilder(StatusCodes.SUCCESS, response, 'User logged in successfully');
//     }
// }

// controllers/loginUser.controller.ts
import { Request, Response } from 'express';
import Joi from 'joi';
import userService from '../services/user.service';

export const loginUserSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(20).required(),
});

export const LoginUserController = async (req: Request, res: Response) => {
    try {
        const { error } = loginUserSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const { email, password } = req.body;
        const response = await userService.loginUser({ email, password });

        return res.status(200).json({ message: 'User logged in successfully', data: response });
    } catch (err) {
        return res.status(500).json({ message: 'Internal server error', error: err });
    }
};
