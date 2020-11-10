const Profile = require("../../../modules/Profile");

module.exports = async(req, res) => {
    await Profile.findOneAndDelete({ _id: req.params.id })
        .then(profile => {
            res.json(
                    '删除成功'
                ) //这里的Profile是指被删除的
        }).catch(err => res.status(404).json(err))
}