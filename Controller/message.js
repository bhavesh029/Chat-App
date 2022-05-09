const Sequelize = require('sequelize');
const Message = require('../Models/message');
const group = require('../Models/group');

exports.sendmsg = (async (req, res) => {
    try{
        const message = req.body.message;
        const Username = req.user.name;
        const grpId = req.query.id;

        if(!grpId){
           await req.user.createMessage({Username:Username,message:message})
           return res.status(201).json({message, success:true});
        }else{
            await req.user.createMessage({Username:Username, message:message, grpId:grpId});
            return res.status(201).json({message, success:true});
        }
    }
    catch{
        return res.status(400).json({success: false, message:"Somthing went wrong"});
    }
});

exports.getMsg = (async(req, res) => {
    try{
        const groupId = req.query.id;
        if(!groupId){
            await Message.findAll({where:{grpId: null}});
            return res.status(200).json({message, success:true});
        }else{
            await Message.findAll({where :{groupId:grpId}});
            return res.status(200).json({message, success:true});
        }
    }
    catch{
        return res.status(400).json({success:false, message:"Something went wrong"});
    }
});

