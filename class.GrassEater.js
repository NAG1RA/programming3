class GrassEater {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.energy = 8;
        this.multiply = 0;
        this.index = index;
        this.directions = [];
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
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
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
        // else if (newCell == undefined) {
        //     matrix[this.y][this.x] = 0;
        // }
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

    mul() {
        this.multiply++;
        var newCell = random(this.chooseCell(0));
        if (this.multiply > 10 && newCell) {
            var newGrassEater = new GrassEater(newCell[0], newCell[1], this.index);
            grassEaterArr.push(newGrassEater);
            matrix[newCell[1]][newCell[0]] = 2;
            this.multiply = 0;
            this.energy = 5;
        }
    }
    die() {
        if (this.energy <= 0) {
            matrix[this.y][this.x] = 0;
            for (var i in grassEaterArr) {
                if (grassEaterArr[i].x == this.x && grassEaterArr[i].y == this.y) {
                    grassEaterArr.splice(i, 1);
                }
            }
        }
    }
}