import mongoose from "mongoose"

module.exports = {
    signUpValidation : async (req, res, next) => {
        if(Object.keys(req.body).length === 0){
            return res.status(400).send({
                error: {
                    message: 'Payload missing.'
                }
            });
        }else if(!req.body.email){
            return res.status(400).send({
                error: {
                    message: 'Email is missing.'
                }
            });
        }else if(!req.body.password){
            return res.status(400).send({
                error: {
                    message: 'Password is missing.'
                }
            });
        }else if(!req.body.role){
            return res.status(400).send({
                error: {
                    message: 'Role is  missing.'
                }
            });
        }else{
            next();
        }
    },
    
    loginValidation : async (req, res, next) => {
        if (Object.keys(req.body).length === 0) {
            return res.status(400).send({
                error: {
                    message: 'Payload is missing.'
                }
            });
        }else if(!req.body.email){
            return res.status(400).send({
                error: {
                    message: 'Email is  missing.'
                }
            });
        }else if(!req.body.password){
            return res.status(400).send({
                error: {
                    message: 'Password is  missing.'
                }
            });
        }else {
            next();
        } 
    },

    updateAnyUserValidation : async (req, res, next) => {
        if(!req.params.userId){
            return res.status(400).send({
                error: {
                    message: 'userId is missing.'
                }
            });
        }

        const checkObjId = mongoose.isValidObjectId(req.params.userId)
        if(checkObjId !== true){
            return res.status(400).send({
                error: {
                    message: 'Valid objectId required.'
                }
            });
        }

        next();
    },

    deleteAnyUserValidation : async (req, res, next) => {
        if(!req.params.userId){
            return res.status(400).send({
                error: {
                    message: 'userId is missing.'
                }
            });
        }

        const checkObjId = mongoose.isValidObjectId(req.params.userId)
        if(checkObjId !== true){
            return res.status(400).send({
                error: {
                    message: 'Valid objectId required.'
                }
            });
        }

        next();
    }
}