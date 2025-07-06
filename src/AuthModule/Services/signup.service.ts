import { IUserInput } from "../../shared/modals/user.modal";
import { BadRequestError } from "../../shared/utils/apiError";
import { generateJwt } from "../../shared/utils/helpers";
import { UserRepository } from "../Repositories/user.repository";

export class SignupService{
    private userRepository : UserRepository;
    constructor(){
        this.userRepository = new UserRepository();
    }

    public onBoardedUser = async(userSignupDto: IUserInput)=>{
        try {
            const getUser = await this.userRepository.getUserByEmail(userSignupDto.email);
            if(getUser) throw new BadRequestError("User already exist !!");
            const newUser = await this.userRepository.createUser(userSignupDto);
            const token = generateJwt(newUser.id);
            return {newUser, token};
        } catch (error) {
            if(error instanceof Error){
                console.log(error.message);
                throw new BadRequestError(error.message);
            }else{
                console.log(`Something went wrong while onboarding new user !!`);
                throw new BadRequestError(`Something went wrong while onboarding new user !!`);
            }
        }
    }

}