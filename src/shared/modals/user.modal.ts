import mongoose, { Document, model, Model, Schema } from "mongoose";
import {compareSync, hashSync} from "bcrypt"
import { UserRoles } from "../enums/user.enum";

export interface IUserInput{
    email: string;
    firstName: string;
    lastName: string;
    role: UserRoles;
    password: string;
}

export interface UserDocument extends IUserInput, Document{
    fullName: string;
    createdAt: Date;
    updatedAt: Date;
    comparePassword(password: string): boolean;
    getRole(): UserRoles;
}

interface UserModel extends Model<UserDocument>{

}

const userSchema = new Schema<UserDocument, UserModel>({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true,
    },
    role:{
        type: String,
        enum: Object.values(UserRoles),
        required: true,
    }
})

userSchema.virtual("fullName").get(function(){
    return `${this.firstName} ${this.lastName}`
});

userSchema.pre("save",function(next){
    if(this.isModified("password")){
        this.password = hashSync(this.password, 10);
    }
    next();
});

userSchema.methods.getRole = function(){
    if(this.role == UserRoles.SELLER) return UserRoles.SELLER;
    else if(this.role == UserRoles.USER) return UserRoles.USER;
}

userSchema.methods.comparePassword = function(password: string) : boolean {
    return compareSync(password, this.password);
}

export const User = model<UserDocument, UserModel>("User", userSchema);
