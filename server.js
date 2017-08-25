const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next)=>{
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err)=>{
        if(err){
            console.log('Unable to append file');
        }
    });
    next();
});

// app.use((req, res, next)=>{
//     res.render('maintenance.hbs');
// });
app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', ()=>{
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text)=>{
    return text.toUpperCase();
});


app.get('/close', (req,res)=>{
    res.send('closing');
    app.close;
});
app.get('/', (req, res)=>{
   res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Hello Motherfuckers...'
   });
});

app.get('/about', (req, res)=>{
    res.render('about.hbs', {
        pageTitle: 'About Page'
    });
});

app.get('/bad', (req,res)=>{
    res.send({
       errorMessage: 'Somethign went wrong' 
    });
});

app.listen(3000, ()=>{
    console.log('Server is up and running on port 3000');    
});

// var handler = server.close();