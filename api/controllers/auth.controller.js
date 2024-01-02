import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';
import { errorHandler } from "../utils/error.js";
import jwt from 'jsonwebtoken';

export const signup = async (req, res, next) => {
    const { username, email, password } = req.body;
    // store the comming information from server
    const hashedPassword = bcryptjs.hashSync(password, 10);
    // hide the password
    const newUser = new User({ username, email, password: hashedPassword });
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
export const signin = async (req, res, next) => {
    const { email, password } = req.body;
    // catch error using middleware inside index.js
    try {
        const validUser = await User.findOne({ email });
        // check email if it exist inside database
        if (!validUser) return next(errorHandler(404, 'User not found!'));
        // if email not found
        const validPassword = bcryptjs.compareSync(password, validUser.password);
        // check password by comparing bycrypt
        if (!validPassword) return next(errorHandler(401, 'Wrong credentials!'));
        // if password not correct return error
        // if email & password correct authenticate user using cookies, hashed token include email of user save token inside browser cookie
        // each time user change email or password we need to check if it is authentic or not using jwt to create token
        const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
        // initialize token, unique info user id(automatically saved inside mongo) secret key unique for application
        // using env to hide key
        const { password: pass, ...rest } = validUser._doc;
        // return all rest things to user exept password
        res
            .cookie('access_token', token, { httpOnly: true })
            .status(200)
            .json(rest);
        // save token inside cookie, unique http
    } 
    catch (error) {
        next(error);
      }
    }