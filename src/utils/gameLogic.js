var score = new Array(5).fill(0).map(() => new Array(4).fill(0));
var funCount = 0
//console.log(score)
const rsp = function (p1, p2, p3, p4) {
    funCount += 1
    if (funCount <= 3) { // 3 turns only
        const v = [p1, p2, p3, p4]
        //console.log(v)
        for (var i = 0; i < 4; i++) {
            const first = v[i]
            for (var j = 0; j < 4; j++) {
                const second = v[j]
                if (i != j) {
                    if (first == 'a' && second == 'b') {
                        score[i][j] += 1;
                    }
                    else if (first == 'b' && second == 'c') {
                        score[i][j] += 1;
                    }
                    else if (first == 'c' && second == 'a') {
                        score[i][j] += 1;
                    }
                    else {
                        score[i][j] += 0
                    }
                }
            }
        }
        console.log(score)
    }
    else{
        console.log('Game Over')
    }
    
}

//rsp('a','b','a','c');
//rsp('b','c','a','b');
rsp('a', 'a', 'c', 'b');
rsp('c', 'b', 'b', 'a');
rsp('c', 'b', 'b', 'a');
rsp('c', 'b', 'b', 'a');