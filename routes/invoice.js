const express = require('express')
const router = express.Router();

const {createInvoice, updateInvoice, getAllInvoices, alert, sendInvoice} = require('../controllers/invoice')

router.post('/create', createInvoice);
router.put('/update/:id', updateInvoice)
router.get('/invoices', getAllInvoices)
router.get('/alert', alert)
router.post('/send/:id', sendInvoice)

module.exports  = router;