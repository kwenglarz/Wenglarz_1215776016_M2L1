const httpServer = require('http');
const url = require('url');
const fs = require('fs');

const replaceTemplate = require('./modules/replaceTemplate'); //imports replaceTemplate module to add reusability to code

/// Read data from file
// template
const tempCourse = fs.readFileSync(
    `${__dirname}/data/data.json`, //reads data from data.json file
    'utf-8'
);

////////////////////////////////
// Template
const templateHTMLCourse = fs.readFileSync(
    `${__dirname}/template/templateCourse-1.html`, //receives template from html file
    'utf-8'
);
// function replaceTemplate(htmlStr, course){ // origninal function
// const replaceTemplate = (htmlStr, course)=> { //changed to fat arrow function or Lambda
//     let output = htmlStr.replace(/{%NAME%}/g, course.courseName);
//     output = output.replace(/{%IMAGE%}/g, course.image);
//     output = output.replace(/{%FROM%}/g, course.from);
//     output = output.replace(/{%INSTRUCTOR%}/g, course.instructor);
//     output = output.replace(/{%CREDITS%}/g, course.credits);
//     output = output.replace(/{%DESCRIPTION%}/g, course.description);
//     output = output.replace(/{%ID%}/g, course.id);
//     return output;
// }

const dataObj = JSON.parse(tempCourse); // string to JavaScript Object JSON


////////////////////////////////
// Create server
// const server = httpServer.createServer(function (req, res) { // call back function
const server = httpServer.createServer( (req, res) => { // change to fat arrow function

    
    // const urlParameter = url.parse(req.url, true);
    // console.log(urlParameter.query);
    // console.log(urlParameter.pathname); //went from 3 lines of code to just 1 using object destructor. Refactoring like this allows us to condense code for efficiency. 

    const {query, pathname} = url.parse(req.url, true); //object destructor

    if(query.id){// if there is query parameter named id read as string
        // Course page
        if (pathname === '/' || pathname.toLowerCase() === '/courses') { //=== equal in value and type, use this for actual equality comparison
            res.writeHead(200, { // Everything ran successfully
                'Content-type': 'text/html'
            });
            const course = dataObj[Number(query.id)]; //convert string to numeric value
            const strCourseName = JSON.stringify(course);
            const courseHTML = replaceTemplate(templateHTMLCourse, course); // function that will replace the course values in the HTML
            // res.end(` We recieved our first request from the client at resource ${urlParameter.pathname.toLowerCase()} with query parameter ${urlParameter.query.id}
            // ${JSON.stringify(course)} //convert object back to string
            // `) 
            res.end(courseHTML);
        }
        else {
            res.writeHead(404, { // Server did not find what you were looking for
                'Content-type': 'text/html'
            });
            res.end('resource not found')
        }   
    }
});




// Start listening to requests 
server.listen(8000, 'localhost', ()=> { //changed to fat arrow function
    console.log('Listening to requests on port 8000');
});