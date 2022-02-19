const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
    name: {
        type:String,
        required:[true, 'Name is required'],
        maxLength:100,
    },
    description: {
        type:String,
        required:[true, 'Description is required'],
    },
    post_id:{
        type:Number,
        required:[true,'Post id not given'],
        unique:true
    },
    status: {
        type:String,
        enum:['accepted', 'declined', 'pending'],
        default:'pending',
    },
    createdBy: {
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:[true, 'User is required'],
    }
},{timestamps:true});


module.exports = mongoose.model('Post', PostSchema);
