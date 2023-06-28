const gm = require("./class.Main");
let random = require("./random");
module.exports = class AllEater extends gm {
    constructor(x, y, index, isFemale) {
        super(x, y, index);
        this.energy = 8;
        this.multiply = 0;
        this.isFemale = !isFemale
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

    chooseCell(character) {
        this.getNewCoordinates();
        return super.chooseCell(character);
    }

    move(character) {
        var newCell = random(this.chooseCell(character));
        this.energy--;
        if (newCell) {
            matrix[newCell[1]][newCell[0]] = 3;
            matrix[this.y][this.x] = 0;
            this.x = newCell[0];
            this.y = newCell[1];
        }
        else {
            var newCell = random(this.chooseCell(character));
        }
        if (character == 2 || character == 6 || character == 1) {
            return newCell;
        }
    }

    eat() {
        var food = this.move(2);
        if (food) {
            for (var i in grassEaterArr) {
                if (food[0] == grassEaterArr[i].x && food[1] == grassEaterArr[i].y) {
                    grassEaterArr.splice(i, 1);
                    break;
                }
            }
            this.energy += 2;
        }
        var food2 = this.move(6);
        if (food2) {
            for (var i in humanArr) {
                if (food2[0] == humanArr[i].x && food2[1] == humanArr[i].y) {
                    humanArr.splice(i, 1);
                    break;
                }
            }
            this.energy += 2;
        }
        var food3 = this.move(1);
        if (food3) {
            for (var i in grassArr) {
                if (food3[0] == grassArr[i].x && food3[1] == grassArr[i].y) {
                    grassArr.splice(i, 1);
                    break;
                }
            }
            this.energy += 2;
        }
    }

    mul(mult) {
        this.multiply++;
        var newCell = random(this.chooseCell(0));
        if (this.multiply > mult && newCell && this.isFemale == true) {
            var newAllEater = new AllEater(newCell[0], newCell[1], this.index, !this.isFemale);
            allEaterArr.push(newAllEater);
            matrix[newCell[1]][newCell[0]] = 3;
            this.multiply = 0;
            this.energy = 5;
        }
    }

    die() {
        if (this.energy <= 0 && this.isFemale == true) {
            matrix[this.y][this.x] = 0;
            for (var i in allEaterArr) {
                if (allEaterArr[i].x == this.x && allEaterArr[i].y == this.y) {
                    allEaterArr.splice(i, 1);
                    break;
                }
            }
        }
    }
}