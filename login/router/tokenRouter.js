const express=require("express");
const router=express.Router();;
const jwt=require("../modules/jwt.js");

router.use((req,res,next)=>{
	console.log("req.headers:",req.headers)
	let token=req.headers.authorization;
	let userid=req.headers.userid;
	console.log("token:",token)
	
	jwt.setToken(token,(err,data)=>{
		if(err){
			res.status(401);
			res.send();
		}else{
			if(userid==data.id){
				next()
			}else{
				res.status(401);
				res.send();
			}
		}
	})
})
router.post("/",(req,res)=>{
	res.send("ok")
})




module.exports = router;