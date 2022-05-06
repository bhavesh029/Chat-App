const Message = require('../Models/message');

exports.sendmsg = ((req, res) => {
    const message = req.body.message;
    
    req.user.createMessage({message:message})
        .then(() => {
            res.status(201).json({message, success:true});
        })
        .catch(err => {
            console.log(err);
        })
});

