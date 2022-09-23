### 资料
[jest中文网](https://www.jestjs.cn/docs/using-matchers)

#### 常用语法
真实性断言：
- `toBeNull`
- `toBeUndefined`
- `toBeDefined`
- `toBeTruthy`
- `toBeFalsy`

数字：
- `toBe`
- `toEqual`
- `toBeGreaterThan`
- `toBeGreaterThanOrEqual`
- `toBeLessThan`
- `toBeLessThanOrEqual`
对于浮点数相等，使用 `toBeCloseTo`

字符串：
- `toMath`
```javascript
test('there is no I in team', () => {
  expect('team').not.toMatch(/I/);
});
```

#### 数组
- toContain
- toStrictEqual

#### error
- toThrow

### 异步
- 异步then或async/await中使用expect
expect.assertions(1) 用来验证是否调用了一次断言，来保证一些逻辑一定会被执行
#### 回调
对于异步回调中的判断，可能Jest执行完之后才会真正返回结果。
可以使用done方法，Jest将等待done回调执行完成后再完成测试。可以在done执行之前来完成断言。

--detectOpenHandles可以用来查找Jest 执行完，还未完成处理的handler

### 生命周期
beforeAll、afterAll  、 beforeEach 和 afterEach在最外层对该文件所有case生效，在describe只对当前块内生效。

test.only可以用来单独只执行这个测试用例。

### 模拟函数
擦除函数的时间，捕获对函数的调用和调用中传递的参数，在new实例化时捕获构造函数的实例, 配置函数返回值。

有两种模拟函数的方法：
- 创建一个模拟函数在测试代码中替换使用
- 编写一个手动模拟来覆盖模块依赖项

#### 使用模拟函数
```javascript
const mockCallback = jest.fn(x => 42 + x)
forEach([0,1], mockCallback)
expect(mockCallback.mock.calls.lenth).toBe(2) // 模拟函数调用次数应为2
expect(mockCallback.mock.calls.[0][0]).toBe(0) // 模拟函数第一次调用参数应为0
expect(mockCallback.mock.calls.[1][0]).toBe(1) // 模拟函数第二次调用参数应为1
expect(mockCallback.mock.resuls[0].value).toBe(42) // 第一次调用返回值应为42
```
模拟函数都有.mock属性，包含了函数调用参数和函数返回值相关的数据。
mock.calls 函数调用信息 calls.length即为调用次数
mock.results 函数调用返回值
mock.contexts  调用上下文 

#### 模拟返回值
```javascript
const myMoc = jest.fn()
console.log(myMoc())
// undefined
myMoc.mockReturnValueOnce(10).mockReturnValueOnce('x').mockReturnValue(true);
console.log(myMoc(),myMoc(),myMoc(),myMoc())
// 10, 'x', true, true
```

#### 模拟模块
```javascript
// user.js
import axios from 'axios';
class Users {
  static all() {
    return axios.get('/users.json').then(resp => resp.data);
  }
}
export default Users;
```
使用mockResolvedValue来模拟Promise.resolve，或者mockImplementation来模拟实现
```javascript
import axios from 'axios'
import Users from './users';
jest.mock('axios')
test('should fetch users', () => {
    const users = [{name: 'Bob'}]
    const resp = {data:users}
    axios.get.mockResolvedValue(resp)
    // axios.get.mockImplementation(()=>Promise.resolve(resp))
    return Users.all().then(data => expect(data).toEqual(users))
})
```

还可以传递回调函数到mock来模拟部分实现
```javascript
import defaultExport, {foo, bar} from '../foo-bar-baz'
jest.mock('../foo-bar-baz', () => {
    const originalModule = jest.requireActual('../foo-bar-baz');

    return {
        __esModule: true,
        ...originalModule,
        default: jest.fn(() => 'mocked baz'),
        foo: 'mocked foo'
    }
})
```

#### 模拟实现
模拟实现一个函数
- 直接通过jest.fn
```javascript
const myMockFn = jest.fn(x=>42+x)
```
- 如果要定义从另一个模块创建的模拟函数实现时，可以使用mockImplementation
```javascript
import foo from './foo'
foo.mockImplementation(()=>42)
foo() // 42
```
- 如果需要模拟复杂的函数行为，使多次调用产生的结果不同可以使用 mockImplementationOnce
```javascript
const myMock = 
    jest.fn()
        .mockImplementationOnce(cb=>cb(null,true))
        .mockImplementationOnce(cb=>cb(null,false))
```

- 如果涉及到链式调用的场景，我们可以使用mockReturnThis
- 模拟名称，名称会在测试错误时显示，替代jest.fn()
- 模拟函数自定义匹配器
  - expect(mockFunc).toHaveBeenCalled()
  - expect(mockFunc).toHaveBeenCalledWith(arg1,arg2)
  - expect(mockFunc).toHaveBeenLastCalledWith(arg1,arg2)
  - expect(mockFunc).toMatchSnapshot()

### 快照
如果想确保UI不会发生意外的更改，可以使用快照测试
https://www.jestjs.cn/docs/snapshot-testing


### 
describe进行分组  it代替test