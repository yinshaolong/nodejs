const fs = require('fs'); //gives access to the file system

const textIn = fs.readFileSync('./txt/input.txt', "utf-8") //takes two arguments, the path to the file and the character encoding to be used to read the file
console.log(textIn);