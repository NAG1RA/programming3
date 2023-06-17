var express = require("express");
var fs = require("fs");
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
app.use(express.static("../Game"));
app.get("/", function (req, res) {
    res.redirect("index.html");
});
server.listen(800, function () {
    console.log("App is running on port 1000");
});
grassArr = [];
grassEaterArr = [];
allEaterArr = [];
matrixExtenderArr = [];
humanArr = [];
monsterArr = [];

Main = require("./modules/class.Main");
Grass = require("./modules/class.Grass");
GrassEater = require("./modules/class.GrassEater");
AllEater = require("./modules/class.AllEater");
Human = require("./modules/class.Human");
MatrixExtender = require("./modules/class.MatrixExtender");
Monster = require("./modules/class.Monster");

var flag = false;
io.on("connection", function (socket) {
    setInterval(drawForBackend, 5000);
    flag = false;
});

matrix = [
    [1, 0, 1, 0, 0, 0, 2, 1, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 1, 0, 0, 3, 0, 0, 0, 0],
    [0, 1, 0, 0, 6, 1, 0, 0, 0, 0, 1, 1, 0],
    [2, 6, 1, 0, 3, 0, 5, 0, 8, 1, 2, 3, 0],
    [1, 1, 0, 0, 0, 0, 0, 0, 3, 2, 2, 1, 1],
    [1, 1, 0, 6, 0, 3, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 0, 0, 0, 0, 0, 2, 0, 6, 0, 1, 1]
];


for (var y = 0; y < matrix.length; ++y) {
    for (var x = 0; x < matrix[y].length; ++x) {
        if (matrix[y][x] == 1) {
            var gr = new Grass(x, y, 1);
            grassArr.push(gr);
        }
        else if (matrix[y][x] == 2) {
            var grE = new GrassEater(x, y, 2);
            grassEaterArr.push(grE);
        }
        else if (matrix[y][x] == 3) {
            var alE = new AllEater(x, y, 3);
            allEaterArr.push(alE);
        }
        else if (matrix[y][x] == 8) {
            var maE = new MatrixExtender(x, y, 8);
            matrixExtenderArr.push(maE);
        }
        else if (matrix[y][x] == 6) {
            var Hum = new Human(x, y, 6);
            humanArr.push(Hum);
        }
        else if (matrix[y][x] == 6) {
            var mon = new Monster(x, y, 5);
            monsterArr.push(mon);
        }
    }
}
function drawForBackend() {
    if (grassEaterArr.length == 0) {
        for (var y = 0; y < matrix.length; y++) {
            for (var x = 0; x < matrix[y].length; x++) {
                if (matrix[y][x] == 2) {
                    matrix[y][x] = 0;
                }
            }
        }
    }
    if (allEaterArr.length == 0) {
        for (var y = 0; y < matrix.length; y++) {
            for (var x = 0; x < matrix[y].length; x++) {
                if (matrix[y][x] == 3) {
                    matrix[y][x] = 0;
                }
            }
        }
    }
    if (humanArr.length == 0) {
        for (var y = 0; y < matrix.length; y++) {
            for (var x = 0; x < matrix[y].length; x++) {
                if (matrix[y][x] == 6) {
                    matrix[y][x] = 0;
                }
            }
        }
    }
    for (var i in grassArr) {
        grassArr[i].mul();
    }
    for (var i in grassEaterArr) {
        grassEaterArr[i].mul();
        grassEaterArr[i].eat();
        grassEaterArr[i].move(0);
        grassEaterArr[i].die();
    }
    for (var i in allEaterArr) {
        allEaterArr[i].mul();
        allEaterArr[i].eat();
        allEaterArr[i].move(0);
        allEaterArr[i].die();
    }
    for (var i in matrixExtenderArr) {
        matrixExtenderArr[i].move();
        matrixExtenderArr[i].die();
    }
    for (var i in humanArr) {
        humanArr[i].mul();
        humanArr[i].eat();
        humanArr[i].move(0);
        humanArr[i].die();
    }
    for (var i in monsterArr) {
        monsterArr[i].move(0);
        monsterArr[i].eat();
    }
    let sendData = {
        matrix: matrix,
        matrixExtenderArr: matrixExtenderArr
    }
    io.sockets.emit("matrix", sendData)
    statistics = {
        grasses: grassArr.length,
        grassEaters: grassEaterArr.length,
        allEaters: allEaterArr.length,
        humans: humanArr.length,
        matrixextender: matrixExtenderArr.length,
        monster: monsterArr.length
    }
    fs.writeFileSync('statistics.json', JSON.stringify(statistics, undefined, 2));
    mystatistics = fs.readFileSync('statistics.json').toString();
    // io.sockets.emit('sendstatistics', JSON.parse(mystatistics));
    io.sockets.emit("matrix", sendData);
   
}

 setInterval(drawForBackend, 100);