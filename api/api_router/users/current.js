const User = require('../../../modules/Users') //User集合

module.exports = async(req, res) => {

    await User.findOne({ _id: req.params.id })
        .then(user => res.json(user))


}