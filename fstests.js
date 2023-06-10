var fs = require('fs');
var obj = {
    "first_name": "Vardan",
    "last_name": "Hovsepyan",
    "age": 13,
    "tumo_student": true,
}
str = JSON.stringify(obj);




function main() {

fs.writeFileSync("obj.json", str );



}
main();