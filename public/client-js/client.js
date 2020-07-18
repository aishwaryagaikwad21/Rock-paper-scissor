const socket = io()

const $messages = document.querySelector('#messages')

const messageTemplate = document.querySelector('#message-template').innerHTML

const {username,room}=Qs.parse(location.search,{ignoreQueryPrefix:true}) //ignoreQueryPrefix to remove ?
console.log(username,room)



socket.emit('join',{username,room},(error)=>{
    if(error){
        alert(error)
        location.href='/'
    }
})

