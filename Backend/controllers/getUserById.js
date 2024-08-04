const userSchema = require('../models/UserSchema')

exports.getUserById = async(req, res) => {
    const {userId} = req.body;

    try{
        const user = await userSchema.findById({_id: userId}).populate("problemsSolved").exec();
        if(!user){
            return res.status(200).json({"success" : false, message : "User Not Found in Database"});
        }
        return res.status(200).json({"success" : true, user});
    }catch(error){
        return res.status(500).json({"success" : false, message : error.message});
    }
}