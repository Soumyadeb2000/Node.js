const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderSchema = new Schema({
    items: [{
        productData: { type: Object, required: true},
        quantity: { type: Number, required: true}
    }],
    user: {
        _id: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
    }    
})

module.exports = mongoose.model('Order', orderSchema);