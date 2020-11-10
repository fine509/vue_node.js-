const Profile = require("../../../modules/Profile");

module.exports = async(req, res) => {
    const profileFields = {};
    //赋值准备加入数据库
    if (req.body.type) profileFields.type = req.body.type
    if (req.body.describe) profileFields.describe = req.body.describe
    if (req.body.incode) profileFields.incode = req.body.incode
    if (req.body.expend) profileFields.expend = req.body.expend
    if (req.body.cash) profileFields.cash = req.body.cash
    if (req.body.remark) profileFields.remark = req.body.remark

    // for (let item in req.body) {
    //     profileFields[item] = req.body[item]
    // }

    //查找并修改数据库
    await Profile.findOneAndUpdate({ _id: req.params.id }, { $set: profileFields }, { new: true })
        .then(profile => {
            if (!profile) res.status(404).json('修改失败')
            return res.json(profile)
        }).catch(err => res.status(404).json(err))
}