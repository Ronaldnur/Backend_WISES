const {User,Point}=require("../models")



const {
    generateToken
}=require("../utils/jwt")

const{
    comparePassword
}=require("../utils/bcrypt")


class UserController{
static async register(req, res) {
    try {
      const { nama, email,no_telp,password, } = req.body;


      // Buat user baru
      const user = await User.create({
        nama,
        email,
        no_telp,
        password,
      });

      const point = await Point.create({ point: 0, userId: user.id });

      user.dataValues.point = point;

      res.status(201).json({
        id:user.id,
        nama:user.nama,
        email:user.email,
        no_telp:user.no_telp,
        alamat:user.alamat,
        detail_alamat:user.detail_alamat,
        createdAt:user.createdAt,
        updatedAt:user.updatedAt,
        point: {
          id: point.id,
          point: point.point,
          userId: point.userId,
          createdAt: point.createdAt,
          updatedAt: point.updatedAt
        }
      }); 
    } catch (error) {
      res.status(500).json({ 
        Error: error.message ,
        Message:"Internal Server Error"
      });
    }
  }
  

  static async login(req,res){
try {
  const {
    email,
    password
  }=req.body

  const data = await User.findOne({
    where:{
      email:email
    } 
  })

  if (!data){
    throw{
      code:404,
      message:"User Belum Teregistari"
    }
  }

  const isValid =comparePassword(password,data.password)

  if (!isValid) {
    throw {
      code: 401,
      message: "Password Salah!"
    }
  }

  const token =generateToken({
    id:data.id,
    email:data.email,
    nama: data.nama,
  })

  res.status(200).json({
    token
  })


} catch (error) {
  res.status(error.code || 500).json(error.message)
}
  }

  static async update_user(req,res){
    try {
      const{
        nama,
        no_telp,
        alamat,
        detail_alamat
      }=req.body

const userId= req.UserData.id

const [updatedRowCount, [updateUser]] = await User.update(
  {
  nama,
  no_telp,
  alamat,
  detail_alamat
},
{
  where: { id: userId },
  returning: true, // Mengembalikan instance pengguna yang diperbarui

})

if (updatedRowCount > 0 && updateUser){

  
  res.status(200).json({
    message: 'User Sukses Diupdate',
    user: {
      id:updateUser.id,
      nama:updateUser.nama,
      email:updateUser.email,
      no_telp:updateUser.no_telp,
      alamat:updateUser.alamat,
      detail_alamat:updateUser.detail_alamat
    } 
  })
}else{
  res.status(404).json({
     message: 'User Tidak Ditemukan'
  })
}

    } catch (error) {
      res.status(500).json({
        message: 'Terjadi Error saat Mengupdate User!!',
        error: error.message
      })
    }
  }

  static async getUserData(req, res) {
    try {
      const userData = req.UserData.id

      const getUser = await User.findOne({ 
        where: {
          id: userData
        },
        attributes: { exclude: ['password'] }
      });
  
      res.status(200).json(getUser);
    } catch (error) {
      res.status(error.code || 500).json(error.message);
    }
  }
}

module.exports=UserController