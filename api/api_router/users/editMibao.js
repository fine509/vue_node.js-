const User = require('../../../modules/Users')
const bcrypt = require('bcrypt')

module.exports = async(req, res) => {
    await User.findOne({ _id: req.params.id }).then(
        user => {
            //密码匹配
            bcrypt.compare(req.body.password, user.password, (err, result) => {
                if (result) {
                    console.log(user.fruit);
                    console.log(req.body.fruit);
                    User.updateOne({ _id: user._id }, { fruit: req.body.fruit, color: req.body.color })
                        .then(result1 => {

                            if (result1) res.json('修改成功')
                            else {
                                res.status(404).json('修改失败')
                            }
                        }).catch(err => res.status(404).json('修改失败'))
                } else { return res.status(404).json('密码不正确') }
            })
        }
    )

}