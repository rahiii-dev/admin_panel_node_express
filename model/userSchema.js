const mongose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongose.Schema({
    username : {
        type : String,
        required : true,
        unique: true,
        validate : {
            validator : function(value) {
                return value.length > 3; 
            },
            message : props => 'Username must be atleat 3 charactor'
        }
    },
    
    password : {
        type : String,
        required : true,
    },
    email : {
        type : String,
        required : true,
        unique: true,
        validate : {
            validator : function(value){
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
            },
            message : props => `Please provide a valid email address!`
        }
    },
    role : {
        type : String,
        enum : ['user', 'admin'],
        default : 'user'
    }
},
{timestamps : true}
);

// auttenticate
userSchema.statics.authenticate = async function(username, password) {
    try {
        const user = await this.findOne({ username });
        if (!user) {
            throw { usernameError: 'User not found' };
        }

        const match = await bcrypt.compare(password, user.password);
        if (match) {
            return user;
        } else {
            throw { passError: 'Invalid Password' };
        }
    } catch (err) {
        throw err;
    }
};


module.exports = mongose.model('User', userSchema);