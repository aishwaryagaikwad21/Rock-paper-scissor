var score = new Array(5).fill(0).map(() => new Array(4).fill(0));
var funCount = 0
//a = stone = 7, b = scissor = 8, c = paper = 9
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
                    if (first == 7 && second == 8) {
                        score[i][j] += 1;
                    }
                    else if (first == 8 && second == 9) {
                        score[i][j] += 1;
                    }
                    else if (first == 9 && second == 7) {
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
//a=7,b=8,c=9
//rsp('a','b','a','c');
//rsp('b','c','a','b');
rsp(7, 7, 9, 8);
rsp(9, 8, 8, 7);
rsp(9, 8, 8, 7);
rsp(9, 8, 8, 7);

