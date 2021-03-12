const User = require("../../../modules/Users");
const Encrypted = require("../../../modules/encrypted");
const bcrypt = require("bcrypt");

module.exports = async (req, res) => {
  await User.findOne({ _id: req.params.id }).then((user) => {
    //密码匹配
    bcrypt.compare(req.body.password, user.password, (err, result) => {
      if (result) {
        Encrypted.findOne({ userid: req.params.id }).then((user) => {
          if (user) {
            Encrypted.updateOne(
              { userid: req.params.id },
              {
                email: req.body.email,
                question1: req.body.question1,
                question2: req.body.question2,
                answer1: req.body.answer1,
                answer2: req.body.answer2,
              }
            )
              .then((result1) => {
                if (result1) res.status(200).json("修改成功");
                else {
                  res.status(404).json("修改失败");
                }
              })
              .catch((err) => res.status(404).json("修改失败"));
          } else {
            new Encrypted({
              userid: req.params.id,
              email: req.body.email,
              question1: req.body.question1,
              question2: req.body.question2,
              answer1: req.body.answer1,
              answer2: req.body.answer2,
            })
              .save()
              .then((success) => {
                res.status(200).json("添加密保成功");
              })
              .catch((err) => res.status(500).json("添加密保失败"));
          }
        });
      } else {
        return res.status(404).json("密码不正确");
      }
    });
  });
};
