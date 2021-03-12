const Encrypted = require("../../../modules/encrypted");

module.exports = async (req, res) => {
  await Encrypted.findOne({ email: req.params.email }).then((user) => {
    if (user) {
      res.json({
        question1: user.question1,
        question2: user.question2,
      });
    } else {
        res.status(200).json('该邮箱不存在')
    }
  });
};
