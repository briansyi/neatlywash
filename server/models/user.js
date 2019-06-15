const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const config = require('./../config/config').get(process.env.NODE_ENV);
const SALT_I = 10;

const userSchema = mongoose.Schema({
    email:{
        type:String,
        require:true,
        trim:true,
        unique:1
    },
    password:{
        type:String,
        require:true,
        minlength:6
    },
    firstName:{
        type:String,
        maxlength:100
    },
    lastName:{
        type:String,
        maxlength:100
    },
    phoneNo:{
        type:String
    },
    /*
    // Need to revisit 
    address:[{
        addr1:String,
        addr2:String,
        city:String,
        state:String,
        zip:String,
        lat:String,
        lng:String
    }],*/
    address1:{
        type:String
    },
    address2:{
        type:String
    },
    city:{
        type:String
    },
    state:{
        type:String
    },    
    zip:{
        type:String
    },
    latitude:{
        type:Number
    },
    longitude:{
        type:Number
    },
    // Need to revisit
    priceList:{
        type:Number
    },
    role:{
        type:Number,
        default:0
    },
    lastPickUpDate:{
        type:Date
    },
    lastOrderNo:{
        type:String
    },
    token:{
        type:String
    },
    // This is for shop owner only!
    activated:{
        type:Boolean
    }
})

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user:'neatlywash@gmail',
        pass:'neatly@2018'
    }
})

userSchema.pre('save',function(next){
    var user = this;

    if(user.isModified('password')){
        bcrypt.genSalt(SALT_I,function(err,salt){
            if(err) return next(err);

            bcrypt.hash(user.password,salt,function(err,hash){
                if(err) return next(err);
                user.password = hash;
                next();
            })
        })
    } else {
        next()
    }
})


userSchema.methods.comparePassword = function(candidatePassword,cb){
    //console.log(candidatePassword);
    //console.log(this.password);
    // bcrypt.hash(candidatePassword, 10, function(err, hash) {
    //     if (err) { throw (err); }
    //     console.log(hash);
    //     return cb("err");
    //     bcrypt.compare('mypassword', hash, function(err, result) {
    //         if (err) { throw (err); }
    //         console.log(result);
    //     });
    // });
    bcrypt.compare(candidatePassword,this.password,function(err,isMatch){
        //console.log(isMatch);
        if(err) return cb(err);
        cb(null,isMatch);
    })
}

userSchema.methods.generateToken = function(cb){
    var user = this;
    //console.log(user);
    var token = jwt.sign(user._id.toHexString(),config.SECRET);

    user.token = token;
    user.save(function(err,user){
        if(err) return cb(err);
        cb(null,user)
    })
}

userSchema.statics.findByToken = function(token,cb){
    var user  = this;

    jwt.verify(token,config.SECRET,function(err,decode){
        user.findOne({"_id":decode,"token":token},function(err,user){
            if(err) return cb(err);
            cb(null,user)
        })
    })
}


userSchema.methods.deleteToken = function(token,cb){
    var user = this;

    user.update({$unset:{token:1}},(err,user)=>{
        if(err) return cb(err);
        cb(null,user)
    })
}

// send an email to user
userSchema.methods.sendEmail = function(cb){
    var user = this;

    let mailOptions = {
        from: 'neatlywash@gmail',
        to: user.email,
        subject: 'You got an order!',
        text: 'Check your Neatlywash webapp!'
    }

    transporter.sendMail(mailOptions, function(err,info) {
        if(err) return cb(err);
        cb(null,user)
    })
}

const User = mongoose.model('User',userSchema);

module.exports = { User }