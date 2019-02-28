const express = require ('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const config = require('./config/config').get(process.env.NODE_ENV);
const app = express();

mongoose.Promise = global.Promise;
mongoose.connect(config.DATABASE);

const { User } = require('./models/user');
const { Order } = require('./models/order');
const { auth } = require('./middleware/auth')

app.use(bodyParser.json());
app.use(cookieParser());

// For production deployment
// Heroku
app.use(express.static('client/build'))

// GET //
// Basic get order
app.get('/api/getOrder',(req,res)=>{
    let id = req.query.id;

    Order.findById(id,(err,doc)=>{
        if(err) return res.status(400).send(err);
        res.send(doc)
    })

})

// Auth
app.get('/api/auth',auth,(req,res)=>{
    res.json({
        isAuth:true,
        id:req.user._id,
        email:req.user.email,
        firstName:req.user.firstName,
        lastName:req.user.lastName,
        address1:req.user.address1,
        address2:req.user.address2,
        city:req.user.city,
        state:req.user.state,
        zip:req.user.zip,
        lat:req.user.latitude,
        long:req.user.longitude,
        lastOrderNo:req.user.lastOrderNo
    })
})

// Log out
app.get('/api/logout',auth,(req,res)=>{
    req.user.deleteToken(req.token,(err,user)=>{
        if(err) return res.status(400).send(err);
        res.sendStatus(200)
    })
})

// Order History by customer //, 
app.get('/api/getHistoryByUser',(req,res)=>{
    console.log("req: " + req.query.id);
    let skip = parseInt(req.query.skip);
    let limit = parseInt(req.query.limit);
    let order = req.query.order;

    Order.find({$or:[
        {ownerId:req.query.id},
        {shopOwnerId:req.query.email}
        ]}
        ).skip(skip).sort({_id:order}).limit(limit).exec((err,doc)=>{
        if(err) return res.status(400).send(err);
        console.log(doc);
        res.send(doc)
    })
})

// Order History by customer //, 
app.get('/api/getShopForAdmin',(req,res)=>{
    //console.log("req: " + req.query.email);
    let skip = parseInt(req.query.skip);
    let limit = parseInt(req.query.limit);
    let user = req.query.user;
    let active = parseInt(1);
    let inActive = parseInt(-1);

    User.find({$or:[
        {role:active},
        {role:inActive}
    ]}
    ).skip(skip).sort({_id:user}).limit(limit).exec((err,doc)=>{
        if(err) return res.status(400).send(err);
        console.log(doc);
        res.send(doc)
    })
})





// Order History by shop
app.get('/api/getHistoryByShopAll',(req,res)=>{
    Order.find({shopOwnerId:req.query.user}).exec((err,docs)=>{
        if(err) return res.status(400).send(err);
        res.send(docs)
    })
})

// Order History by shop(limit)
app.get('/api/getHistoryByShop',(req,res)=>{
    // locahost:3001/api/books?skip=3&limit=2&order=asc
    let skip = parseInt(req.query.skip);
    let limit = parseInt(req.query.limit);
    let order = req.query.order;
    
    // ORDER = asc || desc
    Order.find({shopOwnerId:req.query.user}).skip(skip).sort({_id:order}).limit(limit).exec((err,docs)=>{
        if(err) return res.status(400).send(err);
        res.send(docs)
    })
})


// Get shop list in same zip code
// role:1 -> shop owner only
app.get('/api/getShops',(req,res)=>{
    User.find({$and:
        [{zip:req.query.zip},
            {role:1}
        ]}).exec((err,docs)=>{
        if(err) return res.status(400).send(err);
        res.send(docs)
    })
})

// POST //
// Create an order
app.post('/api/order',(req,res)=>{
    console.log(req.body);
    const order = new Order(req.body); 
    console.log(order);
    order.save((err,doc)=>{
        console.log(err);
        if(err) return res.status(400).send(err);
        res.status(200).json({
            post:true,
            orderId:doc._id
        })
    })

    User.find({$and:[
        {zip:req.query.zip},
        {role:1}
        ]}
        ).toArray(function(err, result) {
        if (err) throw err;
        console.log(result);
    }) 

    // Added for sending an order to the shop
    var nodemailer = require('nodemailer');
    console.log("We are sending email!");
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'neatlywash.adm@gmail.com',
            pass: 'superDuper00'
        }
    });

    var moment = require('moment');
    var pickUpDate = moment(req.body.pickUpDate).format('L');
    var mailOptions = {
        from: 'neatlywash.adm@gmail.com',
        to: req.body.custEmail+";"+result.email,
        subject: 'Here is neatlywash pick up order',
        text: 'Hi, here is the details of your order:\r\n\n'+pickUpDate +"\r\n" + req.body.address1+"\r\n"+req.body.address2+"\r\n"+req.body.city+", "+req.body.state +" "+ req.body.state +"\r\n\r\n"
        +"Thank You!",

    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
    });
    
})

