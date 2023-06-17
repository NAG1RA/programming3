socket = io();
var side = 50;
var m = 13;
var n = 7;
function setup() {
    frameRate(15);
    createCanvas(m * side, n * side);
    background('#acacac');
}
function drawMatrix(data) {
    matrix = data.matrix;
    if (matrix.length > n || matrix[0].length > m) {
        createCanvas(matrix[0].length * side, matrix.length * side);
        background('#acacac');
    }

    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                fill("green");
            }
            else if (matrix[y][x] == 0) {
                fill("#acacac");
            }
            else if (matrix[y][x] == 2) {
                fill(255, 255, 0);
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
            rect(x * side, y * side, side, side);
        }
    }
}

socket.on("matrix", drawMatrix);
// socket.on("sendstatistics", drawChart);