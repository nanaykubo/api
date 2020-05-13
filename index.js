//require the library needed
var express = require('express')

//mysql
var mysql = require('mysql');

//use the library
var app = express();

// to recognize incoming request
app.use(express.json());                        

//set the port
const port = 5000;

//load the express directory
app.use(express.static(__dirname));

//set mysql connection
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "inventory"
});

//default 
app.post('/', function (req, res, next) {
    res.sendfile(__dirname + 'index.html');
    next();
});

//getData
app.post('/getData', function (req, res , next) {
    
    var sql = "SELECT * FROM `items`";
    con.query(sql, function (err, result) {
    if (err) throw err;
    res.send(result);
    });

});

//insertData
app.post('/insertData', function (req, res , next) {

    var sql = `INSERT INTO items (Name, Qty, Amount) VALUES ('${req.body.name}', '${req.body.qty}','${req.body.amt}')`;
    con.query(sql, function (err, result) {
    if (err) throw err;

    res.send(result);
    });
  
});

//updateData
app.post('/updateData', function (req, res , next) {

    var sql = `UPDATE items SET Name = '${req.body.name}',Qty = '${req.body.qty}',Amount = '${req.body.amt}' WHERE ID = '${req.body.id}'`;
    
    con.query(sql, function (err, result) {
        if (err) res.send(err);
        res.send(result);
    });
 
});

//deleteData
app.post('/deleteData', function (req, res , next) {
    var sql = `DELETE FROM items WHERE ID = '${req.body.id}'`;
    
    con.query(sql, function (err, result) {
        if (err) res.send(err);
        res.send(result);
    });
 
});

//site will listen to the port
var server = app.listen(port, function(){
    console.log('Server is running in port : ' + port);
});


