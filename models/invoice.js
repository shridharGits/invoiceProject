const mongoose = require('mongoose')

const invoiceSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        trim: true,
    },
    workhour:{
        type: Number,
        required: true,
    },
    rate:{
        type: Number,
        required: true,
    },
    amount:{
        type: Number,
        required: true,
    },
    status:{
        type: String,
        required: true,
    },
    duedate:{
        type: Date,
        required: true,
    },
    notes:{
        type: [String],
    },
    expense:{
        type: Map,
        of: Number,
    }
})

module.exports = mongoose.model('Invoice', invoiceSchema);