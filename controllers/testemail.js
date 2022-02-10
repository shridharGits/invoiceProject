require('dotenv').config()

const nodemailer = require('nodemailer')
exports.sendEmail = (email, subject, invoice)=>{
    console.log(process.env.FROM_EMAIL)
    console.log(process.env.FROM_PASS);
    const {title, workhour, rate, amount, status, notes, expense} = invoice
    const date = invoice.duedate.toISOString().slice(0, 10);
    
    let color = 'green';
    if(status.toLowerCase() === 'not paid'){
        color = 'red';
    }

    // const text = `
    // Title: ${title},
    // Workhour: ${workhour},
    // Rate: ${rate},
    // Amount: ${amount},
    // Status: ${status},
    // Duedate: ${date},
    // Notes: ${notes},
    // Expenses: ${expense},
    // `

    const text = `
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        *{
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
}
body{
    font-family: Helvetica;
    font-weight: bolder;
    -webkit-font-smoothing: antialiased;
    background: rgba( 71, 147, 227, 1);
}
h2{
    text-align: center;
    font-size: 18px;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: white;
    padding: 30px 0;
}

/* Table Styles */

.table-wrapper{
    margin: 10px 70px 70px;
    box-shadow: 0px 35px 50px rgba( 0, 0, 0, 0.2 );
}

.fl-table {
    border-radius: 5px;
    font-size: 12px;
    font-weight: normal;
    border: none;
    border-collapse: collapse;
    width: 100%;
    max-width: 100%;
    white-space: nowrap;
    background-color: white;
}

.fl-table td, .fl-table th {
    text-align: center;
    padding: 8px;
}

.fl-table td {
    border-right: 1px solid #f8f8f8;
    font-size: 12px;
}

.fl-table thead th {
    color: #ffffff;
    background: #4FC3A1;
}


.fl-table thead th:nth-child(odd) {
    color: #ffffff;
    background: #324960;
}

.fl-table tr:nth-child(even) {
    background: #F8F8F8;
}

/* Responsive */

@media (max-width: 767px) {
    .fl-table {
        display: block;
        width: 100%;
    }
    .table-wrapper:before{
        content: "Scroll horizontally >";
        display: block;
        text-align: right;
        font-size: 11px;
        color: white;
        padding: 0 0 10px;
    }
    .fl-table thead, .fl-table tbody, .fl-table thead th {
        display: block;
    }
    .fl-table thead th:last-child{
        border-bottom: none;
    }
    .fl-table thead {
        float: left;
    }
    .fl-table tbody {
        width: auto;
        position: relative;
        overflow-x: auto;
    }
    .fl-table td, .fl-table th {
        padding: 20px .625em .625em .625em;
        height: 60px;
        vertical-align: middle;
        box-sizing: border-box;
        overflow-x: hidden;
        overflow-y: auto;
        width: 120px;
        font-size: 13px;
        text-overflow: ellipsis;
    }
    .fl-table thead th {
        text-align: left;
        border-bottom: 1px solid #f7f7f9;
    }
    .fl-table tbody tr {
        display: table-cell;
    }
    .fl-table tbody tr:nth-child(odd) {
        background: none;
    }
    .fl-table tr:nth-child(even) {
        background: transparent;
    }
    .fl-table tr td:nth-child(odd) {
        background: #F8F8F8;
        border-right: 1px solid #E6E4E4;
    }
    .fl-table tr td:nth-child(even) {
        border-right: 1px solid #E6E4E4;
    }
    .fl-table tbody td {
        display: block;
        text-align: center;
    }
}
    </style>
    <title>Document</title>
</head>
<body>
    <h2>INVOICE DETAIL</h2>
<div class="table-wrapper">
    <table class="fl-table">
        <thead>
        <tr>
            <th>KEY</th>
            <th>VALUE</th>
        </tr>
        </thead>
        <tbody>
        <tr>
            <td>TITLE</td>
            <td>${title.toUpperCase()}</td>
        </tr>
        <tr>
            <td>WORKHOUR</td>
            <td>${workhour}</td>
        </tr>
        <tr>
            <td>RATE</td>
            <td>${rate}</td>
        </tr>
        <tr>
            <td>AMOUNT</td>
            <td>${amount}</td>
        </tr>
        <tr>
            <td>STATUS</td>
            <td style="color:${color}">${status.toUpperCase()}</td>
        </tr>
        <tr>
            <td>DUEDATE</td>
            <td>${date}</td>
        </tr>
        <tbody>
    </table>
</div>
</body>
</html>`
    
    //*****************************************/ 
    const transporter = nodemailer.createTransport({
        host: 'smtp-mail.outlook.com',
        port: 587,
        auth:{
            user: process.env.FROM_EMAIL,
            pass: process.env.FROM_PASS
        }
    })
    
    const option = {
        from: process.env.FROM_EMAIL,
        to: email,
        subject:subject,
        html: text
    }
    transporter.sendMail(option, function(err, info){
        if(err){
            console.log(err);
            return;
        }
    })
}