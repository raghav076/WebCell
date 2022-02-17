const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, 'Name is required'],
        minLength:3,
        maxLength:50,
    },
    email: {
        type:String,
        required:[true, "Email is required"],
        match:[/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Email address invalid'],
        unique: true,
    },
    type: {
        type:String,
        required:[true, "Type is required"],
        enum:["Junior Dev", "Dev", "Admin"],
        default:"Junior Dev"
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minLength: 6,
    },
    security_question: {
        type:String,
        enum:['What is the name of your first pet?', 'In what city were you born?', 'What was your favorite food?'],
    },
    security_answer: {
        type:String,
    }
}, {timestamps:true});

UserSchema.pre('save', async function(next){
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    // this.type = "Junior Dev";
    next();
})

UserSchema.methods.createJWT = function() {
    return jwt.sign({userId:this._id, name:this.name, type:this.type}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_LIFETIME})
}

UserSchema.methods.comparePassword = async function(candidatePassword) {
    const isMatch = await bcrypt.compare(candidatePassword, this.password)
    return isMatch
}

module.exports = mongoose.Model('User',UserSchema)