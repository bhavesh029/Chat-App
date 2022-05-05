const User = require('../Models/signup');
const bycrypt = require('bcrypt');


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