function myFunction() {
    var message, x;
    message = document.getElementById("message");
    message.innerHTML = "";
    x = document.getElementById("demo").value;
    try { 
        if(x == "")  throw "为空";
        if(isNaN(x)) throw "不是一个数字";
        if(x > 10)   throw "太大了";
        if(x < 5)    throw "太小了";
    }
    catch(err) {
        message.innerHTML = "输入的值 " + err;
    }
    finally{
       console.log('不管有没有异常，最后都会执行 finally')
    }
}