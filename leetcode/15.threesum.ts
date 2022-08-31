/*
 * @lc app=leetcode.cn id=15 lang=javascript
 *
 * [15] 三数之和
 */
// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
 var threeSum = function(nums: number[]):number[][] {
    const result:number[][] = [], len = nums.length;
    nums = nums.sort((a,b)=>a - b)
    for(let i = 0; i< len ; i++) {
        let left = i + 1;
        let right = len - 1;
        const cNum = nums[i]
        // 最小值大于0，直接返回
        if(cNum > 0){
            return result
        }
        // 当前元素和上一个元素相同则跳过
        if(i > 0 && cNum === nums[i-1]) continue;
        while(left < right){
            const lNum = nums[left], rNum = nums[right], threeSum = cNum + lNum + rNum
            if(threeSum === 0){
                result.push([cNum, lNum, rNum])
                // 跳过相同元素
                while(nums[left+1] === nums[left]) left++
                while(nums[right-1] === nums[right]) right--
                left++
                right--
            }else if(threeSum > 0){
                right--
            }else{
                left++
            }
        }
    }
    return result
};
// @lc code=end

export default threeSum