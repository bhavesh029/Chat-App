const Sequelize = require('sequelize');

const User = require('../Models/signup');
const Message = require('../Models/message');
const Groups = require('../Models/group');
const userGroup = require('../Models/UserGroup');

exports.createGroup = async(req, res) => {
    try{
        const grpName = req.body.grpName;
        const isAdmin = req.body.isAdmin;
        const uId = req.body.uId;

        let existingGrp = await Groups.findOne({grpName:grpName})
        if(!existingGrp){
            await Groups.createGroup({where:{grpName:grpName}})
            existingGrp = await Groups.findOne({where: {grpName:grpName}})
        }
        const gId = existingGrp.grpId;
        await userGroup.createGroup({
            isAdmin:isAdmin,
            grpId:gId,
            userId: uId
        })

        return res.status(201).json({success: true, message:"Successfuly created Group"});
    }
    catch{(err)=> {
        return res.status(404).json({err,success:false,message:"Something went wrong"});
    }}
}