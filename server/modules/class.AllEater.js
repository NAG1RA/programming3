const gm = require("./class.Main");
let random = require("./random");
module.exports = class AllEater extends gm {
    constructor(x, y, index) {
        super(x, y, index);
        this.energy = 8;
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
        if (character == 2 || character == 6) {
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
    }
    mul() {
        this.multiply++;
        var newCell = random(this.chooseCell(0));
        if (this.multiply > 10 && newCell) {
            var newAllEater = new AllEater(newCell[0], newCell[1], this.index);
            allEaterArr.push(newAllEater);
            matrix[newCell[1]][newCell[0]] = 3;
            this.multiply = 0;
            this.energy = 5;
        }
    }
    die() {
        if (this.energy <= 0) {
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