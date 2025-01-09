function delayFn(timer){
    return new Promise((resolve)=> setTimeout(resolve,timer))
}

console.log("started function");

delayFn().then(()=>console.log("after 2 sec completed the promise"))
console.log("end promise and fun");
