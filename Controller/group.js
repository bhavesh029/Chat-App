const Sequelize = require('sequelize');

const user = require('../Models/signup');
const message = require('../Models/message');
const group = require('../Models/group');
const usergroup = require('../Models/usergroups');

exports.createGrp = async (req, res) => {
    try{
        const grpName = req.body.groupName;
        const isAdmin = req.body.isAdmin;
        const uId = req.body.uId;

        let existingGroup = await group.findOne({ where: {grpName: grpName}})
        if(!existingGroup){
            await group.create({grpName:grpName})
            existingGroup = await group.findOne({where:{grpName:grpName}})
        }
        const gId = existingGroup.grpId;

        await usergroup.create({isAdmin:isAdmin, GroupGrpId:gId, UserId:uId})
        return res.status(201).json({success: true, message:"user added to the group successfully"});
    }
    catch{(err) => {
        console.log(err);
        return res.status(404).json({success: false, message:"Adding user to group failed, try again"})
    }

    }
}


exports.getGrps = async (req, res) => {
    try{
        const uId = req.user.id;
        let membergrpIds = [];
        const memberGrps = await usergroup.findAll({where: {UserId: uId}} )

        for(let i=0;i<memberGrps.length;i++){
            membergrpIds.push(memberGrps[i].GroupGrpId);
        }

        const memberof = await group.findAll({where:{grpId: {[Sequelize.Op.or]: membergrpIds}}})
        return res.status(201).json({success:true, message:"Retrieve Group from DB", memberof});
    }
    catch{
        return res.status(404).json({success: false, message:"Failed to retrieve groups from DB"});
    }
}
