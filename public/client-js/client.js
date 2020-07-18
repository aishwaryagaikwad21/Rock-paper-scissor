const socket = io()

//const $messages = document.querySelector('#messages')

//const messageTemplate = document.querySelector('#message-template').innerHTML

const {username,room}=Qs.parse(location.search,{ignoreQueryPrefix:true}) //ignoreQueryPrefix to remove ?
//console.log(username,room)


socket.on('untilEveryoneJoin',()=>{
 document.getElementById("play").disabled = true
 console.log('Let players Join')
})

socket.on('turn',()=>{
    console.log('Your turn')
    document.getElementById("play").disabled = false
    document.querySelector('#play').addEventListener('click',()=>{
        console.log('You played')
        socket.emit('played')
    })
})

socket.on('waiting',(name)=>{
    document.getElementById("play").disabled = true
    console.log(name + ' is playing. Wait for your turn')
})

socket.emit('join',{username,room},(error)=>{
    if(error){
        alert(error)
        location.href='/'
    }
})

