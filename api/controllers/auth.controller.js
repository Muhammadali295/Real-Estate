import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';
import { errorHandler } from "../utils/error.js";

export const signup = async (req, res, next) =>{
    const {username,email,password}= req.body;
    // store the comming information from server
    const hashedPassword = bcryptjs.hashSync(password, 10);
    // hide the password
    const newUser= new User({username, email, password: hashedPassword});
    // save inside database encripted password
    try {
        await newUser.save()
        // it takes time to save
        res.status(201).json("user created successfully")
    // something is created & message
    } catch (error) {
        next(error);
        // any error send to json
    };
    // if user entered against policy then arise error
};