const User = require('../../../modules/Users')
module.exports = async(req, res) => {
    console.log(req.params.id);
    await User.updateOne({ _id: req.params.id }, { name: req.body.name })
        .then(user => {

            if (!user) res.status(404).json('修改失败')
            return res.json(user)
        }).catch(error => res.status(404).json(error))

}