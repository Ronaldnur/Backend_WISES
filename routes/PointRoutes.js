const router =require("express").Router()

const PointController= require("../controllers/PointController")


router.get("/getpoint",PointController.getPointById)


module.exports=router
