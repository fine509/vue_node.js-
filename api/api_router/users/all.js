const User = require('../../../modules/Users') //User集合
module.exports = async(req, res) => {
    await User.find()
        .then(user => res.json(user))
}