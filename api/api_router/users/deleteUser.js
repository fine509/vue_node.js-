const User = require("../../../modules/Users"); //User集合
const Profile = require("../../../modules/Profile");
const Owe = require("../../../modules/owe");
const Borrow = require("../../../modules/borrow");
const Encrypted = require("../../../modules/encrypted");
module.exports = async (req, res) => {
  await User.findOneAndDelete({ _id: req.params.id })
    .then((user) => {
      let allDlete = Promise.all([
        Profile.deleteMany({ id: user.id }),
        Owe.deleteMany({ userid: user.id }),
        Borrow.deleteMany({ userid: user.id }),
        Encrypted.deleteMany({ userid: user.id }),
      ]);
      allDlete
        .then((success) => {res.status(200).json("删除成功");console.log(res);})
        .catch((error) => {res.status(404).json("删除失败");console.log(error);});
      //   Profile.deleteMany({ id: user.id })
      //     .then((result) => {
      //       Owe.deleteMany({ userid: user.id }).then((owe) => {
      //         Borrow.deleteMany({ userid: user.id }).then((borrow) => {
      //           Encrypted.deleteMany({ userid: user.id }).then(
      //             res.json("删除成功")
      //           );
      //         });
      //       });
      //     })
      //     .catch((error) => res.status(404).json("删除失败"));
    })
    .catch((err) => res.status(404).json(err));
};
