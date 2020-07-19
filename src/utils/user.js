const users = []
var count=0
const addUser = ({id,username,room}) =>{
    if(count>3){
        //console.log('Room is full')
        return{
            error:'Room is full'
        }
        
    }
    else{
        username = username.trim().toLowerCase()
        const user = {id,username,room}
        users.push(user)
        count+=1
        //console.log(users[0].room)
        return {user}
    }
}

const getRoom = ()=>{
    const room = users[0].room
    return {room}
}
module.exports = {addUser,getRoom}