var resume = require('resume-cli/lib/export-resume/index');
var resumeJson = require('./resume.json');

// exportResume(resumeJson, fileName, program)
// console.log(JSON.stringify(resume))
module.exports = resume(resumeJson,'resumesuccess.pdf',{theme:"stackoverflow"},(err,file,format)=>{
    if(err){
        console.log(err)
    }else{
        console.log(`resume created file name is ${file}${format}`)
    }

})
