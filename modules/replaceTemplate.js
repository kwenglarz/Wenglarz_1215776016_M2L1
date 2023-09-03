//This imports into index.js file for reusability. If we had more files we needed this code for we could import it there too and it would be applied there as well.
module.exports = (htmlStr, course)=> { //changed to fat arrow function or Lambda
    let output = htmlStr.replace(/{%NAME%}/g, course.courseName);
    output = output.replace(/{%IMAGE%}/g, course.image);
    output = output.replace(/{%FROM%}/g, course.from);
    output = output.replace(/{%INSTRUCTOR%}/g, course.instructor);
    output = output.replace(/{%CREDITS%}/g, course.credits);
    output = output.replace(/{%DESCRIPTION%}/g, course.description);
    output = output.replace(/{%ID%}/g, course.id);
    return output;
}

// For data.json file: (Cannot add comments in JSON file)
// To add more than one data object, use square brackets around braces. Separate objects with comma
