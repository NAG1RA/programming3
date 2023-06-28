const gm = require("./class.Main");
let random = require("./random");
module.exports = class Monster extends gm {
    constructor(x, y, index) {
        super(x, y, index);
        this.multiply = 0
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
        this.multiply++
        if (this.multiply > 1) {
            var newCell = random(this.chooseCell(character));
            if (newCell) {
                matrix[newCell[1]][newCell[0]] = 5;
                matrix[this.y][this.x] = 0;
                this.x = newCell[0];
                this.y = newCell[1];
            }
            else {
                var newCell = random(this.chooseCell(character));
            }
        }
        return newCell;
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
        }
        var food2 = this.move(2);
        if (food2) {
            for (var i in grassEaterArr) {
                if (food2[0] == grassEaterArr[i].x && food2[1] == grassEaterArr[i].y) {
                    grassEaterArr.splice(i, 1);
                    break;
                }
            }
        }
        var food3 = this.move(3);
        if (food3) {
            for (var i in allEaterArr) {
                if (food3[0] == allEaterArr[i].x && food3[1] == allEaterArr[i].y) {
                    allEaterArr.splice(i, 1);
                    break;
                }
            }
        }
        var food4 = this.move(6);
        if (food4) {
            for (var i in humanArr) {
                if (food4[0] == humanArr[i].x && food4[1] == humanArr[i].y) {
                    humanArr.splice(i, 1);
                    break;
                }
            }
        }
    }
}