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
        return {user}
    }
}
module.exports = addUser