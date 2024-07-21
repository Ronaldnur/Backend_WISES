const router = require("express").Router()

const userRoutes=require("./UserRoutes")
const pointRoutes=require("./PointRoutes")
const transaksiRoutes=require("./TransaksiRoutes")
const predictedRoutes = require("./PredictRouter");

const {authentication} =require("../middlewares/auth")


router.use("/users", userRoutes)
router.use("/point",authentication,pointRoutes)
router.use("/transaksi",authentication,transaksiRoutes)
router.use("/predict",predictedRoutes)


module.exports=router