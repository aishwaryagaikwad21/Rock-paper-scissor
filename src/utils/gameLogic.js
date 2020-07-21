var score = new Array(5).fill(0).map(() => new Array(4).fill(0));
var round = 0
// Consider values of stone paper and scissor as 
//stone = 7, scissor = 8, paper = 9
var rsp = () => {
    round+=1
    var v = []
    for(i=0;i<4;i++){
        //generating random value for every player out of stone = 7 scissor = 8 paper = 9
        v[i] = Math.floor(Math.random() * 3) + 7;
    }
    console.log(v)
    for (var i = 0; i < 4; i++){
            var first = v[i]
            for (var j = 0; j < 4; j++){
                var second = v[j]
                if (i != j) {
                    if ((first == 7 && second == 8)||(first == 8 && second == 7)) {
                        score[i][j] += 1; //stone vs scissor = stone wins, player[i] wins
                    }
                    else if ((first == 8 && second == 9)||(first == 9 && second == 8)) {
                        score[i][j] += 1; //scissor vs paper = scissor wins, player[i] win
                    }
                    else if ((first == 9 && second == 7)||(first == 7 && second== 9)) {
                        score[i][j] += 1; //paper vs stone = paper wins, player[i] win
                    }
                    else {
                        score[i][j] += 0 //if same or losing side then no point
                    }
                }
            }
        }
        var arr = {round,score}
        return {arr}
}

module.exports = rsp


