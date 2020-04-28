const mysql = require('mysql');
const express = require('express');
const session = require('express-session');
const nodemailer = require('nodemailer');

// Express Middleware
const helmet = require('helmet') // creates headers that protect from attacks (security)
const bodyParser = require('body-parser') // turns response into usable format
const cors = require('cors')  // allows/disallows cross-site communication
const morgan = require('morgan') // logs requests
require('dotenv').config();

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'test'
});

const app = express()
app.use(cors());
app.use(bodyParser());

app.get('/booklist', function (req, res) {
    db.query('select * from book', function (error, results) {
        if (error) throw error;
        res.end(JSON.stringify(results));
    });
});

app.get('/orderlist', function (req, res) {
    db.query('select * from orders where confirmed = true', function (error, results) {
        if (error) throw error;
        res.end(JSON.stringify(results));
    });
});

app.get('/:id', function (req, res) {
    console.log('HEREEE!!!')
    console.log('ID:', req.params.id);
    db.query(`UPDATE orders SET confirmed = true WHERE id= ${req.params.id}`, function (error, results) {
       if (error) throw error;
       res.redirect('http://localhost:3000/');
    });
});

app.post('/',(req, res) => {
    let order_id;
    let data = {name_and_surname: req.body.name, email: req.body.email, telephone: req.body.telephone, comment: req.body.comment};
    let sql = "INSERT INTO orders SET ?";
    let query = db.query(sql, data,(err, results) => {
        if(err) throw err;
        res.redirect('/');
        let link_to_confirm = "http://localhost:4000/"+results.insertId;
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.MAIL,
                pass: process.env.PASSWORD
            }
        });

        const mailOptions = {
            from: 'verochka1998@gmail.com', // sender address
            to: 'verochka1998@gmail.com', // list of receivers
            subject: 'Confirm Books', // Subject line
            //html: `Hello! You have an order from ${req.body.name}! <br> Email:  ${req.body.email} <br> Telephone:  ${req.body.telephone} <br> Comment:  ${req.body.comment} <div>href="http://localhost:3000/">Confirm </div>`
            html:`<div>
                    <h1>Hello! You have an order from ${req.body.name}! </h1>
                    <p>Email:  ${req.body.email} </p>
                    <p>Telephone:  ${req.body.telephone} </p>
                    <p>Comment:  ${req.body.comment} </p>
                    <p>Kind regards,</p><p>The CoolSite Team</p>
                    <br/>
                    <a style="display: block; padding: 5px; color: white; background-color: #ffc107; width: 300px; height: 50px; border-radius: 3px; border: 2px solid #ffc107; text-transform: uppercase; outline: none; text-align: center; line-height: 50px; font-size: 14px; font-weight: bold;"
                     href=${link_to_confirm}>Confirm</a>
                   </div>`
        };

        transporter.sendMail(mailOptions, function (err, info) {
            if(err){
                console.log(err)
                res.status(500).send('Internal Server Error')
            }else{
                console.log(info);
                res.status(200).send('OK')
            }
        });
    });


});

app.get('/sendConfirmation', function(req, res) {
   // let name_and_surname = req.body.name;
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.MAIL,
            pass: process.env.PASSWORD
        }
    });

    const mailOptions = {
        from: 'verochka1998@gmail.com', // sender address
        to: 'verochka1998@gmail.com', // list of receivers
        subject: 'Confirm Books', // Subject line
       // html: `Hi ${name_and_surname}, welcome to Mars`
        //html:`<div><h1>Hi there :)!!  </h1><p>Confirm your registration for the CoolSite to get books for free!</p><br/><p>Kind regards,</p><p>The CoolSite Team</p><br/><a style="display: block; padding: 5px; color: white; background-color: #7CB342; width: 300px; height: 50px; border-radius: 3px; border: 2px solid #7CB342; text-transform: uppercase; outline: none; text-align: center; line-height: 50px; font-size: 14px; font-weight: bold;" href="http://localhost:3000/">Confirm</a></div>`// plain text body
    };

    transporter.sendMail(mailOptions, function (err, info) {
        if(err){
            console.log(err)
            res.status(500).send('Internal Server Error')
        }else{
            console.log(info);
            res.status(200).send('OK')
        }
    });

});

app.listen(4000, () => {
  console.log('Go to http://localhost:4000/orderlist so you can see the data.');
});
