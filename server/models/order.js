const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    orderNo:{
        type:String,
        required:true
    },
    ownerId:{
        type:String,
        required:true
    },
    shopOwnerId:{
        type:String
    },
    pickUpDate:{
        type:Date
    },
    actPickUpDate:{
        type:Date
    },
    actPickUpTime:{
        type:Date
    },
    // c: completed
    // o: open
    orderStatus:{
        type:String
    },
    /*
    orderStatus:{
        type:Number,
        required:true,
        min:0,
        max:4
    },*/
    notesFromCust:{
        type:String,
        default:'n/a'
    },
    notesFromShop:{
        type:String,
        default:'n/a'
    },
    proDeliveryDate:{
        type:Date
    },
    deliveredDate:{
        type:Date
    },
    deliveredTime:{
        type:Number
    },
    alternation:{
        type:Boolean
    },
    totalPrice:{
        type:Number
    },
    custEmail:{
        type:String,
        require:true,
        trim:true
    },shopEmail:{
        type:String,
        require:true,
        trim:true
    },
    firstName:{
        type:String,
        maxlength:100
    },
    lastName:{
        type:String,
        maxlength:100
    },
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
    }
    /* // Need to revisit for finace part
    total:{}
    */
},{timestaps:true})

const Order = mongoose.model('Order',orderSchema);

module.exports = { Order }