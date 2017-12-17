(function IIFE(){

	var foo = (x) => {
		var y = x * 2;

		return function bar(z) {
			if (z.length > 3) {
				return z.map( (v) => (v > 3) ? v + y : this( v * 4 ));
			}
			else {
				var obj = [];

				setTimeout( () => {
					obj.length = 1;
					obj[0] = this.w;
				}, 100 );

				return obj;
			}
		};
	}

	var p = foo( 2 );
	var list1 = [1,3,4];
	var list2 = list1.concat( 6 );

	list1 = p.call( { w: 42 }, list1 );
	list2 = p( list2 );

	setTimeout( () => console.log( list1[0] === list2.reduce( (s,v) => s + v, 0 ) ), 200 );
})();
