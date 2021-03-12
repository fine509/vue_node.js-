const User = require('../../../modules/Users') //User集合
module.exports = async(req, res) => {
    await User.find()
        .then(user =>{
           let allUsers =  user.map(item=>{
               item.fruit = ''
               item.color = ''
               return item
             
            })
            res.json(allUsers)
        })
}