import { BadRequestError } from "../../shared/utils/apiError";
import { generateJwt } from "../../shared/utils/helpers";
import { SuccessResponse } from "../../shared/utils/successResponse"
import { UserRepository } from "../Repositories/user.repository";
import { IUserLoginDto } from "../types/login.types";

export class LoginService{
    private repository: UserRepository;
    constructor(){
        this.repository = new UserRepository();
    }
    public login = async(userLoginDto: IUserLoginDto)=>{
        const {email, password} = userLoginDto;
        const user = await this.repository.getUserByEmail(email);
        const matched = user.comparePassword(password);
        if(!matched) throw new BadRequestError("Invalid Credentials !!");
        const token = generateJwt(user.id);
        return {user, token};
    }
}