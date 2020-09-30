import express from 'express'  
import userController from "../controller/userController"
import allowIfLoggedIn from "../middleware/authenticate"
import payloadValidation from "../middleware/validation"

const router = express.Router();
 
router.post('/signup', payloadValidation.signUpValidation, userController.signup);
 
router.post('/login', payloadValidation.loginValidation, userController.login);
 
router.get('/user/:userId', allowIfLoggedIn, userController.getUser);
 
router.get('/userProfileInfo', allowIfLoggedIn, userController.grantAccess('readAny', 'profile'), userController.getUsers);
 
router.put('/updateUserInfo/:userId', allowIfLoggedIn, userController.grantAccess('updateAny', 'profile'), userController.updateUser);
 
router.delete('/deleteUser/:userId', allowIfLoggedIn, userController.grantAccess('deleteAny', 'profile'), userController.deleteUser);
 
module.exports = router;