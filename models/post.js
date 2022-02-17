const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
    name: {
        type:String,
        required:[true, 'Name is required'],
        maxLength:50,
    },
    description: {
        type:String,
        required:[true, 'Description is required'],
        maxLength:50,
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
},{timestamps:true})


module.exports = mongoose.model('Post', PostSchema);
