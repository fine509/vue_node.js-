const User = require('../../../modules/Users')
const bcrypt = require('bcrypt')

module.exports = AAA = async(req, res) => {
    let istrue = false;
    let newpassword = null;
    await User.findOne({ _id: req.params.id })
        .then(user => {
            //密码匹配
            bcrypt.compare(req.body.password, user.password, (err, result) => {
                if (result) {


                    //密码加密
                    bcrypt.genSalt(10, function(err, salt) { //获取加密模式并传给hash()
                        bcrypt.hash(req.body.password1, salt, function(err, hash) {

                            if (err) throw err
                            newpassword = hash;
                            console.log('123');
                            User.updateOne({ _id: req.params.id }, { password: newpassword }).then(
                                result => { return res.json('修改成功') }
                            ).catch(err => { return res.status(404).json('修改失败') })
                        });
                    });
                } else {
                    return res.status(404).json('密码不正确')
                }
            })

        }).catch(err => res.json(err))
    console.log(newpassword);

}