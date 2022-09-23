// [2,2,2,0,1] 0 5  2 2+5 = 7  7/2 = 3.5  3
let minArray = function(numbers: number[]) {
    let left = 0,right = numbers.length-1
    if(right === 0){
        return numbers[0]
    }
    while(left < right){
        const middle = Math.floor((right + left) / 2)
        if(numbers[middle] < numbers[middle-1]){
            return numbers[middle]
        }
        if(numbers[middle] > numbers[right] ){
            left = middle + 1
        }else if(numbers[middle] < numbers[right]){
            right = middle
        }else if(numbers[middle] === numbers[right]){
            right--
        }
        return numbers[left]
    }
};

console.log(minArray([3,1,1,1]))
console.log(minArray([3,3,1]))
console.log(minArray([3,1,1]))
console.log(minArray([1,2,3,4,5]))
console.log(minArray([1]))
console.log(minArray([2,3,4,5,1]))
console.log(minArray([2,3,4,5,6,1]))
console.log(minArray([2,2,2,0,1]))
console.log(minArray([3,4,5,1,2]))
export default minArray