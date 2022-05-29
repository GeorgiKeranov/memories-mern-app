import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address!']
    },
    password: {
        type: String,
        required: true,
        minLength: 8
    },
    image: String,
});

// Hash plain password before save or updateto the database
userSchema.pre('save', hashPassword);
userSchema.pre('updateOne', hashPassword);

// Convert plain text password to hash
function hashPassword(next) {
    const user = this;

    if (user.isModified('password')) {
        const salt = bcrypt.genSaltSync(10);
        user.password = bcrypt.hashSync(user.password, salt);
    }
    
    next();
}

// Custom error message for email already existing
userSchema.post('save', (error, doc, next) => {
    if (error.name === 'MongoServerError' && error.code === 11000) {
        next(new Error('This email is already registered!'));
    } else {
        next(error);
    }
});

// Hide password and tokens when returning response with the user information
userSchema.methods.toJSON = function() {
    let user = this.toObject();
    delete user.password;
    delete user.tokens;
    
    return user;
}

// Generate json web token for user
userSchema.methods.generateToken = function() {
    const user = this;
    const token =  jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET_KEY);
    return token;
}

const User = mongoose.model('User', userSchema)

export default User;
