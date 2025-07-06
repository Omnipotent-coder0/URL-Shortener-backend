import { IUserInput, User, UserDocument } from "../../shared/modals/user.modal";

export class UserRepository{
    constructor(){

    }
    public getUserByEmail = async(email: string) : Promise<UserDocument>=>{
        const findUser = await User.findOne({email});
        return findUser;
    }
    public createUser = async(onBoardUserDto: IUserInput) : Promise<UserDocument>=>{
        const newUser = new User(onBoardUserDto);
        await newUser.save();
        return newUser;
    }
}