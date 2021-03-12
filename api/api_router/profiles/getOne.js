const Profile = require('../../../modules/Profile') //profiles集合

module.exports = async(req, res) => {
    await Profile.findOne({ _id: req.params.id })
        .then(profile => {
            if (!profile) {
                return res.status(404).json('没有找到收支记录')
            }
            return res.json(profile)
        }).catch(err => res.status(404).json(err))
}