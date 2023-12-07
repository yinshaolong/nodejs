const fs = require('fs'); //gives access to the file system


function fileSync(){
    const textIn = fs.readFileSync('./txt/input.txt', "utf-8") //takes two arguments, the path to the file and the character encoding to be used to read the file
    console.log(textIn);
    //date in milliseconds
    const textOut =`This is what we know abot the avocade: ${textIn}.\nCreated on ${Date.now()}`;
    fs.writeFileSync('./txt/output.txt', textOut); //takes two arguments, the path to the file and the data to be written to the file
    console.log('File written!');
}
//non-blocking asynchronous way
function fileAsync(){
    fs.readFile("./txt/start.txt", "utf-8", (err, file_content) => {
        fs.readFile(`./txt/${file_content}.txt`, "utf-8", (err, data) => {
            console.log(data);

            fs.readFile(`./txt/append.txt`, "utf-8", (err, data2) => {
            console.log(data2)

                fs.writeFile("./txt/final.txt", `${data}\n${data2}`, "utf-8", err => {
                    console.log("Your file has been written");
                });
        });
        });
    }); //takes two arguments, the path to the file and the callback function -> error always first and then data
    console.log("Will read file! This first");
};

// fileSync();
fileAsync();