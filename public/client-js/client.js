const socket = io()
const {username,room}=Qs.parse(location.search,{ignoreQueryPrefix:true}) //ignoreQueryPrefix to remove ?

const $playButton = document.querySelector('#play')

socket.on('untilEveryoneJoin',()=>{
 $playButton.setAttribute('disabled','disabled')
 console.log('Let players Join')
})

socket.on('newUser',()=>{
    console.log('A new user has joined')
})

socket.on('allHaveJoined',()=>{
    console.log('All have joined')
})

socket.on('initial',()=>{
    $playButton.setAttribute('disabled','disabled')
    console.log('Game about to start')
})

socket.on('canStart',()=>{
    console.log('Game can be started')
    socket.emit('play') //client acknowledgement
})

socket.on('nextRound',()=>{
    //$playButton.setAttribute('disabled','disabled')
    console.log('Next Round')
    socket.emit('play')
})


socket.on('turn',(name)=>{
    console.log(name  + ' turn ')
    $playButton.removeAttribute('disabled')
    $playButton.addEventListener('click',()=>{
        socket.emit('played')
        console.log('You played')
        //$playButton.setAttribute('disabled','disabled')
    })
})

socket.on('waiting',(name)=>{
    $playButton.setAttribute('disabled','disabled')
    console.log( name + ' is playing. Wait for your turn')
})

socket.emit('join',{username,room},(error)=>{
    if(error){
        alert(error)
        location.href='/'
    }
})

socket.on('gameOver',()=>{
    window.location = "score.html"
})

