//借钱
const express = require('express')
const owe = express.Router();
const passpost = require('passport')
const Owe = require('../modules/owe')

//设置二级路由 
//GET api/owe/findall
owe.get("/findall/:id", passpost.authenticate('jwt', { session: false }), async(req, res) => {

        await Owe.find({ userid: req.params.id })
            .then(Owe => { if (!Owe) res.json('查找失败'); return res.json(Owe) })
            .catch(err => res.status(404).json(err))
    })
    //POST api/owe/add
owe.post("/add", passpost.authenticate('jwt', { session: false }), async(req, res) => {
    const newOwe = req.body;
    await new Owe(newOwe).save().then(result => res.json('添加成功')).catch(err => res.json('添加失败'))
})

//POST api/stroage/edit
owe.post("/edit/:id", passpost.authenticate('jwt', { session: false }), async(req, res) => {
        //查找并修改数据库
        await Owe.updateOne({ _id: req.params.id }, { name: req.body.name, cash: req.body.cash, desc: req.body.desc })
            .then(owe => {
                if (!owe) res.status(404).json('修改失败')
                return res.json(owe)
            }).catch(err => res.status(404).json(err))

    })
    //GET
owe.delete("/delete/:id", passpost.authenticate('jwt', { session: false }), async(req, res) => {

    await Owe.findOneAndDelete({ _id: req.params.id })
        .then(owe => { if (!owe) res.json('删除失败'); return res.json(owe) })
        .catch(err => res.status(404).json(err))
})
module.exports = owe;