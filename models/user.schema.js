const mongoose = require("mongoose");
const schema = mongoose.Schema;

userSchema = new schema({
    email:{
        type:String,
        unique:true
    },
    name:String,
    password:String,
    createdAt: {
		type: Date,
		default: Date.now
	}
})

user= mongoose.model('userDetails',userSchema);
module.exports = user;