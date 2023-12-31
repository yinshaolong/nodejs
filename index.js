const fs = require('fs'); //gives access to the file system
const http = require('http'); // gives networking capabilities i.e. building a n http server
const url = require('url');


/*******################### FILES ###################*********/

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
        if (err) return console.log("ERROR! 💥");
        fs.readFile(`./txt/${file_content}.txt`, "utf-8", (err, data) => {
            console.log(data);
            
            fs.readFile(`./txt/append.txt`, "utf-8", (err, data2) => {
                console.log(data2)
                //nested another readFile and a writeFile inside that has access to data and data2
                fs.writeFile("./txt/final.txt", `${data}\n${data2}`, "utf-8", err => {
                    console.log("Your file has been written");
                });
            });
        });
    }); //takes two arguments, the path to the file and the callback function -> error always first and then data
    console.log("Will read file! This first");
};

/*******################### SERVER ###################*********/


const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8'); //executed only once so can be synchronous
const jsonDataObject = JSON.parse(data);



const server = http.createServer((request, response)=>{  //takes callback function that is called every time there is a new request to the server
    // console.log(request); //gives list of info about the request -> headers, url, method, etc.
    console.log(request.url); //prints out the url that was requested i.e. / -> good for determining an id like /product?id=1234&abc=1234

    const pathName = request.url;
    if (pathName === '/' || pathName === '/overview'){
        response.end("This is the OVERVIEW");
    }
    
    else if (pathName === '/product'){
        response.end("This is the PRODUCT");
    }
    
    else if(pathName === '/api'){
            console.log(jsonDataObject);

            response.writeHead(200, { //status code 200 -> okay
            
                'Content-type': "application/json" //specifies the type of content that is being sent back -> json
            })
            response.end(data); //end needs a STRING so sending data, not json product
    }
    
    else{
        response.writeHead(404, { 
            'Content-type':"text/html", //specifies the type of content that is being sent back -> html
            'my-own-header': 'hello-world'
        });
        response.end("<h1>Page not found!</h1>"); //MUST ALWAYS be after the content-type and header
    }
})


server.listen(8000, '127.0.0.1', () =>{ //starts the server and listens to incoming requests -> takes port, host (in this case the local host), callback function
    console.log("Listening to requests on port 8000"); //goes to the terminal
})


// fileSync();
// fileAsync(); 