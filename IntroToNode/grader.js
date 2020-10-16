function average(arr){
    // add all scores together
    var total = 0;
    arr.forEach(function(score){
        total += score;
    });
    // divid by total Number
    total /= arr.length;
    // round
    return Math.round(total);
}

console.log("Average Score:");
var scores = [90, 98, 89, 100, 100, 86, 94];
console.log(average(scores));