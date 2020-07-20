var score = new Array(5).fill(0).map(() => new Array(4).fill(0));
var round = 0
// stone = 7, scissor = 8, paper = 9
//console.log(score)
const rsp = (v) => {
    console.log(v)
    round += 1
    if (round <= 10) { // 6 turns only
        //const v = [p1, p2, p3, p4]
        //console.log(v)
        for (var i = 0; i < 4; i++) {
            var first = v[i]
            for (var j = 0; j < 4; j++) {
                var second = v[j]
                if (i != j) {
                    if (first == 7 && second == 8) {
                        score[i][j] += 1; //stone vs scissor = stone wins, player[i] wins
                    }
                    else if (first == 8 && second == 9) {
                        score[i][j] += 1; //scissor vs paper = scissor wins, player[i] win
                    }
                    else if (first == 9 && second == 7) {
                        score[i][j] += 1; //paper vs stone = paper wins, player[i] win
                    }
                    else {
                        score[i][j] += 0 //if same or losing side then no point
                    }
                }
            }
        }
        //console.log('Scoreboard for round '+ round + ' is ')
        //console.log(score)
        return {score}
    }
    else{
        //console.log('Game over')
        //console.log(score)
        return{final:score}
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

