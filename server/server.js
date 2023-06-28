var express = require("express");
var fs = require("fs");
const { clearInterval } = require("timers");
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
app.use(express.static("../Game"));
app.get("/", function (req, res) {
    res.redirect("index.html");
});
server.listen(3300, function () {
});
grassArr = [];
grassEaterArr = [];
allEaterArr = [];
matrixExtenderArr = [];
humanArr = [];
monsterArr = [];
chadderArr = [];
Main = require("./modules/class.Main");
Grass = require("./modules/class.Grass");
GrassEater = require("./modules/class.GrassEater");
AllEater = require("./modules/class.AllEater");
Human = require("./modules/class.Human");
MatrixExtender = require("./modules/class.MatrixExtender");
Monster = require("./modules/class.Monster");
ChAdder = require("./modules/class.ChAdder");
var mult = 4
var fl = 100
var inter;
io.on("connection", function (socket) {
    socket.on("afterclick", function (data) {
        mult = data.mult,
            fl = data.fr
    });
    setInterval(drawForBackend, 5000);
});
matrix = [
    [1, 0, 1, 0, 0, 0, 2, 1, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 1, 0, 0, 3, 0, 0, 8, 0],
    [0, 1, 0, 0, 6, 1, 0, 0, 5, 0, 1, 1, 0],
    [2, 6, 1, 0, 3, 0, 5, 0, 0, 1, 2, 3, 0],
    [1, 1, 0, 0, 0, 0, 0, 0, 3, 2, 2, 1, 1],
    [1, 1, 0, 6, 0, 3, 9, 0, 0, 0, 0, 0, 0],
    [1, 1, 0, 0, 0, 0, 0, 2, 0, 6, 0, 1, 1]
];

var isFemale = true;
for (var y = 0; y < matrix.length; ++y) {
    for (var x = 0; x < matrix[y].length; ++x) {
        if (matrix[y][x] == 1) {
            var gr = new Grass(x, y, 1);
            grassArr.push(gr);
        }
        else if (matrix[y][x] == 2) {
            isFemale = !isFemale;
            var grE = new GrassEater(x, y, 2, isFemale);
            grassEaterArr.push(grE);
        }
        else if (matrix[y][x] == 3) {
            isFemale = !isFemale
            var alE = new AllEater(x, y, 3, isFemale);
            allEaterArr.push(alE);
        }
        else if (matrix[y][x] == 8) {
            var maE = new MatrixExtender(x, y, 8);
            matrixExtenderArr.push(maE);
        }
        else if (matrix[y][x] == 6) {
            isFemale = !isFemale
            var Hum = new Human(x, y, 6, isFemale);
            humanArr.push(Hum);
        }
        else if (matrix[y][x] == 5) {
            var mon = new Monster(x, y, 5);
            monsterArr.push(mon);
        }
        else if (matrix[y][x] == 9) {
            var ad = new ChAdder(x, y, 9);
            chadderArr.push(ad);
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
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 8) {
                if (matrixExtenderArr[0].y != y && matrixExtenderArr[0].x != x)
                    matrix[y][x] = 0;
            }
        }
    }
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 9) {
                if (chadderArr[0].y != y && chadderArr[0].x != x)
                    matrix[y][x] = 0;
            }
        }
    }
    for (var i in grassArr) {
        grassArr[i].mul(mult);
    }
    for (var i in grassEaterArr) {
        grassEaterArr[i].mul(mult);
        grassEaterArr[i].eat();
        grassEaterArr[i].move(0);
        grassEaterArr[i].die();
    }
    for (var i in allEaterArr) {
        allEaterArr[i].mul(mult);
        allEaterArr[i].eat();
        allEaterArr[i].move(0);
        allEaterArr[i].die();
    }
    for (var i in matrixExtenderArr) {
        matrixExtenderArr[i].move(mult);
        matrixExtenderArr[i].die();
    }
    for (var i in humanArr) {
        humanArr[i].mul(mult);
        humanArr[i].eat();
        humanArr[i].move(0);
        humanArr[i].die();
    }
    for (var i in monsterArr) {
        monsterArr[i].move(0, mult);
        monsterArr[i].eat();
    }
    for (var i in chadderArr) {
        chadderArr[i].move(mult);
    }
    stats = [grassArr.length, grassEaterArr.length, allEaterArr.length, humanArr.length, matrixExtenderArr.length, monsterArr.length, chadderArr.length];
    let sendData = {
        matrix: matrix,
        matrixExtenderArr: matrixExtenderArr,
        chadderArr: chadderArr,
        stats: stats
    }
    statistics = {
        grasses: grassArr.length,
        grassEaters: grassEaterArr.length,
        allEaters: allEaterArr.length,
        humans: humanArr.length,
        matrixextender: matrixExtenderArr.length,
        monster: monsterArr.length,
        adder: chadderArr.length
    }
    fs.writeFileSync('statistics.json', JSON.stringify(statistics, undefined, 2));
    mystatistics = fs.readFileSync('statistics.json').toString();
    io.sockets.emit("matrix", sendData);
    clearInterval(inter);
    inter = setInterval(drawForBackend, fl);
}