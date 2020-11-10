// list界面&&
const express = require('express')
const router = express.Router();


//设置二级路由 

//GET api/list/test
//返回一个json对象
router.get("/test", (req, res) => {
    res.json({
        msg: 'list'
    })
})

module.exports = router;