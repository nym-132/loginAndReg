const jwt=require("jsonwebtoken");
const key="我是谁";
module.exports={
	//加密
	getToken(content,exp){
		return jwt.sign(content,key,{expiresIn:exp})
    },
	//解密
	setToken(token,callback){
		jwt.verify(token,key,callback)
	}
}

