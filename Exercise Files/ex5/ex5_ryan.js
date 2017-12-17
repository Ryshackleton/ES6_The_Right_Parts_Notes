var numbers = (start = 0, end = 100, multiple = 1) => ({
	*[Symbol.iterator]() {
		for(let idx = start; idx<=end; idx+=multiple) {
			yield this.values[idx];
		}
	},
	values: Array(101).fill(1).map((_, i) => i),
	start,
	end,
	multiple,
});

// should print 0..100 by 1s
for (let num of numbers()) {
	console.log(num);
}

// should print 6..30 by 4s
for (let num of numbers(6, 30, 4)) {
	console.log(num);
}


// better version no storage (duh), object destructuring in arguments, calling Symbol.iterator from the outer for...of
var numbers = {
  *[Symbol.iterator]({
		start = 0,
		end = 100,
		step = 1 } = {}) {
      for (let idx = start; idx <= end; idx += step) {
        yield idx;
      }
  	}
};

for (let num of numbers[Symbol.iterator]() ){
  console.log(num);
}

for (let num of numbers[Symbol.iterator]({
  start: 6,
  step: 4,
  end: 30, })
	){
  console.log(num);
}
