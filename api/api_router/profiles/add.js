const Profile = require("../../../modules/Profile");

module.exports = async(req, res) => {
    const profileFields = {};
    //赋值准备加入数据库
    // if (req.body.type) profileFields.type = req.body.type
    // if (req.body.describe) profileFields.describe = req.body.describe
    // if (req.body.incode) profileFields.incode = req.body.incode
    // if (req.body.expend) profileFields.expend = req.body.expend
    // if (req.body.cash) profileFields.cash = req.body.cash
    // if (req.body.remark) profileFields.remark = req.body.remark
    // if (req.body.type) profileFields.type = req.body.type
    for (let item in req.body) {
        profileFields[item] = req.body[item]
    }

    //加入数据库
    await new Profile(profileFields).save()
        .then(profile =>
            res.json(profile))
}