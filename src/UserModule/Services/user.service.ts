import { ObjectId } from "mongoose";
import { UserRepository } from "../Repositories/user.repository";
import { User } from "../../shared/modals/user.modal";
import { AuthorizationError, BadRequestError } from "../../shared/utils/apiError";

export class UserService{
    private repository: UserRepository;
    constructor(){
        this.repository = new UserRepository();
    }
    public getUserById=async(UserId: ObjectId)=>{
        try {
            const findUser =  await this.repository.getUserById(UserId);
            if(!findUser) throw new BadRequestError("Invalid User Id !!");
            return findUser;
        } catch (error) {
            throw new AuthorizationError("Invalid Jwt Token !!");
        }
    }
}