const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    orderNo:{
        type:Number,
        required:true
    },
    ownerId:{
        type:String,
        required:true
    },
    shopOwnerId:{
        type:String,
        required:true
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
    totalPrice:{
        type:Number
    }
    /* // Need to revisit for finace part
    total:{}
    */
},{timestaps:true})

const Order = mongoose.model('Order',orderSchema);

module.exports = { Order }