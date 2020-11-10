const User = require('../../../modules/Users') //User集合
module.exports = async(req, res) => {
    await User.findOneAndDelete({ _id: req.params.id })
        .then(user => {
            res.json(
                '删除成功'
            )
        }).catch(err => res.status(404).json(err))
}