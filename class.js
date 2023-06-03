class Grass {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.index = index;
        this.multiply = 0;
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
    mul() {
        this.multiply++;
        var newCell = random(this.chooseCell(0));

        if (this.multiply >= 8 && newCell) {
            var newGrass = new Grass(newCell[0], newCell[1], this.index);
            grassArr.push(newGrass);
            matrix[newCell[1]][newCell[0]] = 1;
            this.multiply = 0;
        }
    }
}
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
class AllEater {
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
            matrix[newCell[1]][newCell[0]] = 3;
            matrix[this.y][this.x] = 0;
            this.x = newCell[0];
            this.y = newCell[1];
        }
        // else if (newCell == undefined) {
        //     matrix[this.y][this.x] = 0;
        // }
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
                }
            }
          
        }
    }
}

class MatrixExtender {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
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
                    var newRow = []
                    for (var i = 0; i < matrix[0].length; i++) {
                        newRow.push(0)
                    }
                    var newCell2 = random(this.chooseCell());
                    if (newCell2 && matrix.length < 14 || newCell2 && matrix[0].length < 19) {
                        var grEater = new GrassEater(newCell2[0], newCell2[1], 2)
                        grassEaterArr.push(grEater);
                        // matrix[newCell2[1]][newCell2[0]]  = 2
                    }
                    var newCell3 = random(this.chooseCell());
                    if (newCell3 && matrix.length < 14 || newCell3 && matrix[0].length < 19) {
                        var alEater = new AllEater(newCell3[0], newCell3[1], 3)
                        allEaterArr.push(alEater);
                        // matrix[newCell2[1]][newCell2[0]]  = 3
                    }
                    var newCell4 = random(this.chooseCell());
                    if (newCell4 && matrix.length < 14 || newCell4 && matrix[0].length < 19) {
                        var hum = new Human(newCell4[0], newCell4[1], 6)
                        // matrix[newCell2[1]][newCell2[0]]  = 6
                        humanArr.push(hum);
                    }
                    matrix.push(newRow)
                    matrix[this.y][this.x] = 0;

                    createCanvas(matrix[0].length * side, matrix.length *
                        side);
                    background('#acacac');

                }
                if (newCell[0] > matrix[0].length - 1) {

                    for (var i = 0; i < matrix.length; i++) {

                        matrix[i].push(0);


                    }
                    var newCell2 = random(this.chooseCell());
                    if (newCell2 && matrix.length < 14 || newCell2 && matrix[0].length < 19) {
                        var grEater = new GrassEater(newCell2[0], newCell2[1], 2)
                        grassEaterArr.push(grEater);
                    }

                    var newCell3 = random(this.chooseCell());
                    if (newCell3 && matrix.length < 14 || newCell3 && matrix[0].length < 19) {
                        var alEater = new AllEater(newCell3[0], newCell3[1], 3)
                        allEaterArr.push(alEater);

                    }
                    var newCell4 = random(this.chooseCell());
                    if (newCell4 && matrix.length < 14 || newCell4 && matrix[0].length < 19) {
                        var hum = new Human(newCell4[0], newCell4[1], 6)
                        humanArr.push(hum);
                    }
                    matrix[this.y][this.x] = 0;
                    createCanvas(matrix[0].length * side, matrix.length *side);
                    background('#acacac');

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
class Human {
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
            matrix[newCell[1]][newCell[0]] = 6;
            matrix[this.y][this.x] = 0;
            this.x = newCell[0];
            this.y = newCell[1];
        }
        // else if (newCell == undefined) {
        //     matrix[this.y][this.x] = 0;
        // }
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
                }
            }
            matrix[this.y][this.x] = 0;
        }
    }
}