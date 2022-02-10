const Invoice = require('../models/invoice')
const {sendEmail} = require('./testemail')

exports.createInvoice = (req, res)=>{
    const invoice = new Invoice(req.body)
    invoice.save((err, invoice)=>{
        if(err){
            return res.status(400).json(err);
        }
        return res.status(201).json(invoice);
    })
}

exports.updateInvoice = (req, res)=>{
    Invoice.findByIdAndUpdate({_id: req.params.id}, {$set: req.body}, {new: true, useFindAndModify: false},
        (err, invoice)=>{
            if(err){
                return res.status(400).json(err);
            }
            return res.status(201).json(invoice);
        })
}

exports.getAllInvoices = (req, res)=>{
    Invoice.find().exec((err, invoices)=>{
        if(err){
            return res.status(400).json(err);
        }
        return res.status(200).json(invoices);
    })
}

exports.alert = (req, res)=>{
    Invoice.find().exec((err, invoices)=>{
        if(err){
            return res.status(400).json(err);
        }
        let lateInvoice= [];
        let currentDate = new Date().toISOString().slice(0, 10);
        invoices.map((invoice)=>{
            let dueDate = invoice.duedate.toISOString().slice(0, 10);
            let status = invoice.status.toLowerCase();
            if(dueDate <= currentDate && status === 'not paid'){
                lateInvoice.push(invoice);
            }
        })
        return res.json(lateInvoice);
    })
}

exports.sendInvoice = (req,res)=>{
    Invoice.findById(req.params.id).exec((err, invoice)=>{
        if(err){
            return res.status(400).json(err);
        }
        else{
            const email = req.body.email;
            const subject = `INVOICE: ${invoice.title}`;
            
            
            sendEmail(email, subject, invoice)
            //*****************************************/ 

            return res.status(200).json({
                message: "email sent successfully"
            })
        }
    })
}