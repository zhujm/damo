const tree =  {
    value: 1,
    children: [
        {
            value: 2,
            children: [
                {
                    value: 4,
                    children: [
                        {
                            value: 8,
                            children: []
                        }
                    ]
                },{
                    value: 5,
                    children: [
                        {
                            value: 9,
                            children: []
                        }
                    ]
                }
            ]
        },{
            value: 3,
            children: [
                {
                    value: 6,
                    children: []
                },{
                    value: 7,
                    children: []
                }
            ]
        }
    ]
}

console.log('-------深度优先--------')
function getResult(tree){
    console.log(tree.value)
    tree.children?.forEach(item=>{
        getResult(item)
    })
}
getResult(tree)

function getResult2(tree){
    let arr = [tree.value]
    tree.children?.forEach(item=>{
        arr = arr.concat(getResult2(item))
    })
    return arr
}
console.log(getResult2(tree))

console.log('-------广度优先--------')
function getResult3(tree){
    const list = [tree]
    while(list.length){
        const current = list.shift()
        console.log(current.value)
        current.children.forEach(item=>list.push(item))
    }
}
getResult3(tree)

function getResult4(tree){
    const list = [tree]
    list.forEach(item=>{
        console.log(item.value)
        item.children.forEach(subItem=>getResult4(subItem))
    })
}
getResult4(tree)
