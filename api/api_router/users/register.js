const bcrypt = require('bcrypt')
const gravatar = require('gravatar');
const User = require('../../../modules/Users') //User集合
module.exports = async(req, res) => {
    //判断数据库里是否有邮箱

    await User.findOne({ email: req.body.email })
        .then(result => {
            if (result) {
                return res.status(400).json('邮箱已被注册')
            } else {
                const avatar = gravatar.url(req.body.email, { s: '200', r: 'pg', d: 'mm' });
                //创建新的实例

                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    avatar,
                    password: req.body.password,
                    identity: req.body.identity
                })
                console.log(newUser);

                //密码加密
                bcrypt.genSalt(10, function(err, salt) { //获取加密模式并传给hash()
                    bcrypt.hash(newUser.password, salt, function(err, hash) {

                        if (err) throw err
                        newUser.password = hash;
                        newUser.save()
                            .then(user => res.json(user))
                            .catch(err => console.log(err))
                    });
                });
            }
        })
}