const express = require('express')
const passpost = require('passport')

const Profile = require('../modules/Profile') //profiles集合

const profile = express.Router();

//引入子路由文件
const add = require('./api_router/profiles/add')
const get = require('./api_router/profiles/get')
const getOne = require('./api_router/profiles/getOne')
const edit = require('./api_router/profiles/edit')
const deleteOne = require('./api_router/profiles/deleteOne')

//设置二级路由


//api/profile/add Private 增加收支接口
profile.post('/add', passpost.authenticate('jwt', { session: false }), add)

//api/profile/:id Private 获取所有收支接口
profile.get('/:id', passpost.authenticate('jwt', { session: false }), get)

//api/profile/:id Private 获取单个收支接口
profile.get('/:id', passpost.authenticate('jwt', { session: false }), getOne)

//api/profile/edit/:id Private 编辑收支接口
profile.post('/edit/:id', passpost.authenticate('jwt', { session: false }), edit)

//api/profile/delete/:id Private 删除单个收支接口
profile.delete('/delete/:id', passpost.authenticate('jwt', { session: false }), deleteOne)


module.exports = profile