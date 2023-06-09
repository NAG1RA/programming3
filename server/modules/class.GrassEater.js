const gm = require("./class.Main");
let random = require("./random");
module.exports = class GrassEater extends gm {
    constructor(x, y, index, isFemale) {
        super(x, y, index);
        this.energy = 8;
        this.multiply = 0;
        this.isFemale = isFemale;
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
            matrix[newCell[1]][newCell[0]] = 2;
            matrix[this.y][this.x] = 0;
            this.x = newCell[0];
            this.y = newCell[1];
        }
        if (character == 1) {
            return newCell;
        }
    }

    eat() {
        var food = this.move(1);
        if (food) {
            for (var i in grassArr) {
                if (food[0] == grassArr[i].x && food[1] == grassArr[i].y) {
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
            var newGrassEater = new GrassEater(newCell[0], newCell[1], this.index, !this.isFemale);
            grassEaterArr.push(newGrassEater);
            matrix[newCell[1]][newCell[0]] = 2;
            this.multiply = 0;
            this.energy = 5;
        }
    }
    
    die() {
        if (this.energy <= 0 && this.isFemale == true) {
            matrix[this.y][this.x] = 0;
            for (var i in grassEaterArr) {
                if (grassEaterArr[i].x == this.x && grassEaterArr[i].y == this.y) {
                    grassEaterArr.splice(i, 1);
                    break;
                }
            }
        }
    }
}