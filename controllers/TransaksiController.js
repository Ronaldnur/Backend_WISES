const {User,Point,Sampah,Transaksi,Kantong}=require("../models")

class TransaksiController{
    static async setorSampah (req,res){
        try {
           const  {jumlah_kantong,kantong_id,sampah_id}=req.body

           const userData= req.UserData 

           const kantong = await Kantong.findByPk(kantong_id);
           if (!kantong) {
               return res.status(404).json({ message: "Kantong tidak ditemukan" });
           }

           let poinPerKantong;
           switch (kantong.jenis_kantong) {
               case 'Kecil':
                   poinPerKantong = 15;
                   break;
               case 'Sedang':
                   poinPerKantong = 30;
                   break;
               case 'Besar':
                   poinPerKantong = 45;
                   break;
               default:
                   return res.status(400).json({ message: "Jenis kantong tidak valid" });
           }

           const totalPoin = jumlah_kantong * poinPerKantong;

            const setor= await Transaksi.create({
                jumlah_kantong,
                kantong_id,
                sampah_id,
                user_id:userData.id,
                transaksi_point: totalPoin
            })

            const userPoints = await Point.findOne({ where: { userId: userData.id } });
            if (!userPoints) {
                return res.status(404).json({ message: "Poin pengguna tidak ditemukan" });
            }

            userPoints.point += totalPoin;
            await userPoints.save();

            return res.status(201).json({
                message: "Transaksi berhasil",
                transaction: setor,
                points: userPoints
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Terjadi kesalahan pada server" });
        }
    }

    static async getTransaksi (req,res){
        try {
            const userData = req.UserData
         
          
          const getTransaksi = await Transaksi.findAll({
              where:{
                  user_id:userData.id,  
              },
          });
      
          res.status(200).json({
            data:getTransaksi
          });
        } catch (error) {
          res.status(error.code || 500).json(error.message);
        } 
    }
}

module.exports=TransaksiController