socket = io();
var side = 30;
stside = 20;
gp = 2000;
var m = 13;
var n = 7;
mult = 4;
var fr = 100;
grcolor = "green";
grecolor = [255, 208, 0]
var stats = []
function setup() {
    createCanvas(m * side * 10, n * side * 10);
    background('#acacac');
    button1 = document.getElementById('summer');
    button2 = document.getElementById('spring');
    button3 = document.getElementById('winter');
    button4 = document.getElementById('autumn');
    button5 = document.getElementById('changeframerate');
    button1.addEventListener("click", onColorChange);
    button2.addEventListener("click", onColorChange);
    button3.addEventListener("click", onColorChange);
    button4.addEventListener("click", onColorChange);
    button5.addEventListener("click", changeframeRate);
}
function changeframeRate() {
    fr = fr + 200
    if (fr > 500) {
        fr = 100;
    }
    data = {
        mult: mult,
        fr: fr
    }
    socket.emit("afterclick", data)
}
function onColorChange() {
    if (event.target.id == "summer") {
        grcolor = [255, 247, 138];
        grecolor = [71, 48, 0]
        mult = 6;
    }
    if (event.target.id == "spring") {
        grcolor = "green";
        grecolor = [255, 208, 0]
        mult = 4;
    }
    if (event.target.id == "autumn") {
        grcolor = [100, 117, 0];
        grecolor = [71, 48, 0]
        mult = 10;
    }
    if (event.target.id == "winter") {
        grcolor = [255, 255, 255];
        grecolor = [71, 48, 0]
        mult = 20;
    }
    data = {
        mult: mult,
        fr: fr
    }
    socket.emit("afterclick", data)
}

function drawMatrix(data) {
    matrix = data.matrix;
    stats = data.stats;
    if (matrix.length > n || matrix[0].length > m) {
        createCanvas(matrix[0].length * side * 10, matrix.length * side * 10);
        background('#acacac');
    }
    console.log(1)
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                fill(grcolor);
            }
            else if (matrix[y][x] == 0) {
                fill("#acacac");
            }
            else if (matrix[y][x] == 2) {
                fill(grecolor);
            }
            else if (matrix[y][x] == 3) {
                fill(204, 0, 0);
            }
            else if (matrix[y][x] == 8) {
                fill(0, 0, 0);
            }
            else if (matrix[y][x] == 6) {
                fill(232, 190, 172);
            }
            else if (matrix[y][x] == 5) {
                fill(169, 5, 245);
            }
            else if (matrix[y][x] == 9) {
                fill(0, 76, 255);
            }
            rect(x * side, y * side, side, side);
        }
    }
    stats = data.stats;
    var l = 0
    for (var i = 0; i < stats.length; i++) {
        if (i > 0) {
            rect(2000 + i * (stside + 20), 0, stside + 20, stside * stats[i])
        }
        l = 2000 + i * (stside + 20)

        if (i == 0) {
            fill(grcolor)
        }
        if (i == 1 && l != 2000) {
            fill(204, 0, 0)
        }
        if (i == 2 && l != 2000) {
            fill(232, 190, 172)
        }
        if (i == 3 && l != 2000) {
            fill(0, 0, 0)
        }
        if (i == 4 && l != 2000) {
            fill(169, 5, 245)
        }
        if (i == 5 && l != 2000) {
            fill(0, 76, 255)
        }
        if (l == 2000) {
            rect(2000, 0, stside + 20, stside * stats[0])
            fill(grecolor)
        }
    }
}

socket.on("matrix", drawMatrix);