import findMin from '../leetcode/154.findMin'

describe('寻找旋转数组最小值',() => {
    it('[1,2,3,4,5]最小值为1', () => {
        expect(findMin([1,2,3,4,5])).toBe(1)
    })
    it('[2,3,4,5,1]最小值为1', () => {
        expect(findMin([2,3,4,5,1])).toBe(1)
    })
    it('[1]最小值为1', () => {
        expect(findMin([1])).toBe(1)
    })
    it('[2,3,4,5,6,1]最小值为1', () => {
        expect(findMin([2,3,4,5,6,1])).toBe(1)
    })
    it('[2,2,2,0,1]最小值为0', () => {
        expect(findMin([2,2,2,0,1])).toBe(0)
    })
    it('[3,4,5,1,2]最小值为1',() => {
        expect(findMin([3,4,5,1,2])).toBe(1)
    })
})