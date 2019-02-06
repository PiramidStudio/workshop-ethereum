var express = require('express');
var app = express();
var path = require('path');
var Web3 = require('web3');
var web3 = new Web3("ws://localhost:8546");
var PiramidTokenOBJ = require('./build/contracts/PiramidToken.json')


// viewed at http://localhost:8080
app.use(express.static('examples'));
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/examples/index.html'));
});

var PiramidTokenContract = new web3.eth.Contract(PiramidTokenOBJ.abi, "0x2A2B68E9Bf718DBf6dF3dF91174A136054a8A0Ec");
PiramidTokenContract.events.Transfer().on('data', function(event){
  console.log(event);
})

console.log('webserver started...')
console.log(`listening on 127.0.0.1:8080`)

app.listen(8080);
