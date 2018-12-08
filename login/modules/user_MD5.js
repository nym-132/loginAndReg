const md5=require("js-md5");
const db=require("./db.js");
const jwt=require("./jwt.js");
module.exports={
	_yz(req,res){
		let data=req.query;
		if(data.tel){
			db.count("userList",{tel:data.tel},(err,count)=>{
				if(count==0){
					res.send({
						status:"1",
						statusText:"ok"
					})
				}else{
					res.send({
						status:"-1",
						statusText:"手机号已经存在"
					})
				}
			})
		}else if(data.username){
			db.count("userList",{username:data.username},(err,count)=>{
				if(count==0){
					res.send({
						status:"1",
						statusText:"ok"
					})
				}else{
					res.send({
						status:"-2",
						statusText:"用户名已经存在"
					})
				}
			})
		}else{
			res.send({
				status:"-3",
			    statusText:"数据有误"
			})
		}
	},
	_zhuce(req,res){
		let data=req.body;
		if(data.username&&data.tel&&data.password){
			data.password=md5(data.password);
			db.insertOne("userList",data,(err,data)=>{
				if(err) throw err;
				res.send({
					status:"1",
					statusText:"注册成功",
					url:"http://localhost:82/login.html"
				})
			})
		}else{
			res.status(400)
		}
	},
	_login(req,res){
		let data=req.body;
		if(data.username){
			db.find("userList",{query:{username:data.username,password:md5(data.password)}},(err,userdata)=>{
				if(userdata.length>0){
					let user=userdata[0];
					res.send({
						status:"1",
						statusText:"ok",
						url:"http://localhost:82/shop.html",
						data:{
							id:user._id,
							username:user.username,
							tokenID:jwt.getToken({id:user._id},"7d")
						}
					})
				}else{
					res.status(400);
					res.send("登陆错误")
				}
			})
		}else{
			db.find("userList",{query:{tel:data.tel,password:md5(data.password)}},(err,userdata)=>{
				console.log(userdata);
				if(userdata.length>0){
					let user=userdata[0];
					res.send({
						status:"1",
						statusText:"ok",
						url:"http://localhost:82/shop.html",
						data:{
							id:user._id,
							username:user.username,
							tokenID:jwt.getToken({id:user._id},"7d")
						}
					})
				}else{
					res.status(400);
					res.send("登录错误");
				}
			})
		}
	}
}
