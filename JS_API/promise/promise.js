'use script'
// var P = new Promise(function(resolve,reject){
// 	//在这里执行一些异步操作
// 	 setTimeout(function(){
// 		console.log('执行完成');
// 		//调用resolve方法
// 		resolve('随便说都可以')
// 	},2000);
// })

//封装Promise
function runAsync() {
    var P = new Promise(function(resolve, reject) {
        //在这里执行一些异步操作
        setTimeout(function() {
            console.log('执行完成');
            //调用resolve方法
            //这里就像我们异步回调函数，callback()
            resolve('随便说都可以')
        }, 2000);
    })
    //返回一个promise对象
    return P
}
runAsync();

//promise上的then方法
//拿到我们在runAsync中调用resolve时传的的参数
//能够在runAsync这个异步任务执行完成之后被执行
runAsync().then(function(data) {
    console.log(data);
    //后面可以用传过来的数据做其他操作……

})

//多个异步情况
function runAsync1() {
    var p = new Promise(function(resolve, reject) {
        //做一些异步操作
        setTimeout(function() {
            console.log('异步任务1执行完成');
            resolve('随便什么数据1');
        }, 1000);
    });
    return p;
}

function runAsync2() {
    var p = new Promise(function(resolve, reject) {
        //做一些异步操作
        setTimeout(function() {
            console.log('异步任务2执行完成');
            resolve('随便什么数据2');
        }, 2000);
    });
    return p;
}

function runAsync3() {
    var p = new Promise(function(resolve, reject) {
        //做一些异步操作
        setTimeout(function() {
            console.log('异步任务3执行完成');
            resolve('随便什么数据3');
        }, 2000);
    });
    return p;
}

runAsync1()
    .then(function(data) {
        console.log(data);
        return runAsync2();
    })
    .then(function(data) {
        console.log(data);
        return runAsync3();
    })
    .then(function(data) {
        console.log(data);
    });


//在then方法中，我们也可以直接return数据而不是Promise对象，在后面的then中就可以接收到数据了，
runAsync1()
    .then(function(data) {
        console.log(data);
        return runAsync2();
    })
    .then(function(data) {
        console.log(data);
        return '直接返回数据'; //这里直接返回数据
    })
    .then(function(data) {
        console.log(data);
    });

//promise中的reject方法
//reject的作用就是把Promise的状态置为rejected，这样我们在then中就能捕捉到，然后执行“失败”情况的回调。
function getNumber() {
    var p = new Promise(function(resolve, reject) {
        //做一些异步操作
        setTimeout(function() {
            var num = Math.ceil(Math.random() * 10); //生成1-10的随机数
            if (num <= 5) {
                resolve(num);
            } else {
                reject('数字太大了');
            }
        }, 2000);
    });
    return p;
}

getNumber()
    .then(
        function(data) {
            console.log('resolved');
            console.log(data);
        },
        function(reason, data) {
            console.log('rejected');
            console.log(reason);
            console.log(data)
        }
    );


//效果和写在then的第二个参数里面一样。不过它还有另外一个作用：在执行resolve的回调（也就是上面then中的第一个参数）时，如果抛出异常了（代码出错了），那么并不会报错卡死js，而是会进到这个catch方法中。请看下面的代码：
getNumber()
    .then(function(data) {
        console.log('resolved');
        console.log(data);
        console.log(somedata); //此处的somedata未定义
    })
    .catch(function(reason) {
        console.log('rejected');
        console.log(reason);
    });
//这里somedata未定义，但并没有影响程序的执行
//控制台输出如下
//resolved
//promise.js:133 2
//promise.js:137 rejected
//promise.js:138 ReferenceError: somedata is not defined
//错误提示    at promise.js:134

//all的用法
//Promise的all方法提供了并行执行异步操作的能力，并且在所有异步操作执行完后才执行回调。我们仍旧使用上面定义好的runAsync1、runAsync2、runAsync3这三个函数，看下面的例子：
//会以数组的形式返回结果
Promise
    .all([runAsync1(), runAsync2(), runAsync3()])
    .then(function(results) {
        console.log(results);
    });

// race的用法
//all方法的效果实际上是「谁跑的慢，以谁为准执行回调」，那么相对的就有另一个方法「谁跑的快，以谁为准执行回调」，这就是race方法，这个词本来就是赛跑的意思。race的用法与all一样，我们把上面runAsync1的延时改为1秒来看一下：
Promise
    .race([runAsync1(), runAsync2(), runAsync3()])
    .then(function(results) {
        console.log(results);
    });