var score = new Array(5).fill(0).map(() => new Array(4).fill(0));
var round = 0
//a = stone = 7, b = scissor = 8, c = paper = 9
//console.log(score)
const rsp = function (v) {
    round += 1
    if (round <= 4) { // 6 turns only
        //const v = [p1, p2, p3, p4]
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
        console.log('Scoreboard for round '+ round + ' is ')
        console.log(score)
        return {score}
    }
    else{
        //console.log('Game over')
        console.log(score)
        const final = score
        
        return{final}
    }
    
}

module.exports = rsp
//a=7,b=8,c=9
//rsp('a','b','a','c');
//rsp('b','c','a','b');
//  rsp([7, 7, 9, 8]);
//  rsp([9, 8, 8, ]);
//  rsp([9, 8, 8, 7]);
//  rsp([9, 8, 8, 7]);

//  rsp([9, 8, 8, 7]);
//  rsp([9, 8, 8, 7]);

