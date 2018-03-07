var scores1= [90, 98, 89, 100, 100, 86, 94];
var scores2 = [40, 65, 77, 82, 80, 54, 73, 63, 95, 49];


console.log(average(scores1));
console.log(average(scores2));

function average (scores){
    var total = 0;
    for(var i = 0; i < scores.length; i++) {
        total += scores[i];
    }
    var avg = total / scores.length;
    return(Math.round(avg));
}