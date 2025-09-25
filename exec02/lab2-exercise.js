// Exercise 1: ES6 Syntax
const gretter = (myArray, counter) => {
	const greetText = 'Hello';
	for (const name of myArray) {
		console.log(`${greetText} ${name}`);
	}
};

gretter(['Randy Savage', 'Ric Flair', 'Hulk Hogan'], 3);

// Exercise 2: Capitalize first letter using destructuring and spread
const capitalize = (str) => {
	const [first, ...rest] = str;
	return first.toUpperCase() + rest.join('');
};

console.log(capitalize('fooBar'));
console.log(capitalize('nodeJs'));

// Exercise 3: Capitalize colors using map
const colors = ['red', 'green', 'blue'];
const capitalizedColors = colors.map(capitalize);
console.log(capitalizedColors); // ['Red', 'Green', 'Blue']

// Exercise 4: Filter values less than 20 using filter
const values = [1, 60, 34, 30, 20, 5];
const filterLessThan20 = values.filter(value => value < 20);
console.log(filterLessThan20); // [1, 5]

// Exercise 5: Calculate sum and product using reduce
const array = [1, 2, 3, 4];
const calculateSum = array.reduce((acc, curr) => acc + curr, 0);
const calculateProduct = array.reduce((acc, curr) => acc * curr, 1);
console.log(calculateSum); // 10
console.log(calculateProduct); // 24

// Exercise 6: ES6 class and subclass
class Car {
	constructor(model, year) {
		this.model = model;
		this.year = year;
	}
	details() {
		return `Model: ${this.model} Engine ${this.year}`;
	}
}

class Sedan extends Car {
	constructor(model, year, balance) {
		super(model, year);
		this.balance = balance;
	}
	info() {
		return `${this.model} SD has a balance of $${this.balance.toFixed(2)}`;
	}
}

const car2 = new Car('Pontiac Firebird', 1976);
console.log(car2.details());

const sedan = new Sedan('Volvo SD', 2018, 30000);
console.log(sedan.info());
