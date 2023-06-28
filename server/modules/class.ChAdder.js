const gm = require("./class.Main");
let random = require("./random");
module.exports = class ChAdder extends gm {
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
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                found.push(this.directions[i]);
            }
        }
        return found;
    }

    move(mult) {
        this.isFemaleForObjects = !this.isFemaleForObjects
        this.multiply++
        if (this.multiply > mult-4) {
            var newCell = random(this.chooseCell());
            if (newCell) {
                var n = random([1, 2, 3]);
                if (n == 1) {
                    var newCell2 = random(this.chooseCell());
                    if (newCell2) {
                        if (matrix[newCell2[1]][newCell2[0]] == 1) {
                            for (var i in grassArr) {
                                if (newCell2[0] == grassArr[i].x && newCell2[1] == grassArr[i].y) {
                                    grassArr.splice(i, 1);
                                    break;
                                }
                            }
                        }
                        var grEater = new GrassEater(newCell2[0], newCell2[1], 2, this.isFemaleForObjects);
                        grassEaterArr.push(grEater);
                        matrix[newCell2[1]][newCell2[0]] = 2
                    }
                }
                if (n == 2) {
                    var newCell3 = random(this.chooseCell());
                    if (newCell3) {
                        if (matrix[newCell3[1]][newCell3[0]] == 1) {
                            for (var i in grassArr) {
                                if (newCell3[0] == grassArr[i].x && newCell3[1] == grassArr[i].y) {
                                    grassArr.splice(i, 1);
                                    break;
                                }
                            }
                        }
                        var alEater = new AllEater(newCell3[0], newCell3[1], 3, this.isFemaleForObjects);
                        allEaterArr.push(alEater);
                        matrix[newCell3[1]][newCell3[0]] = 3
                    }
                }
                if (n == 3) {
                    var newCell4 = random(this.chooseCell());
                    if (newCell4) {
                        if (matrix[newCell4[1]][newCell4[0]] == 1) {
                            for (var i in grassArr) {
                                if (newCell4[0] == grassArr[i].x && newCell4[1] == grassArr[i].y) {
                                    grassArr.splice(i, 1);
                                    break;
                                }
                            }
                        }
                        var hum = new Human(newCell4[0], newCell4[1], 6, this.isFemaleForObjects);
                        humanArr.push(hum);
                        matrix[newCell4[1]][newCell4[0]] = 6
                    }
                }
                if (matrix[newCell[1]][newCell[0]] == 0) {
                    matrix[this.y][this.x] = 0;
                    matrix[newCell[1]][newCell[0]] = 9;
                }
                else if (matrix[newCell[1]][newCell[0]] == 1) {
                    matrix[this.y][this.x] = 1;
                    matrix[newCell[1]][newCell[0]] = 9;
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
}