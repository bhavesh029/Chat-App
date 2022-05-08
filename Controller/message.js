const Sequelize = require('sequelize');
const Message = require('../Models/message');

exports.sendmsg = ((req, res) => {
    const message = req.body.message;
    const Username = req.user.name;
    console.log("Username", Username);
    //console.log("reqUser",req.user);
    req.user.createMessage({Username:Username,message:message})
        .then(() => {
            res.status(201).json({message, success:true});
        })
        .catch(err => {
            console.log(err);
        })
});

exports.getMsg = ((req, res) => {
    //const UserId = req.user.id;
    req.user.getMessages().then((message) => {
        return res.status(200).json({message, success:true});
    }).catch(err => {
        console.log(err);
    })
})