app.post('/api/sendEmailToShopOwner',(req,res)=>{
    console.log(req.body);
    const order = new Order(req.body); 
    console.log(order);
    order.save((err,doc)=>{
        console.log(err);
        if(err) return res.status(400).send(err);
        res.status(200).json({
            post:true,
            orderId:doc._id
        })
    })

    User.find({$and:[
        {zip:req.query.zip},
        {role:1}
        ]}
        ).toArray(function(err, result) {
        if (err) throw err;
        console.log(result);
    }) 

    // Added for sending an order to the shop
    var nodemailer = require('nodemailer');
    console.log("We are sending email!");
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'neatlywash.adm@gmail.com',
            pass: 'superDuper00'
        }
    });

    var moment = require('moment');
    var pickUpDate = moment(req.body.pickUpDate).format('L');
    var mailOptions = {
        from: 'neatlywash.adm@gmail.com',
        to: req.body.custEmail+";"+result.email,
        subject: 'Here is neatlywash pick up order',
        text: 'Hi, here is the details of your order:\r\n\n'+pickUpDate +"\r\n" + req.body.address1+"\r\n"+req.body.address2+"\r\n"+req.body.city+", "+req.body.state +" "+ req.body.state +"\r\n\r\n"
        +"Thank You!",

    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
    });
    
})



// Register
app.post('/api/register',(req,res)=>{
    const user = new User(req.body);

    user.save((err,doc)=>{
        if(err) return res.json({success:false});
        res.status(200).json({
            success:true,
            user:doc
        })
    })
})

// Login
app.post('/api/login',(req,res)=>{
    User.findOne({'email':req.body.email},(err,user)=>{
        if(!user) return res.json({isAuth:false,message:'Auth failed, email not found'})

        user.comparePassword(req.body.password,(err,isMatch)=>{
            if(!isMatch) return res.json({
                isAuth:false,
                message:'Wrong password'
            });

            user.generateToken((err,user)=>{
                if(err) return res.status(400).send(err);
                res.cookie('auth',user.token).json({
                    isAuth:true,
                    id:user._id,
                    email:user.email
                })
            })
        })
    })
})

// User Info. update
app.post('/api/user_update',(req,res)=>{
    User.findByIdAndUpdate(req.body._id,req.body,{new:true},(err,doc)=>{
        if(err) return res.status(400).send(err);
        res.json({
            success:true,
            doc
        })
    })
})


// DELETE //
if(process.env.NODE_ENV === 'production'){
    const path = require('path');
    app.get('/*',(req,res)=>{
        res.sendfile(path.resolve(__dirname,'../client','build','index.html'))
    })
}


// For production deployment
// Heroku
if(process.env.NODE_ENV === 'production'){
    const path = require('path');
    app.get('/*',(req,res)=>{
        res.sendfile(path.resolve(__dirname,'../client','build','index.html'))
    })
}


const port = process.env.PORT || 3001;
app.listen(port,()=> {
    console.log(`SERVER RUNNING!`)
})