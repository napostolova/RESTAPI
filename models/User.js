const mongoose = require('mongoose');


const { ObjectId } = mongoose.Schema.Types;

const userSchema = new mongoose.Schema({
    
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: [5, 'Username should be at least 5 characters'],
        validate: {
            validator: function (v) {
                return /[a-zA-Z0-9]+/g.test(v);
            },
            message: props => `${props.value} must contain only latin letters and digits!`
        },
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: [5, 'Password should be at least 5 characters'],
        validate: {
            validator: function (v) {
                return /[a-zA-Z0-9]+/g.test(v);
            },
            message: props => `${props.value} must contain only latin letters and digits!`
        },
    },
    posts: [{
        type: ObjectId,
        ref: "Post"
    }],

}, { timestamps: { createdAt: 'created_at' } });



module.exports = mongoose.model('User', userSchema);
