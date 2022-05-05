const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const fs = require('fs');

app.use('/login', (req, res, next) => {
    res.send('<form onsubmit="localStorage.setItem(`username`, document.getElementById(`username`).value)" action="/login" method="POST"><input id="username" type="text" name="title"><button type="submit">add</button></form>');
    res.redirect('/message');
});

// const addFile = fs.appendFile('message.txt', localStorage.getItem(username), function(err){
//     if(err) throw err;
//     console.log('!saved');
// })

app.use('/message' , (req, res, next) => {
    res.send(fs.writeFile('message.txt', localStorage.getItem('document.getElementById(`username`).value)')));
});

app.listen(3000);

