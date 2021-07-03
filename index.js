const { Console } = require('console');
const express = require('express');
const path = require('path');
const { getMaxListeners } = require('process');
const port = 8000;
const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));
var contactList = [{
    name: "Niraj",
    email: "nir**r@gmail.com",
    phone: "8404809***"
}, {
    name: "tony",
    phone: "55300014452",
    email: "tony@gmail.com"
}];
app.get('/', function(req, res) {
    return res.render('contactPro', { title: 'My Contact List', contact: contactList });
});
app.post('/create-contact', function(req, res) {
    contactList.push(req.body);
    return res.redirect('/');
});
app.get('/delete-contact/', function(req, res) {
    let phone = req.query.phone;
    let contactIndex = contactList.findIndex(contact => contact.phone == phone);
    if (contactIndex >= 0) {
        contactList.splice(contactIndex, 1);
    }
    return res.redirect('back');
});
app.listen(port, function(err) {
    if (err) {
        console.log('Error!! Mission Abort');
        return;
    }
    console.log('Express Server is Launched Successfully on port ', port);
});