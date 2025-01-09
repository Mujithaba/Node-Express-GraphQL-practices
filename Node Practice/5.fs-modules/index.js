const { ifError } = require("assert");
const { error } = require("console");
const fs = require("fs");
const path=require("path");


const dataFolder = path.join(__dirname,"data")

if (!fs.existsSync(dataFolder)) {
    fs.mkdirSync(dataFolder)
    console.log(" folder is created");
}

//synchronous way file created 
const filePath = path.join(dataFolder,"SyncExampleFile.txt")
fs.writeFileSync(filePath,"Hello Synchronous file data")
console.log("synchronous file is created in the data folder");
//read sync file 
const readSyncFileContent = fs.readFileSync(filePath,"utf8")
console.log("Read SyncFile Content:",readSyncFileContent);
//updated or add new line of content to the existing page
fs.appendFileSync(filePath,"\n add some content to sync file ")
console.log("file updated");
const updatedFIle = fs.readFileSync(filePath,"utf8")
console.log("Read updatedFIle SyncFile Content:",updatedFIle);

//asynchronous file  creation
const AsynFilePath = path.join(dataFolder,"AsyncFileExample.txt")
fs.writeFile(AsynFilePath,"Hello Async file path contents",(err)=>{
    if(err) throw err;
    console.log("Async file  created ");

    fs.readFile(AsynFilePath,"utf8",(err,data)=>{
        if(err) throw err
        console.log("read the async file data:",  data)
    })

    fs.appendFile(AsynFilePath,"\n update async file data content and new line is added for that",(err)=>{
        if(err) throw err
        console.log("new line added to the existing  async file ");
        
    })

    // updated file read 
    fs.readFile(AsynFilePath,"utf8",(err,data)=>{
        if(err) console.log(err);
        console.log("readUpdated async file:",data)
        
    })
})


