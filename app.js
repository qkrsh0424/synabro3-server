//express module using
const express = require('express');
const app = express();
const path = require('path');

//bodyParser load
const bodyParser = require('body-parser');

//bodyParser setting
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));


//route element
var univRoute = require(__dirname+'/api/routes/univRoute');
var univ_itemRoute = require(__dirname+'/api/routes/univ_itemRoute');
var univ_postRoute = require(__dirname+'/api/routes/univ_postRoute');
var univ_beneRoute = require(__dirname+'/api/routes/univ_beneRoute');
var loginRoute = require(__dirname+'/api/routes/loginRoute');
var signupRoute = require(__dirname+'/api/routes/signupRoute');

app.use('/api/univ',univRoute);
app.use('/univ_item',univ_itemRoute);
app.use('/api/univ_post',univ_postRoute);
app.use('/univ_bene',univ_beneRoute);
app.use('/api/auth/login',loginRoute);
app.use('/auth/signup',signupRoute);

// if (process.env.NODE_ENV === "production") {
//     app.use(express.static(path.join(__dirname, "client/build")));
// }

// app.use(express.static(path.join(__dirname, "client/build")));

// app.get('*',function(req,res){
//     res.sendFile(path.join(__dirname, "client/build", "index.html"));
// });

app.listen(function(){
    console.log('app is running on server');
})

module.exports = app;
