const router = require("express").Router()

const userRoutes=require("./UserRoutes")
const pointRoutes=require("./PointRoutes")
const transaksiRoutes=require("./TransaksiRoutes")

const {authentication} =require("../middlewares/auth")


router.use("/users", userRoutes)
router.use("/point",authentication,pointRoutes)
router.use("/transaksi",authentication,transaksiRoutes)


module.exports=router