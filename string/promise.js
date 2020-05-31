function afterTwoSec() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve('resolved');
        }, 2000);
    });
}

async function asyncFuncCall() {
    console.log(5);
    let results = await afterTwoSec();
    console.log(results)
}

// asyncFuncCall();



//Promise
var resolveAfter2Seconds = function () {
    console.log("starting slow promise");
    return new Promise(resolve => {
        setTimeout(function () {
            resolve("slow");
            console.log("slow promise is done");
        }, 2000);
    });
};

var resolveAfter1Second = function () {
    console.log("starting fast promise");
    return new Promise(resolve => {
        setTimeout(function () {
            resolve("fast");
            console.log("fast promise is done");
        }, 1000);
    });
};

var sequentialStart = async function () {
    console.log('==SEQUENTIAL START==');

    // 1. Execution gets here almost instantly
    const slow = await resolveAfter2Seconds();
    console.log(slow); // 2. this runs 2 seconds after 1.

    const fast = await resolveAfter1Second();
    console.log(fast); // 3. this runs 3 seconds after 1.
}

var concurrentStart = async function () {
    console.log('==CONCURRENT START with await==');
    const slow = resolveAfter2Seconds(); // starts timer immediately
    const fast = resolveAfter1Second(); // starts timer immediately

    // 1. Execution gets here almost instantly
    console.log(await slow); // 2. this runs 2 seconds after 1.
    console.log(await fast); // 3. this runs 2 seconds after 1., immediately after 2., since fast is already resolved
}

var concurrentPromise = function () {
    console.log('==CONCURRENT START with Promise.all==');
    return Promise.all([resolveAfter2Seconds(), resolveAfter1Second()]).then((messages) => {
      
        console.log(messages[0]); // slow
        console.log(messages[1]); // fast
    });
}

var parallel = async function () {
    console.log('==PARALLEL with await Promise.all==');

    // Start 2 "jobs" in parallel and wait for both of them to complete
    await Promise.all([
        (async () => console.log(await resolveAfter2Seconds()))(),
        (async () => console.log(await resolveAfter1Second()))()
    ]);
}

// This function does not handle errors. See warning below!
var parallelPromise = function () {
    console.log('==PARALLEL with Promise.then==');
    resolveAfter2Seconds().then((message) => console.log(message));
    resolveAfter1Second().then((message) => console.log(message));
}

// sequentialStart(); // after 2 seconds, logs "slow", then after 1 more second, "fast"

// // wait above to finish
// setTimeout(concurrentStart, 4000); // after 2 seconds, logs "slow" and then "fast"

// // wait again
// setTimeout(concurrentPromise, 7000); // same as concurrentStart

// // wait again
// setTimeout(parallel, 10000); // truly parallel: after 1 second, logs "fast", then after 1 more second, "slow"

// // wait again
// setTimeout(parallelPromise, 13000); // same as parallel


/**
 * Promise同步和异步解耦
 */
'use strict';

var promiseCount = 0;
function testPromise() {

    let thisPromiseCount = promiseCount++;

    let log = document.getElementById('log');

    log.insertAdjacentHTML('beforeend', ++thisPromiseCount +
        ') 开始 (<small>同步代码开始</small>)<br/>');

    // 新构建一个 Promise 实例：使用Promise实现每过一段时间给计数器加一的过程，每段时间间隔为1~3秒不等
    let p1 = new Promise(
        // resolver 函数在 Promise 成功或失败时都可能被调用
        (resolve, reject) => {
            log.insertAdjacentHTML('beforeend', thisPromiseCount +
                ') Promise 开始 (<small>异步代码开始</small>)<br/>');
            // 创建一个异步调用
            console.log('start')
            window.setTimeout(
                function () {
                    // 填充 Promise
                    resolve(thisPromiseCount + 1);
                }, 4000);
        }
    );

    // Promise 不论成功或失败都会调用 then
    // catch() 只有当 promise 失败时才会调用

    p1.then(
        // 记录填充值
        function (val) {
            log.insertAdjacentHTML('beforeend', val +
                ') Promise 已填充完毕 (<small>异步代码结束</small>)<br/>');
        })
        .catch(
            // 记录失败原因
            (reason) => {
                console.log('处理失败的 promise (' + reason + ')');
            });

    log.insertAdjacentHTML('beforeend', thisPromiseCount +
        ') Promise made (<small>同步代码结束</small>)<br/>');
}

//用sleep来模仿浏览器的AJAX请求
function sleep(wait) {
    return new Promise((res,rej) => {
        setTimeout(() => {
            res(wait);
        },wait);
    });
}

let p1 = sleep(500);
let p2 = sleep(500);
let p3 = sleep(1000);

Promise.all([p1,p2,p3]).then(result => {
    console.log('resultAll'+result);
    console.log(result)
    //.....
    //loading
});


//圆形div做一个红绿灯，绿色3秒，黄色1秒，红色2秒循环改变背景色。

function changeColor(duration) {
    return new Promise(resolve => {
         setTimeout(resolve, duration);
    }
    )
}

async function colorful(duration,color){
    await changeColor(duration);
   let aa = document.getElementById('Circle')
   aa.style.background = color;
}

async function wakeup(){
    while(true){
        console.log(555)
        await colorful(1000,'green');
        await colorful(1000,'yellow');
        await colorful(1000,'red');
        await wakeup();

    }
}
