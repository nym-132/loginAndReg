const express=require("express");
const router=express.Router();
const userMd=require("../modules/user_MD5.js");
router.get("/yz",userMd._yz);
router.post("/zhuce",userMd._zhuce);
router.post("/login",userMd._login);


module.exports = router;