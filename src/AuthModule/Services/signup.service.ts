import { IUserInput } from "../../shared/modals/user.modal";
import { BadRequestError } from "../../shared/utils/apiError";
import { UserRepository } from "../Repositories/user.repository";

export class SignupService{
    private userRepository : UserRepository;
    constructor(){
        this.userRepository = new UserRepository();
    }

    public onBoardedUser = async(userSignupDto: IUserInput)=>{
        try {
            const newUser = await this.userRepository.createUser(userSignupDto);
            return newUser;
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