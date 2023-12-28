import { RequestHandler } from 'express'
import User from '../model/User'
import createHttpError from 'http-errors'

export const getUsers:RequestHandler=async (req,res,next)=>{
    try {
        const Users=await User.find({});
        console.log(Users);
        res.json(Users)
    } catch (error) {
        return next(createHttpError.InternalServerError)
    }
}

export const addUser:RequestHandler=async (req,res,next)=>{
    const {name,password,email}:IUserData=req.body;

    try {
        // const user=await User.findOne({email});

        // if (user) {return next(createHttpError(406, "This user already exists"));}
        const body=req.body;
        const newUser=new User(body.toJSON());
        console.log(newUser);
        
        await newUser.save();
        res.json({ name, email });
    } catch (error) {
        return next(createHttpError.InternalServerError);
    }
}