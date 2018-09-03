var express = require('express');
var app = express();
const fileUpload = require('express-fileupload');  // npm install --save express-fileupload ենք անում, որ կարողանանք օգտագործել express-fileupload մոդուլը Ֆայլ ներբեռնելու համար
app.use(fileUpload());
var MongoClient = require('mongodb').MongoClient // npm install mongodb ենք անում
var ObjectId = require('mongodb').ObjectId; //  for working { _id: ObjectId(carId)}
var dbUrl = 'mongodb://localhost:27017/AutoShop';
var dbName = 'AutoShop';
var collName = 'cars';
var fs = require('fs');
var http = require('http');
var path = require('path');
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));   // app.use(bodyParser.urlencoded({ extended: true })); // for parsing       application/x-www-form-urlencoded
var cors = require('cors');
app.use(cors());
app.get('/', (request, response) =>  response.sendFile(`${__dirname}/index.html`));


// This responds with "Hello World" on the homepage
app.get('/', function (req, res) {
   console.log("Got a GET request for the homepage");
   res.send('Hello GET');
})

// This responds a GET request for the /list_user page.
app.get('/api/car_list', function (req, res) {
    //res.setHeader('Access-Control-Allow-Origin', '*');
    console.log("Դուք GET request ուղարկեցիք /api/car_list ին");
    MongoClient.connect(dbUrl, function (err, client) {
        if (err) throw err

        var db = client.db(dbName)
        db.collection(collName).find().toArray(function (err, myCars) {
            if (err) throw err
            res.send(myCars);
        });
    });
})


app.post('/oneCar', function (req, res) {
    var ObjectId = require('mongodb').ObjectId;
    var carId = req.body.id;
    // console.log(req.body.id);
    MongoClient.connect(dbUrl, function (err, client) {
        if (err) throw err
        var db = client.db(dbName)

        db.collection(collName).findOne({ _id: ObjectId(carId) }, function (err, info) {
            if (err) throw err
            //console.log("info model is "+info.model);
            res.send(info);
        });
    });

})


app.post('/create_car', function (req, res) {
    const postBody = req.body;
    //  console.log(postBody);
    res.end();

    MongoClient.connect(dbUrl, function (err, client) {
        if (err) throw err

        var db = client.db(dbName)
        var myobj = postBody;
        db.collection(collName).insertOne(myobj, function(err, res) {
            if (err) throw err
            console.log("1 document inserted");
            client.close();
        });
    });
})



app.put('/update_car', function (req, res) {
/*    var id = req.body._id;  //console.log(id);
    var year =req.body.year; //console.log(req.body.year);
    var make =req.body.make;
    var model =req.body.model;
    var image =req.body.image;
    var condition =req.body.condition;
    var body =req.body.body;
    var transmission =req.body.transmission;
    var useWay =req.body.useWay;
    var price =req.body.price;
    var stars =req.body.stars;
    var description =req.body.description;*/

    res.end();

    MongoClient.connect(dbUrl, function(err, client){
        if(err) return console.log(err);
             const db = client.db(dbName);
        const col = db.collection(collName);
        db.collection(collName).update(
            {_id: ObjectId(req.body._id)},              // критерий выборки
            {       year:req.body.year,
                    make:req.body.make,
                    model:req.body.model,
                    image:req.body.image,
                    condition:req.body.condition,
                    body:req.body.body,
                    transmission:req.body.transmission,
                    useWay:req.body.useWay,
                    price:req.body.price,
                    stars:req.body.stars,
                    description:req.body.description},     // параметр обновления
            {                           // доп. опции обновления
                returnOriginal: false
            },
            function(err, result){

                console.log(result);
                client.close();
            }
        );
    });
})


app.post('/delete_car', function (req, res) {
    var id = req.body._id;

    MongoClient.connect(dbUrl, function (err, client) {
        if (err) throw err

        var db = client.db(dbName)
        var myquery = { _id: ObjectId(id) };
        db.collection(collName).deleteOne(myquery, function(err,objRes) {
            if (err) throw err
            console.log("1 document deleted");
            client.close();
        });
    });

})


/*



dbo.collection("customers").deleteOne(myquery, function(err, obj) {
    if (err) throw err;
    console.log("1 document deleted");
    db.close();
});
*/


// post request է ուղարկվել  file_uploadPage էջին
app.post('/file_uploadPage', function (req, res) {
    if (!req.files)
        return res.status(400).send('No files were uploaded.');
    // Փոփոխական, որը վերցնում է ուղարկված ֆայլը
    let CarPicture = req.files.inputCarPictureName;

    // Use the mv() method to place the file somewhere on your server
    // Օգտագործում ենք mv() մեթոդը մեր upload արած ֆայլը սերվերում ինչ-որ տեղ տեղադրելու համար(FolderUploadFiles պապկայի մեջ)
    CarPicture.mv('../Cars/app/cars/carsImage/'+CarPicture.name, function(err) {
        if (err)
            return res.status(500).send(err);

       // res.send('Ֆայլը գցել է carsImage պապկայի մեջ:Գնացեք կոֆե խմելու'+CarPicture.name);
    });
    res.end();
})



// This responds a GET request for abcd, abxcd, ab123cd, and so on
app.get('/ab*cd', function(req, res) {   
   console.log("Got a GET request for /ab*cd");
   res.send('Page Pattern Match');
})

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Բարև, աշխատող սերվեր http://%s:%s", host, port)
})

//https://fullstack-developer.academy/how-do-you-extract-post-data-in-node-js/
