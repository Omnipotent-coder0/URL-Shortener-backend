import { ObjectId } from "mongoose";
import { User, UserDocument } from "../../shared/modals/user.modal";

export class UserRepository{
    public getUserById = async(UserId: ObjectId) : Promise<UserDocument> =>{
        return await User.findById(UserId);
    }
}