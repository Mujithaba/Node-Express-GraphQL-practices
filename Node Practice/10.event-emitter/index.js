const EvenEmitter = require('events')

const evenEmitter = new EvenEmitter()

evenEmitter.on("greet",(name)=>{
    console.log(name)
})

evenEmitter.emit("greet","Mohamed Mujithaba Ep")