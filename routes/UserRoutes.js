const router =require("express").Router()

const UserController=require("../controllers/UserController")

const {authentication} =require("../middlewares/auth")


router.post("/register",UserController.register)
router.post("/login",UserController.login)
router.put("/update_user",authentication,UserController.update_user)
router.get("/getuser",authentication,UserController.getUserData)

module.exports=router