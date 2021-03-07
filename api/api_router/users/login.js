const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { keys } = require('../../../config/key')
const User = require('../../../modules/Users') //User集合
module.exports = async(req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    //查询
    await User.findOne({ email })
        .then(user => {
            if (!user) {

                return res.status(404).json('邮箱未注册')
            }

            //密码匹配
            bcrypt.compare(req.body.password, user.password, function(err, result) {
                if (result) {

                    const rule = {
                            id: user.id,
                            name: user.name,
                            avatar: user.avatar,
                            identity: user.identity
                        }
                        //sign('规则','加密名字','过期时间','回调函数,生成token')
                    jwt.sign(rule, keys, { expiresIn: 3600 }, (err, token) => {
                        if (err) throw err;
                        res.json({
                            password: '密码正确',
                            token: 'Bearer ' + token
                        })
                    })

                } else {
                    return res.status(404).json('密码不正确')
                }
            });
        })
}