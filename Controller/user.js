const bycrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../Models/signup');
const usergroup = require('../Models/usergroups');
const dotenv = require('dotenv');
dotenv.config();


function generateAccessToken(id){
    console.log(id, process.env.Token_Secret);
    return jwt.sign(id, process.env.Token_Secret);
}

exports.Signup = ((req, res) => {
    const {name, email, contact, password} = req.body;
    bycrypt.genSalt(10, function(err, salt){
        bycrypt.hash(password, salt, function(err, hash){
            if(err){
                console.log("Unable to create new User");
                res.json({message:"Unale to create new User"});
            }
            User.create({name, email, contact, password:hash})
                .then(() => {
                    res.status(201).json({message: "Successfully Created new User"})
                }).catch(err => {
                    res.status(403).json(err);
                })
        })
    })
    
});

exports.login = (req, res) => {
    const {email, password} = req.body;
    User.findAll({where: {email:email}}).then(result => {
        if(result[0] != undefined){
            bycrypt.compare(password, result[0].password, (err, response) => {
                if(err){
                    console.log(result[0].name);
                    return res.json({success:false, message: "Something went wrong"});
                }
                if(response){
                    const jwtToken = generateAccessToken(result[0].id);
                    return res.json({token: jwtToken, success:true, message:"Successfully logged in"});
                } else{
                    return res.status(401).json({success:false, message: "Password does not match"});
                }
            })
        } else{
            return res.status(404).json({success:false, message:"User not Found"});
        }
    })
    .catch(err => {
        console.log(err);
    })
}

exports.getUser = async (req,res) => {
    try{
        const grpId = req.query.id;
        if(!grpId){
            const dbuser = await User.findAll();
            return res.json({success:true, message:"All user fetched", dbuser});
        }else{
            const groupusers = await usergroup.findAll({where: {GroupGrpId: grpId}});
            const grpUserIds = [];

            groupusers.forEach((elem) => {
                grpUserIds.push(elem.UserId);
            })

            const dbuser = await User.findAll({where: {id: grpUserIds}});
            return res.json({message:"User fetched from Groups", dbuser, success:true});
        }
    }
    catch{
        return res.json({success:false, message:"Fetching of user failed"});
    }
}