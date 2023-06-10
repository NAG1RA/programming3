var matrix = [
    [1, 0, 1, 0, 0, 0, 2, 1, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 1, 0, 0, 3, 0, 0, 0, 0],
    [0, 1, 0, 0, 6, 1, 0, 0, 0, 0, 1, 1, 0],
    [2, 6, 1, 0, 3, 0, 0, 0, 8, 1, 2, 3, 0],
    [1, 1, 0, 0, 0, 0, 0, 0, 3, 2, 2, 1, 1],
    [1, 1, 0, 6, 0, 3, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 0, 0, 0, 0, 0, 2, 0, 6, 0, 1, 1]
];
var grassArr = [];
var grassEaterArr = [];
var allEaterArr = [];
var matrixExtenderArr = [];
var humanArr = [];
var side = 50;
function setup() {
    frameRate(15);
    createCanvas(matrix[0].length * side, matrix.length * side); 
    background('#acacac');
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
        }
    }
}
function draw() {
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
            if (matrix[y][x] == 1) {
                fill("green");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 0) {
                fill("#acacac");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 2) {
                fill(255, 255, 0);
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 3) {
                fill(204, 0, 0);
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 8) {
                fill(0, 0, 0);
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 6) {
                fill(232, 190, 172);
                rect(x * side, y * side, side, side);
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
}