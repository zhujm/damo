import threeSum from "../leetcode/15.threesum";

test('[0,1,1]不符合条件',()=>{
    expect(threeSum([0,1,1])).toStrictEqual([])
})

test('[0,0,0,0,0]符合条件',()=>{
    expect(threeSum([0,0,0,0,0])).toStrictEqual([[0,0,0]])
})

test('[-1,0,1,2,-1,-4]需要被去重',()=>{
    expect(threeSum([-1,0,1,2,-1,-4])).toStrictEqual([[-1, -1, 2], [-1, 0, 1]])
})
function testTimeout (cb) {
    setTimeout(()=>{
        cb(null, 'aaa')
    },1000)
}
test('回调异步', done => {
    const callback = (error,data) => {
        expect(data).toBe('aaa');
        done()
    }
    testTimeout(callback)
})