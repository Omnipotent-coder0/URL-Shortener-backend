import { promises } from "dns";
import { IUserInput, User, UserDocument } from "../../shared/modals/user.modal";
import { BadRequestError } from "../../shared/utils/apiError";

export class UserRepository{
    constructor(){

    }
    public getUserByEmail = async(email: string) : Promise<UserDocument>=>{
        const findUser = await User.findOne({email});
        if(!findUser) throw new BadRequestError("Invalid Credentials !!");
        return findUser;
    }
    public createUser = async(onBoardUserDto: IUserInput) : Promise<UserDocument>=>{
        const newUser = new User(onBoardUserDto);
        await newUser.save();
        return newUser;
    }
}