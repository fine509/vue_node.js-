//借钱
const express = require('express')
const borrow = express.Router();
const passpost = require('passport')
const Borrow = require('../modules/borrow')

//设置二级路由 
//GET api/Borrow/findall
borrow.get("/findall/:id", passpost.authenticate('jwt', { session: false }), async(req, res) => {

        await Borrow.find({ userid: req.params.id })
            .then(borrow => { if (!borrow) res.json('查找失败'); return res.json(borrow) })
            .catch(err => res.status(404).json(err))
    })
    //POST api/Borrow/add
borrow.post("/add", passpost.authenticate('jwt', { session: false }), async(req, res) => {
    const newBorrow = req.body;
    await new Borrow(newBorrow).save().then(result => res.json('添加成功')).catch(err => res.json('添加失败'))
})

//POST api/stroage/edit
borrow.post("/edit/:id", passpost.authenticate('jwt', { session: false }), async(req, res) => {
        let editBorrow = {};
        if (req.body.name) editBorrow.name = req.body.name
        if (req.body.cash) editBorrow.cash = req.body.cash
        if (req.body.desc) editBorrow.desc = req.body.desc
            //查找并修改数据库
        await Borrow.findOneAndUpdate({ _id: req.params.id }, { $set: editBorrow }, { new: true })
            .then(borrow => {
                if (!borrow) res.status(404).json('修改失败')
                return res.json(borrow)
            }).catch(err => res.status(404).json(err))

    })
    //GET
borrow.delete("/delete/:id", passpost.authenticate('jwt', { session: false }), async(req, res) => {

    await Borrow.findOneAndDelete({ _id: req.params.id })
        .then(borrow => { if (!borrow) res.json('删除失败'); return res.json(borrow) })
        .catch(err => res.status(404).json(err))
})
module.exports = borrow;