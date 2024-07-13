const {User,Point}=require("../models")


class PointController {
static async getPointById(req, res) {
  try {
      const userData = req.UserData
   
    
    const getPoint = await Point.findOne({
        where:{
            userId:userData.id,  
        },
    });

    res.status(200).json({
      data:getPoint
    });
  } catch (error) {
    res.status(error.code || 500).json(error.message);
  }
}


}


module.exports=PointController