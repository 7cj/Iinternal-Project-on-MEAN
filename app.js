var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    multer = require('multer'),
    upload = multer({
        dest: 'uploads/'
    }),
    autoIncrement = require('mongoose-auto-increment'),
    passport = require('passport'),
    cookieParser = require('cookie-parser');

//  multer is defining where to upload a doc

 mongoose.Promise = global.Promise;       // added on 22 Apr,2017 to remove a warning==>  "Mongoose: mpromise (mongoose's default promise library) is deprecated, plug in your own promise library instead: http://mongoosejs.com/docs/promises.html"
var connection = mongoose.connect('mongodb://localhost:27017/db7');
autoIncrement.initialize(connection);


var problem = require('./app/models/problem'),
    solution = require('./app/models/solution'),
    Project = require('./app/controllers/project'),
    Document = require('./app/controllers/document'),
    Problem = require('./app/controllers/problem'),
    MasterData = require('./app/controllers/masterData'),
    PostedProblems = require('./app/controllers/postedProblems'),
    app = express(),
    PORT_NUMBER = 3001;


/// this line of code is used to indicate the current directory where our app.js is residing
/// otherwise it'll throw 404 ERROR 
app.use(express.static(__dirname + '/'));
// app.engine('html', require('ejs').renderFile);

/*
//      BEGIN mail

var nodemailer = require('nodemailer');

router.post('/mail', handleSayHello); // handle the route at yourdomain.com/sayHello

function handleSayHello(req, res) {
    // Not the movie transporter!
    var transporter = nodemailer.createTransport({
        service: 'Gmail',   //  ???????
        auth: {
            user: 'cjoshi@hsdyn.com', // Your email id
            pass: 'password' // Your password
        }
    });

//var text = "Hello world from \n\n"+ req.body.name;
var text = "Hello world \n\n sample mail";


var mailOptions = {
    from: 'cjoshi@hsdyn.com>', // sender address
    to: 'cjoshi@hsdyn.com', // list of receivers
    subject: 'Email Example', // Subject line
    text: text //, // plaintext body
    // html: '<b>Hello world ✔</b>' // You can choose to send an HTML body instead
};




transporter.sendMail(mailOptions, function(error, info){
    if(error){
        console.log(error);
        res.json({yo: 'error'});
    }else{
        console.log('Message sent: ' + info.response);
        res.json({yo: info.response});
    };
})




//  END mail
*/

//app.use('session');
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
    extended: true
}));

app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());




require('./config/passport')(passport);



app.get('/',   passport.authenticate('jwt', {
    successRedirect: '/index', // redirect to the secure profile section
    failureRedirect: '/login', // redirect back to the signup page if there is an error
    session: false
}));


app.get('/login', passport.authenticate('jwt', {
    successRedirect: '/index', // redirect to the secure profile section
    failureRedirect: '/login.html', // redirect back to the signup page if there is an error
    session: false
}),  function (req,  res) {
    res.sendFile(__dirname  + '/login.html');
});

app.get('/index',  passport.authenticate('jwt', {

    session: false
}), function (req,  res) {

    res.sendFile(__dirname  + '/index2.html');
});

///res.sendFile(__dirname + '/index.html');
///res.sendFile(__dirname + './web/view/login.html');///


app.get('/internal-tool/web/*',  function (req,  res) {
    //res.sendFile(__dirname + './app/controllers/main_int_tool.html');
    res.sendFile(__dirname  +  '/web/'  +  req.params[0]);

});

app.get('/internal-tool/assets/*',  function (req,  res) {
    //res.sendFile(__dirname + './app/controllers/main_int_tool.html');
    res.sendFile(__dirname  +  '/assets/'  +  req.params[0]);

});

var router = express.Router();

router.get('/me', passport.authenticate('jwt', {

    session: false
}), function(req, res) {
    console.log("user app " + req.user);
    res.send(req.user);
});


router.post('/login', MasterData.login);

router.post('/project',  Project.save);

router.get('/project',  Project.getAll);

router.get('/project/:id',  Project.getById);

router.get('/document', Document.getAll);

router.get('/documentsByProject/:projectId', Document.getDocumentsByProject);

router.post('/document/:projectId', upload.single('document'), Document.save);

//router.post('/problem/:projectId', upload.single(Problem.save));



router.get('/document/download/:documentId', function(req, res) {
    console.log("Download APi got hit");
    res.download('uploads/' + req.params.documentId);
});


router.post("/problem", Problem.save);

//router.post('/document', Document.save)
//router.get('/problems',Problem.save);

router.get('/problem', Problem.getAll);

router.get('/problem/:id', Problem.getProblemById);

router.post('/solution', Problem.saveSolution);

router.put('/updateStatus/:problemId', Problem.updateStatus);

//router.post('/problem/:questionId', upload.single('problem'), Document.save);


//Master data requests
router.post('/projectTypes', MasterData.saveProjectType);

router.get('/projectTypes', MasterData.getAllProjectTypes);

router.get('/p', MasterData.getA);


//router.get('/projectType/:id',MasterData.getProjectTypeById);



router.post('/userName', MasterData.saveUserName);

router.get('/userName', MasterData.getUserName);

//router.post('/userValidation',MasterData.userValidation);

app.use('/api', router);

//app.get('/api/passwordByUser/:user',MasterData.getPasswordByUser);    //    TODO

app.listen(PORT_NUMBER, function() {
    console.log('Example app listening on port No. >> ' + PORT_NUMBER);
});