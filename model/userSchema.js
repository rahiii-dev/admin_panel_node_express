const mongose = require('mongoose');

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
userSchema.statics.authenticate = function(username, password){
    return new Promise((resolve, reject) => {
        this.findOne({username})
            .then(user => {
                if (!user) {
                    reject({ usernameError: 'User not found' });
                }
                if (password !== user.password) {
                    reject({ passError: 'Invalid Password' });
                }
                resolve(user);
            })
            .catch(err => {
                reject(err);
            });
    });
};

module.exports = mongose.model('User', userSchema);