const gm = require("./class.Main");
let random = require("./random");
module.exports = class MatrixExtender extends gm {
    constructor(x, y, index) {
        super(x, y, index);
        this.multiply = 0;
    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    chooseCell() {
        this.getNewCoordinates();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && y >= 0 && matrix.length < 15 || x >= 0 && y >= 0 && matrix[0].length < 20) {
                found.push(this.directions[i]);
            }
        }
        return found;
    }
    move() {
        this.multiply++
        if (this.multiply > 1) {
            var newCell = random(this.chooseCell());
            this.multiply = 0;
            if (newCell) {
                if (newCell[1] > matrix.length - 1) {
                    var newRow = [];
                    for (var i = 0; i < matrix[0].length; i++) {
                        newRow.push(0);
                    }
                    var newCell2 = random(this.chooseCell());
                    if (newCell2 && matrix.length < 14 || newCell2 && matrix[0].length < 19) {
                        var grEater = new GrassEater(newCell2[0], newCell2[1], 2);
                        grassEaterArr.push(grEater);
                    }
                    var newCell3 = random(this.chooseCell());
                    if (newCell3 && matrix.length < 14 || newCell3 && matrix[0].length < 19) {
                        var alEater = new AllEater(newCell3[0], newCell3[1], 3);
                        allEaterArr.push(alEater);
                    }
                    var newCell4 = random(this.chooseCell());
                    if (newCell4 && matrix.length < 14 || newCell4 && matrix[0].length < 19) {
                        var hum = new Human(newCell4[0], newCell4[1], 6);
                        humanArr.push(hum);
                    }
                    matrix.push(newRow);
                    matrix[this.y][this.x] = 0;
                }
                if (newCell[0] > matrix[0].length - 1) {
                    for (var i = 0; i < matrix.length; i++) {
                        matrix[i].push(0);
                    }
                    var newCell2 = random(this.chooseCell());
                    if (newCell2 && matrix.length < 14 || newCell2 && matrix[0].length < 19) {
                        var grEater = new GrassEater(newCell2[0], newCell2[1], 2);
                        grassEaterArr.push(grEater);
                    }

                    var newCell3 = random(this.chooseCell());
                    if (newCell3 && matrix.length < 14 || newCell3 && matrix[0].length < 19) {
                        var alEater = new AllEater(newCell3[0], newCell3[1], 3);
                        allEaterArr.push(alEater);
                    }
                    var newCell4 = random(this.chooseCell());
                    if (newCell4 && matrix.length < 14 || newCell4 && matrix[0].length < 19) {
                        var hum = new Human(newCell4[0], newCell4[1], 6);
                        humanArr.push(hum);
                    }
                    matrix[this.y][this.x] = 0;
                
                }

                else if (matrix[newCell[1]][newCell[0]] == 0) {
                    matrix[this.y][this.x] = 0;
                    matrix[newCell[1]][newCell[0]] = 8;
                }
                else if (matrix[newCell[1]][newCell[0]] == 1) {
                    matrix[this.y][this.x] = 1;
                    matrix[newCell[1]][newCell[0]] = 8;
                }
                else if (matrix[newCell[1]][newCell[0]] == 2) {
                    matrix[this.y][this.x] = 2;
                    matrix[newCell[1]][newCell[0]] = 8;
                }
                else if (matrix[newCell[1]][newCell[0]] == 3) {
                    matrix[this.y][this.x] = 3;
                    matrix[newCell[1]][newCell[0]] = 8;
                }
                else if (matrix[newCell[1]][newCell[0]] == 6) {
                    matrix[this.y][this.x] = 6;
                    matrix[newCell[1]][newCell[0]] = 8;
                }
                else if (matrix[newCell[1]][newCell[0]] == 5) {
                    matrix[this.y][this.x] = 5;
                    matrix[newCell[1]][newCell[0]] = 8;
                }
                this.x = newCell[0];
                this.y = newCell[1];
            }
        }
    }
    die() {
        if (matrix.length > 14 && matrix[0].length > 19) {
            matrix[this.y][this.x] = 0;
            matrixExtenderArr.pop();
        }
    }
}