const gm = require("./class.Main");
let random = require("./random");
module.exports = class MatrixExtender extends gm {
    constructor(x, y, index) {
        super(x, y, index);
        this.multiply = 0;
        this.isFemaleForObjects = true;
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

    move(mult) {
        this.isFemaleForObjects = !this.isFemaleForObjects
        this.multiply++
        if (this.multiply > mult - 4) {
            var newCell = random(this.chooseCell());
            if (newCell) {
                if (newCell[1] > matrix.length - 1) {
                    var newRow = [];
                    for (var i = 0; i < matrix[0].length; i++) {
                        newRow.push(0);
                    }
                    matrix.push(newRow);
                    matrix[this.y][this.x] = 0;
                }
                if (newCell[0] > matrix[0].length - 1) {
                    for (var i = 0; i < matrix.length; i++) {
                        matrix[i].push(0);
                    }
                    matrix[this.y][this.x] = 0;
                }
                else if (newCell[0] == undefined || newCell[1] == undefined) {
                    var newCell = random(this.chooseCell());
                }
                else if (matrix[newCell[1]][newCell[0]] == 0) {
                    matrix[this.y][this.x] = 0;
                    matrix[newCell[1]][newCell[0]] = 8;
                }
                else if (matrix[newCell[1]][newCell[0]] == 1) {
                    matrix[this.y][this.x] = 1;
                    matrix[newCell[1]][newCell[0]] = 8;
                }
                else {
                    var newCell = random(this.chooseCell());
                }
                this.x = newCell[0];
                this.y = newCell[1];
                this.multiply = 0;
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