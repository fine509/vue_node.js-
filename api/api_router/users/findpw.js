const User = require('../../../modules/Users')
const bcrypt = require('bcrypt')

module.exports = async(req, res) => {


    await User.findOne({ email: req.body.email })
        .then(user => {
            if (user.color === req.body.color && user.fruit === req.body.fruit) {
                bcrypt.genSalt(10, function(err, salt) {
                    bcrypt.hash(req.body.password, salt, function(err, hash) {
                        User.updateOne({ _id: user._id }, { password: hash })
                            .then(result => {
                                if (result) { return res.json('修改成功') } else { return res.status(404).json('修改失败') }
                            })
                    })
                })
            } else {
                return res.status(404).json('密保失败')
            }
        }).catch(err => res.status(404).json('没有找到该用户'))


}