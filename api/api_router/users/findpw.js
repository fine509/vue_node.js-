const User = require("../../../modules/Users");
const Encrypted = require("../../../modules/encrypted");
const bcrypt = require("bcrypt");

module.exports = async (req, res) => {
  await Encrypted.findOne({ email: req.body.email })
    .then((user) => {
      if (
        user.answer1 === req.body.answer1 &&
        user.answer2 === req.body.answer2
      ) {
        bcrypt.genSalt(10, function(err, salt) {
          bcrypt.hash(req.body.password, salt, function(err, hash) {
            User.updateOne({ _id: user.userid }, { password: hash }).then(
              (result) => {
                if (result) {
                  return res.json("修改成功");
                } else {
                  return res.status(404).json("修改失败");
                }
              }
            );
          });
        });
      } else {
        return res.status(404).json("密保失败");
      }
    })
    .catch((err) => res.status(404).json("没有找到该用户"));
};
