const fs = require("fs")

function person(name,callbackFn){
    console.log(name);

    callbackFn()
}

function address(){
    console.log("India");
}


person("Mujithaba",address)


fs.readFile('input.txt',"utf8",(err,data)=>{
    if(err){
        console.log(err);
        return
    }
    console.log(data)

    fs.writeFile('output.txt',"this is the concepts of async in the callback hell",(err)=>{
     if (err) {
        console.log(err);
        return
     }
     console.log("successfully created output.txt");

     
     fs.readFile('output.txt',"utf8",(err,data)=>{
        if (err) {
            console.log(err);
            return
         }
         console.log(data)
     })

    })


})
