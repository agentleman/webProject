console.log('1');

setTimeout(() => {
    console.log('2');
    process.nextTick(() => {
        console.log('3');
    })
    setTimeout(() => {
        console.log('13')
        new Promise((resolve) => {
            console.log('11');
            resolve();
        }).then(() => {
            console.log('12')
        })
    })
    new Promise((resolve) => {
        console.log('4');
        resolve();
    }).then(() => {
        console.log('5')
    })
})

process.nextTick(() => {
    console.log('6');
})

new Promise((resolve) => {
    console.log('7');
    resolve();
}).then(() => {
    console.log('8')
    setTimeout(() => {
        console.log('9')
    })
})

console.log('10')

// 1 7 10 6 8  2 4 3 5   13 11 12 










console.log('1');           

setTimeout(function() {  //宏任务A1
    console.log('2');
    process.nextTick(function() {  //微任务B1
        console.log('3');
    })
    new Promise(function(resolve) { //微任务B2
        console.log('4');
        resolve();
    }).then(function() {           //微任务B3
        console.log('5')
    })
})
process.nextTick(function() { //微任务A1
    console.log('6');
})
new Promise(function(resolve) { //微任务 A2
    console.log('7');
    resolve();
}).then(function() { //微任务 A3
    console.log('8')
})

setTimeout(function() { //宏任务A2
    console.log('9');
    process.nextTick(function() { //微任务B4
        console.log('10');
    })
    new Promise(function(resolve) { //微任务 B5
        console.log('11');
        resolve();
    }).then(function() {   //微任务B6
        console.log('12')
    })
})

//  1 7 6 8  2 4 3 5  9 11 10 12
//从代码运行开始，开始第一次循环，执行所有的微任务，然后再从宏任务开始，找到其中一个任务队列执行完毕，在执行所有的微任务，
//每一次循环都把宏任务放到宏任务等待队列中，把微任务放到微任务等待队列中，下一次循环还是先执行微任务 后执行宏任务；
//每一次新分发生成的任务都按照顺序形成新的队列，下一次执行按照分发的顺序执行。进行又一次循环。
//在异步任务队列中又细分了宏任务和微任务，优先执行微任务。
//执行和运行有很大的区别，javascript在不同的环境下，比如node，浏览器，Ringo等等，执行方式是不同的。而运行大多指javascript解析引擎，是统一的。