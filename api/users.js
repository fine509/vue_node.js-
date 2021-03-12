// login界面&&register界面
const express = require('express')

const passpost = require('passport')
const bcrypt = require('bcrypt')
const gravatar = require('gravatar');


const User = require('../modules/Users') //User集合

const users = express.Router();

//引入子路由文件
const register = require('./api_router/users/register');
const login = require('./api_router/users/login')
const current = require('./api_router/users/current')
const all = require('./api_router/users/all')
const deleteUser = require('./api_router/users/deleteUser')
const editUser = require('./api_router/users/editUser')
const editPassword = require('./api_router/users/editPassword')
const editMibao = require('./api_router/users/editMibao')
const findpw = require('./api_router/users/findpw')
const getimage = require('./api_router/users/image')
const getEncrypted = require('./api_router/users/getEncrypted')
    //设置二级路由 

//POST api/users/register Pubblic
users.post("/register", register)


//POST api/users/login 返回token jwt password Pubblic
users.post('/login', login)

///POST api/users/edit/:id 通过密保修改密码
users.post('/find', findpw)

//GET api/users/current 返回用户信息  Private(私有接口用passpost验证)
users.get('/current/:id', passpost.authenticate('jwt', { session: false }), current)

///GET api/users/all 返回所有用户
users.get('/all', passpost.authenticate('jwt', { session: false }), all)

///GET api/users/current 删除单个用户
users.delete('/delete/:id', passpost.authenticate('jwt', { session: false }), deleteUser)

///POST api/users/edit/:id 修改用户名字
users.post('/edit/:id', passpost.authenticate('jwt', { session: false }), editUser)

///POST api/users/edit/:id 修改用户名字
users.post('/editpassword/:id', passpost.authenticate('jwt', { session: false }), editPassword)

///POST api/users/edit/:id 修改用户密保
users.post('/editmibao/:id', passpost.authenticate('jwt', { session: false }), editMibao)

//post
users.post('/uploadImage/:id', passpost.authenticate('jwt', { session: false }), getimage)

//post改变用户头像
users.post('/changeImage/:id', passpost.authenticate('jwt', { session: false }), getimage)

//get获取用户密保问题
users.get('/getencrypted/:email', getEncrypted)
module.exports = users;