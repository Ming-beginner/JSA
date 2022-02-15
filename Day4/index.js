//Bài 1:

const getStudentInformation = (name, age, address) => ({
  name,
  age,
  address,
});

let name = 'Minh';
let age = 14;
let address = 'Ha Noi';

console.log('Bài 1:', getStudentInformation(name, age, address));

//Bài 2:

const smartPhones = [
  { name: 'iphone', price: 649 },
  { name: 'Galaxy S6', price: 576 },
  { name: 'Galaxy Note 5', price: 489 },
];

const getPrice = (priceList) => {
  let result = [];
  for (let item of priceList) {
    result.push(item.price);
  }
  return result;
};

console.log('Bài 2: ', getPrice(smartPhones));

//Bài 3:

/* function foo(x,y,z) {
	console.log( x, y, z );
}
function foo () {
	alert(‘Hello’)
}
function foo (a,b){
	let m = a+b*100
	return m
} */

let foo = (x, y, z) => console.log(x, y, z);
let foo = () => alert('Hello');
let foo = (a, b) => {
  let m = a + b * 100;
  return m;
};
