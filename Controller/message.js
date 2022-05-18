const Sequelize = require('sequelize');
const Message = require('../Models/message');

exports.sendmsg = ((req, res) => {
    const message = req.body.message;
    const Username = req.user.name;
    const grpId = req.query.id;
    if(!grpId){
        req.user.createMessage({Username:Username,message:message})
        .then(() => {
            res.status(201).json({message, success:true});
        })
        .catch(err => {
            console.log(err);
        })
    } else{
        req.user.createMessage({Username:Username,message:message,GroupGrpId:grpId})
        .then(()=> {
            res.status(201).json({message:"Successfully created the group with user", success:true});
        })
        .catch(err => {
            return res.status(404).json( {success: false , message: 'Chats retrieval from DB Failed', err} )
        })
    }
    
});

exports.getMsg = ((req, res) => {
    //const UserId = req.user.id;
    const grpId = req.query.id;
    if(!grpId){
        Message.findAll({where:{GroupGrpId:null}}).then((message) => {
            return res.status(200).json({message, success:true});
        }).catch(err => {
            console.log(err);
        })
    } else{
        Message.findAll({where:{GroupGrpId:grpId}}).then(()=>{
            return res.status(200).json({msg:"Group chats retrived from the DB", success:true});
        })
        .catch(err =>{
            console.log(err);
        })
    }
    
})

