import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';

export const signup = async (req, res) =>{
    const {username,email,password}= req.body;
    // store the comming information from server
    const hashedPassword = bcryptjs.hashSync(password, 10);
    // hide the password
    const newUser= new User({username, email, password: hashedPassword});
    // save inside database
    try {
        await newUser.save()
    // it takes time to save
    res.status(201).json("user created successfully")
    // something is created & message
    } catch (error) {
        res.status(500).json(error.message);
        // any error
    }
    // if user entered against policy then arise error
}