const score = new Array(5).fill(0).map(() => new Array(4).fill(0));
console.log(score)
function rsp(p1,p2,p3,p4){
    const v = [p1,p2,p3,p4]
    //console.log(v)
    for(var i=0; i<4; i++){
        const first = v[i]
        for(var j=0; j<4; j++){
            const second = v[j]
            if(i!=j){
                if(first=='a' && second=='b'){
                    score[i][j]+=1;
                }
                else if(first=='b' && second=='c'){
                    score[i][j]+=1;
                }
                else if(first=='c' && second=='a'){
                    score[i][j]+=1;
                }
                else{
                    score[i][j]+=0
                }
            }
        }
    }
    console.log(score)
}

rsp('a','b','a','c');
rsp('b','c','a','b');