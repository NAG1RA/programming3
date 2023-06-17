const gm = require("./class.Main");
let random = require("./random");
module.exports = class Human extends gm {
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
            matrix[newCell[1]][newCell[0]] = 6;
            matrix[this.y][this.x] = 0;
            this.x = newCell[0];
            this.y = newCell[1];
        }
        if (character == 2) {
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
    }

    mul() {
        this.multiply++;
        var newCell = random(this.chooseCell(0));
        if (this.multiply > 10 && newCell) {
            var newhuman = new Human(newCell[0], newCell[1], this.index);
            humanArr.push(newhuman);
            matrix[newCell[1]][newCell[0]] = 6;
            this.multiply = 0;
        }
    }
    die() {
        if (this.energy <= 0) {

            for (var i in humanArr) {
                if (humanArr[i].x == this.x && humanArr[i].y == this.y) {
                    humanArr.splice(i, 1);
                    break;
                }
            }
            matrix[this.y][this.x] = 0;
        }
    }
}