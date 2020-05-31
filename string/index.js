// import {
// 	strTest
// } from './string.js';

let aaa = 'dsfsdf';
let bbb = new String('ddddd')
function typeOfStr(obj) {
	if (typeof obj === 'string') {
		console.log('字符串');
	}
	console.log(obj instanceof String);
	console.log(bbb instanceof String);
	console.log(obj.constructor === String)
	console.log(bbb.constructor === String)
	console.log(obj.__proto__ == String)
	console.log(bbb.__proto__ === String)

}
let url = 'dsfsdf?sdf=df&df=6666'
function getParam(obj) {
	if (obj.indexOf('?') > 0) {
		let one = obj.split('?')[1];
		let patams = one.split('&');
		let objP = {};

		for (let i = 0; i < patams.length; i++) {
			let paramsKey = patams[i].split('=');
			objP[paramsKey[0]] = paramsKey[1];
		}
		// console.log(objP)
		return objP;
	} else {
		return '';
	}
}

class hero {
	constructor(name, age, size) {
		this.name = name,
			this.age = age,
			this.size = size

	}
	print() {
		console.log(this.age)
	}
}

let person = new hero('a', 3, 8);

function showInfo($) {
	console.log($.value)
}

//this使用场景
function thisYongfa() {
	var numbers = [5, 458, 120, -215];
	var maxInNumbers = Math.max.apply(this, numbers);
	console.log(maxInNumbers);  // 458
	var maxInNumbers = Math.max.call(this, 5, 458, 120, -215);
	console.log(maxInNumbers);  // 458
}

//对象的原型继承
function teacher(name) {
	this.name = name;
	console.log(this)
}
teacher.prototype.sayName = function () {
	console.log('name is ' + this.name)
}
let teacher1 = new teacher('xiaoming');
function student(name) {
	this.name = name;
}

student.prototype = new teacher();
let student1 = new student('lisi');

//call apply 的继承实现
function teacher2(name, age) {
	this.name = name;
	this.age = age;
	this.sayHi = function () {
		alert('name:' + name + ',  age:' + age)
	}
}
function student2() {
	let arg = arguments;
	teacher2.call(this, arg[0], arg[1]);
	console.log(this)
}

let teacher3 = new teacher2('aaa', 88);
let student3 = new student2('bbb', 22);
function sayHi() {
	teacher3.sayHi();
	student3.sayHi();
}

//计算字符串中出现次数最多的字符
function strMaxTimes() {
	var str = 'asdfssaaasasasasaa';
	var json = {};
	for (var i = 0; i < str.length; i++) {
		if (!json[str.charAt(i)]) {
			json[str.charAt(i)] = 1;
		} else {
			json[str.charAt(i)]++;
		}
	};
	var iMax = 0;
	var iIndex = '';
	for (var i in json) {
		if (json[i] > iMax) {
			iMax = json[i];
			iIndex = i;
		}
	}
	console.log('出现次数最多的是:' + iIndex + '出现' + iMax + '次');
}

//去掉一个数组的重复元素
/**
 * 1，遍历push到新数组
 * 2，includes判断-》push到新数组
 * 3，filter方法
 * 4，set方法
 */
let arrchFu = ['a', 'v', 'd', 'd', 'f', 'v', 'vs', 'v', 'vs', 'ss', 'f'];
function delMore(obj) {
	let newarr = [];
	for (let i = 0; i < obj.length; i++) {
		if (newarr.indexOf(obj[i]) < 0) {
			newarr.push(obj[i])
		}
	}
	console.log(newarr)
}
function includeMore(arr) {
	let newArr = []
	for (let i = 0; i < arr.length; i++) {
		if (!newArr.includes(arr[i])) {
			newArr.push(arr[i])
		}
	}
	console.log(newArr)
}
function setMore(obj) {
	let newArr = new Set();
	let resArr =new Set(obj);
	console.log(resArr)
}
function filter(obj){
	let newArrs= obj.filter(
		function(item,index,thisArr){
			 return thisArr.indexOf(item) === index;
	})
	console.log('newArrs'+newArrs)
}


//instanceof 的实现函数

function instace(leftObj,rightObj){
	let L = leftObj.prototype;
	let R = rightObj.__proto__;
	while (true){
		if(L === null){
			return false
		}
		if(L === O){
			return true
		}
		L = L.prototype;
	}
}

function aaa (){
	
}

