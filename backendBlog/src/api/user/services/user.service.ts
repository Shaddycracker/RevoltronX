import { ILoginUser, IRegisterUser } from '../interfaces';
import User from '../../../models/user.model'; // Update the path if different
import bcrypt from 'bcrypt';

class UserService {
    async registerUser(data: IRegisterUser) {
        const existingUser = await User.findOne({ email: data.email });

        if (existingUser) {
            throw new Error('User already exists');
        }

        const hashedPassword = await bcrypt.hash(data.password, 10);

        const newUser = new User({
            name: data.name,
            email: data.email,
            password: hashedPassword,
        });

        return await newUser.save();
    }

    async loginUser(data: ILoginUser) {
        const user = await User.findOne({ email: data.email });

        if (!user) {
            throw new Error('User does not exist');
        }

        const isPasswordValid = await bcrypt.compare(data.password, user.password ?? '');

        if (!isPasswordValid) {
            throw new Error('Invalid password');
        }

        return user;
    }
}

export default new UserService();
