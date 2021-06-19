const express = require("express")
const csvtojson = require('csvtojson');
const csv = require('csv-parser')
const fs = require("fs");
const  {company} = require("./model/companyDetails")
const {user} = require("./model/user")
const app = express()
const port = process.env.PORT || 3000
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const jwt = require('jsonwebtoken');
const secretKey = "secretKey"
const cors = require("cors")
app.use(cors())
require("./database/database")
app.use(express.json())
user.create({
    userName:"Batman",
    password:"iambatman",
})

app.put("/login",async(req,res)=>{
    try{
        let {userName,password} = req.body 
        if(!userName ||!password){
            return res.status(422).json({
                status:false,
                message:"please provide userName And Password"
            })
        }
        else{
            const condition  ={
                where:{userName }
            }
         let findUser = await user.findOne(condition)
         if(findUser){
             const {id} =findUser
             if(findUser.password == password){
                let data ={id,userName }
                const token = await createToken(data)
                let responseData ={
                    id,userName,token
                }
                return res.status(200).json({
                    status:true,
                    payload:responseData
                })

             }else{
                return res.status(400).json({
                    status:false,
                    message:"incorrect password"
                })
             }
         }
         else{
            return res.status(404).json({
                status:false,
                message:"No user found"
            })
         }
    
        }
    }
    catch(error){
        const {errors} =error
       return res.status(500).json({
            status:false,
            message: error.errors && errors[0] && errors[0].message || error.message 
        })


    }

  

})

// app.get("/company",async(req,res)=>{
app.post("/company",verifyToken ,async(req,res)=>{
    try{
        let {searchText} =req.body 
        // if(!searchText)
        //     return res.status(422).json({
        //     status:false,
        //     message:"please provide company name"
        // })
            const getCompany = await company.findAll({
                where:{
                        name:{
                            [Op.and]:[
                                {[Op.regexp]:`^${searchText}`},  
                        ]
                        }
                }
            })
            if(getCompany){
               return res.status(200).json({
                    status:true,
                    payload:getCompany
                })
            }
    }
    catch(error){
        const {errors} =error
      return res.status(500).json({
            status:false,
            message: error.errors && errors[0] && errors[0].message || error.message 
        })

    }
})
// app.post("/insertData",(req,res)=>{
//     try{
        fs.createReadStream("nseFile.csv").pipe(csv())
         .on("data",(s)=>{
            company.create({
                name:s.Name,
                currentMarketPrice:s['Current Market Price'],
                marketCap:s['Market Cap'],
                stockPE:s['Stock P/E'],
                dividendYield:s["Dividend Yield"],
                roce:s['ROCE %'],
                rocePreviousAnnum:s["ROE Previous Annum"],
                debToEquity:s["Debt to Equity"],
                eps:s.EPS,
                reserves:s.Reserves,
                debt:s.Debt,
            })
  }).on("error",(error)=>{
      console.log(error)
  })
//   res.status(200).json({
//       status:true,
//       payload:"success"
//   })

//     }
//     catch(error){
//         const {errors} =error
//         return res.status(500).json({
//             status:false,
//             message: error.errors && errors[0] && errors[0].message || error.message 
//         })
//     }
// })


function createToken(data){
    return jwt.sign(data,secretKey,{expiresIn:"1h"})
}


exports.errorMessage =(response,statusCode,message)=>{
    return response.status(statusCode).json({status:false,message:message})
}

function verifyToken (req,res,next){
    try{
        let token = req.headers["authorization"] 
        console.log(token)
        token = token && token.split("Bearer")[1] && token.split("Bearer")[1].trim()
        if(token){
            return jwt.verify(token,secretKey,(err,tokenDetails)=>{
            if(err)
            return res.status(401).json({status:false,message:err.message})
            else {
                const {id,userName} =tokenDetails
                req.userId=id
                req.userName=userName
                next()
            } 
        })
        }
        else
        return res.status(401).json({status:false,message:"Unauthorized"})
    }
    catch(error){
        const {errors} =error
        return res.status(500).json({
            status:false,
            message: error.errors && errors[0] && errors[0].message || error.message 
        })
    }
}




app.listen(port,(err,data)=>{
    if(err)
    console.error('failed to start server :' ,err)
    else
    console.log("server started at port :",port)
})