// var os = require("os");

// var message = "The platform is ";

// function main(){

// console.log(message + os.platform());

// }

// main();
// var express = require("express");

// var app = express();

// app.get("/", function(req, res){

// res.send("Hello world");

// });

// app.listen(3000, function(){

// console.log("Example is running on port 3000");

// });
// var express = require("express");

// var app = express();

// app.get("/", function(req, res){

// res.send("<h1>Hello world</h1>");

// });

// app.get("/name/:name", function(req, res){

// var name = req.params.name;

// res.send("<h1>Hello " + name +"</h1>");

// });

// app.listen(4000, function(){

// console.log("Example is running on port 4000");

// });
// var fs = require('fs');

// function main(){

// var file = "hello.txt";

// fs.appendFileSync(file, "Hello world\n");

// }

// main();
// var fs = require('fs');

// var dummyText = "Apple yep";

// function main() {

// fs.writeFileSync("dummytext.txt", dummyText);

// var text = fs.readFileSync("dummytext.txt").toString();

// console.log(dummyText == text);

// console.log(text);

// fs.writeFileSync("undummytext.txt",

// text.replace("Apple", "Microsoft")

// );

// }

// main();
// var express = require("express");

//  var app = express();
// app.get("/name/:name", function(req, res){

//     var name = req.params.name;

//     if(name == "google"){
//         res.redirect('http://google.com')
//     }
//     else{
//         res.send("<h1>Hello " + name + "</h1>");
//     }


//     });


//     app.get("/search/:searchvalue", function(req, res){

//         var val = req.params.searchvalue;


//             res.redirect('https://google.com/search?q=' + val)






//         });

//         app.listen(5000, function(){



//         });
var express = require("express");

var app = express();

var server = require('http').createServer(app);

require('socket.io')(server);

app.use(express.static("Game"));

app.get('/', function (req, res) {

    res.redirect('index.html');

});

app.listen(9000, function () {

    console.log("Example is running on port 10000");

});