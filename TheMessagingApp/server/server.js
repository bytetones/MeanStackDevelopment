var express = require('express');
var bodyParser = require("body-parser");
var Message = require("../models/Message");
var cors = require('cors');

var app = express();

app.use(bodyParser.json());
app.use(cors());

/**
 * This method get the hard coded messages
 */
app.get('/api/getMessages', function (request, response) {
    response.json([{
        username: "Vivek",
        body: "This meanstack class rocks"
    }
    ])

});

/**
 * This method actually gets the messages from the DB
 */
app.get('/api/getMessagesFinal', function (request, response,next) {
    Message.find()
        .sort('-date')
        .exec(function(err, messages) {
            if (err) { return next(err) }
            response.json(messages);
        })


});

var options = {
  root:'/Users/viveksh2/Documents/UCSC/WebFrameworkUsingJavaScript/CodeToBeUploaded/MeanStackDevelopment/TheMessagingApp/'


};

app.get('/', function (req, res) {
    res.sendFile('views/index.html',options);
});


app.post('/api/postMessages', function(req,resp){
    console.log("Message Recieved!!!!");
    console.log(req.body.username);
    console.log(req.body.body);
    resp.send(201)
});



app.post('/api/saveMessage', function (req, res, next) {
    var post = new Message({
        username: req.body.username,
        body: req.body.body
    });
    console.log('created the Message');
    post.save(function (err, post) {
        if (err) { return next(err) }
        console.log("The request successful" + post );
        res.json(201, post)
    })
});


app.listen(3000, function () {
    console.log('The server is listening at the port 3000');

});




