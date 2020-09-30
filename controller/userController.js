import User from "../schema/userModel"
import jwt from "jsonwebtoken"
import bcrypt from 'bcryptjs'
import { roles } from "../roles"

require('dotenv').config()
 
async function hashPassword(password) {
 return await bcrypt.hash(password, 10);
}
 
async function validatePassword(plainPassword, hashedPassword) {
 return await bcrypt.compare(plainPassword, hashedPassword);
}
 
exports.signup = async (req, res, next) => {
    try {
        const { email, password, role } = req.body

        //#region checking duplicate
        const isExist = await User.findOne({email})
        if(isExist){
            return res.status(412).send({
                error: {
                    message: 'Email is already exist.'
                }
            });
        }
        //#endregion
        
        /**Hash user password */
        const hashedPassword = await hashPassword(password);

        /**save new user */
        const newUser = new User({ email, password: hashedPassword, role: role});
        await newUser.save();
        
        /**Generate JWT access toke  */
        const accessToken = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
        expiresIn: "1d"
        });

        /**generate response object */
        let respObj = {
            userId : newUser._id,
            name : null,
            email : newUser.email,
            role : newUser.role
        }

        return res.status(200).send({
            message : "User has been successfully created.",
            data: respObj,
            accessToken
        })
    } catch (error) {
        next(error)
    }
}

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) 
            return res.status(200).send({
                message: 'Email does not exist.',
                data : {},
                accessToken : ''
            });

        const validPassword = await validatePassword(password, user.password);
        if (!validPassword) 
            return res.status(200).send({
                message: 'Password is not correct.',
                data : {},
                accessToken : ''
            });

        const accessToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1d"
        });
        
        res.status(200).json({
            message : "You have logged in successfully.",
            data: { userId : user._id, name : user.name, email: user.email, role: user.role },
            accessToken
        })
    } catch (error) {
        next(error);
    }
}

exports.getUsers = async (req, res, next) => {
    const users = await User.find({}).sort({_id : -1});
    res.status(200).json({
        data: users
    });
   }
    
exports.getUser = async (req, res, next) => {
    try {
        const userId = req.params.userId;
        const user = await User.findById(userId);
        if (!user) return next(new Error('User does not exist'));
        res.status(200).json({
        data: user
        });
    } catch (error) {
        next(error)
    }
}
    
exports.updateUser = async (req, res, next) => {
    try {
        const update = req.body
        const userId = req.params.userId;
        await User.findByIdAndUpdate(userId, update);

        const user = await User.findById(userId)
        
        res.status(200).json({
            data: user,
            message: 'User has been updated'
        });
    } catch (error) {
        next(error)
    }
}
    
exports.deleteUser = async (req, res, next) => {
    try {
        const userId = req.params.userId;
        const deletedResp = await User.findByIdAndDelete(userId)

        if(deletedResp)
            return res.status(200).json({
                data: null,
                message: 'User has been deleted successfully.'
            });
        
        return res.status(200).send({
            message: 'No user found.',
            data : null,
        });
    } catch (error) {
        next(error)
    }
}

exports.viewProfile = async(req, res, next) => {
    try {
        const userId = req.user._id;
        const user = await User.findById(userId)
        
        res.status(200).json({
            data: user,
            message: 'Profile info fetched successfully.'
        });
    } catch (error) {
        next(error)
    }
}


exports.updateProfile = async (req, res, next) => {
    try {
        const update = req.body
        const userId = req.user._id;
        await User.findByIdAndUpdate(userId, update);

        const user = await User.findById(userId)
        
        res.status(200).json({
            data: user,
            message: 'Your profile has been updated successfully.'
        });
    } catch (error) {
        next(error)
    }
}

exports.grantAccess = function(action, resource) {
    return async (req, res, next) => {
        try {
            //get all roles using promise
            const getAllRoles = await new Promise((resolve, reject) =>
                resolve(roles)
            )
            //end

            const permission = getAllRoles.can(req.user.role)[action](resource);

            if (!permission.granted) {
                return res.status(401).json({
                    error: "You don't have enough permission to perform this action"
                });
            }

            next()
            
        } catch (error) {
            next(error)
        }
    }
}