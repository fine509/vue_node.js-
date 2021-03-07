const Image = require("../../../modules/Image");
const User = require("../../../modules/Users");
module.exports = async (req, res) => {
  const { id } = req.params;
  const { data } = req.body;
  await User.updateOne({ _id: id }, { imgUrl: data })
    .then((user) => {
      if (user) {
        return res.status(200).json("修改成功");
      } else {
        return res.status(404).json("修改失败");
      }
    })
    .catch((err) => {
      return res.status(404).json("修改失败");
    });
};
