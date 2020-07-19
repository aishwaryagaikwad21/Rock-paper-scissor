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

socket.on('initial',()=>{
    $playButton.setAttribute('disabled','disabled')
    console.log('Game about to start')
})

socket.on('canStart',()=>{
    console.log('Game can be started')
    socket.emit('play') //client acknowledgement
})


socket.on('turn',(name)=>{
    console.log(name  + ' turn ')
    $playButton.removeAttribute('disabled')
    $playButton.addEventListener('click',()=>{
        socket.emit('played')
        console.log('You played')
        $playButton.setAttribute('disabled','disabled')
    })
})

socket.on('waiting',()=>{
    $playButton.setAttribute('disabled','disabled')
    console.log( 'Wait for your turn')
})

socket.emit('join',{username,room},(error)=>{
    if(error){
        alert(error)
        location.href='/'
    }
})

