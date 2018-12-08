const express=require("express");
const http=express();
const bodyParser=require("body-parser");
const userRouter=require("./router/user.js");
const tokenRouter=require("./router/tokenRouter.js");
const jwt=require("jsonwebtoken");
http.listen(82,()=>{
	console.log("ok 82")
})
http.use(express.static("./public"))
http.use(express.static("./public/html"))
http.use(bodyParser.urlencoded({extended:false}));

http.use("/user",userRouter);//创建user路由   存放所有用户相关的接口
http.use("/token",tokenRouter);//创建tokenRouter路由   存放身份验证的接口
//创建admin路由   后台管理的接口
