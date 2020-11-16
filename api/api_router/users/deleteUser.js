const User = require('../../../modules/Users') //User集合
const Profile = require('../../../modules/Profile')
module.exports = async(req, res) => {
    await User.findOneAndDelete({ _id: req.params.id })
        .then(user => {
            Profile.deleteMany({ id: user.id })
                .then(result => {
                    res.json(
                        '删除成功'
                    )
                }).catch(error => res.status(404).json('删除失败'))
        }).catch(err => res.status(404).json(err))
}