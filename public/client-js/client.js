const socket = io()

//const $messages = document.querySelector('#messages')

//const messageTemplate = document.querySelector('#message-template').innerHTML

const {username,room}=Qs.parse(location.search,{ignoreQueryPrefix:true}) //ignoreQueryPrefix to remove ?
//console.log(username,room)
// document.querySelector('#play').addEventListener('click',()=>{
//     console.log('you played')
// })
const $playButton = document.querySelector('#play')
socket.on('untilEveryoneJoin',()=>{
 $playButton.setAttribute('disabled','disabled')
 console.log('Let players Join')
})



socket.on('turn',(id)=>{
    console.log('Your turn',id)
    $playButton.removeAttribute('disabled')
    $playButton.addEventListener('click',()=>{
        socket.emit('played')
        console.log('You played')
        
    })
})

socket.on('waiting',(name)=>{
    $playButton.setAttribute('disabled','disabled')
    console.log(name + ' is playing. Wait for your turn')
})

socket.emit('join',{username,room},(error)=>{
    if(error){
        alert(error)
        location.href='/'
    }
})

