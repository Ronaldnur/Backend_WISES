const router =require("express").Router()

const TransaksiController=require("../controllers/TransaksiController")
const {authorization} =require("../middlewares/auth")


router.post("/setor",authorization,TransaksiController.setorSampah)
router.get("/getsetor",TransaksiController.getTransaksi)

module.exports=router