import { Document, Schema, model } from "mongoose";

export interface IUser extends Document{
    name:string,
    email:string,
    password:string,
}

const UserSchema:Schema=new Schema({
    name:{type:String},
    email:{type:String},
    password:{type:String},

})

export default model<IUser>("User",UserSchema);