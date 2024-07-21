const router = require("express").Router();
const Multer = require('multer');
const PredictController = require("../controllers/Predict");


const multer = Multer({
    storage: Multer.memoryStorage()
});

router.post("/", multer.single('image'), PredictController.predictMain);

module.exports = router;
