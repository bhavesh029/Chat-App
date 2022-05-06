const message = require('../Models/message');
const user = require('../Models/signup');

exports.sendmsg = (async(req, res) => {
    const username = req.body.username;
    const message = req.body.message;

    user.createMessage({message:message, Username:username}).then(() => {
        res.sendStatus(200);
    })
});

