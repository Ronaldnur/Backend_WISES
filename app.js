const express= require("express")
const app= express()
const routes=require("./routes")


app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use(routes)

// app.listen(PORT, () => {
//     console.log("App running on port:", PORT);
//   })

module.exports=app