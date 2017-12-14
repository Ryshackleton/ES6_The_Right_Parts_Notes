# Destructuring

## Array Destructuring

1. Imperative way of destructuring
    ```javascript
    function foo() {
        return [1, 2, 3];
    }

    var tmp = foo();
    var a = tmp[0];
    var b = tmp[1];
    var c = tmp[2];
    ```

2. Declarative way of destructuring:
    ```javascript
    function foo() {
        return [1, 2, 3];
    }

    var [
        a,
        b,
        c
    ] = foo();
    ```
## Default values and destructuring
1. very simple to define default values:
    ```javascript
    function foo() {
        return [1, 2, 3];
    }

    var [
        a,
        b = 42,
        c
    ] = foo();
    ```
1. With null checking of the destructured array
    ```javascript
    function foo() {
        return null;
    }

    var [
        a,
        b = 42,
        c
    ] = foo() || [];
    ```
1. To gather up extra parameters
    ```javascript
    function foo() {
        return [1, 2, 3, 4, 5, 6, 7];
    }

    var [
        a,
        b = 42,
        c,
        ...args
    ] = foo() || [];
    ```
- can also do this as an assignment, not a declaration
    ```javascript
    function foo() {
        return [1, 2, 3, 4, 5, 6, 7];
    }

    var a, b, c, args;

    [
        a,
        b = 42,
        c,
        ...args
    ] = foo() || [];
    ```

- Aside: variable swapping example
    ```javascript
    var x = 10, y = 28;
    [x, y] = [y, x]
    ```
## Dumping variables
- ex:
    ```javascript
    var a = [1,2,3];

    [dump1, dump2, ...a] = [0, ...a, 4]; // now a has [2,3,4]
    ```
    - spreads on right, gathers on left
    - Don't even need the variables!
    ```javascript
    var a = [1,2,3];

    [ , , ...a] = [0, ...a, 4]; // now a has [2,3,4]
    ```
## Nested Array Destructuring
1. What does args contain at the end of this snippet?
    ```javascript
    function foo() {
        return [1, 2, 3, [4, 5, 6] ];
    }

    var a, b, c, args;

    [
        a,
        b = 42,
        c,
        ...args
    ] = foo() || [];
    ```
    - Answer: [ [4,5,6] ]
1. what if we wanted to extract from the nested arrays?
    ```javascript
    function foo() {
        return [1, 2, 3, [4, 5, 6] ];
    }

    var a, b, c, args, d, e;

    [
        a,
        b = 42,
        c,
        [
            d,
            ,
            e,
        ]
    ] = foo() || [];
    ```
    - We're just using positional mapping to destructure at whatever nesting level we need

1. An important point about the result of a destructuring assignment:
    - what is x equal to here?
    ```javascript
    function foo() {
        return [1, 2, 3, [4, 5, 6] ];
    }

    var a, b;
    var x = [ a, b ] = foo();
    ```
    - It seems like `x` should be equal to `[ 1, 2 ]`
    - `x` actually equals `[1, 2, 3, [4, 5, 6] ]`
        - why? because the `[a, b]` is not an array, it's an `assignment` context.
        - All the desructuring does is assingn `a` and `b`, THEN returns the full array it was passed
        - So, you could chain these together to accomplish multiple tasks with the same assignment (although the code will probably be a bit less readable)

## Object Destructuring
1. Back to the original example, only using objects
    ```javascript
    function foo() {
        return { a:1, b:2, c: 3};
    }

    var tmp = foo();
    var a = tmp.a;
    var b = tmp.b !== undefined ? a : 42;
    var c = tmp.c;
    ```
    - object destructuring version:
    ```javascript
    function foo() {
        return { a:1, b:2, c: 3};
    }

    var {
        a,
        b,
        c,
    } = foo() || {};
    ```
    - No need to specify objects of the same name
    - IF you wanted to specify a new property in the object:
    ```javascript
    function foo() {
        return { a:1, b:2, c: 3};
    }

    var {
        a,
        b: X, // X is being ASSIGNED to the value in 'b' here!!!!
        c,
    } = foo() || {};
    ```
    - NOTE: `tmp` above has `tmp.a, tmp.X, and tmp.c`, NOT `tmp.b`
        - When creating an object literal the `property name` is always on the left side of the `:`
        - When destructuring an object literal, the `property name` is always on the left side of the `:`
        - Or just remember that it's bass-ackwards...

    - can also assign default variables as shown below
    ```javascript
    function foo() {
        return { a:1, b:2, c: 3};
    }

    var {
        a = 10,
        b: X = 42,
        c,
    } = foo() || {};
    ```

    - Side note: Stage 3 proposal to use rest within object literals similar to use in array context (used in React, but not approved yet?)
    ```javascript
    var {
        a,
        b,
        ...rest
        } = {a: 10, b: 20, c: 30, d: 40};

    console.log(a); // 10
    console.log(b); // 20

    console.log(rest); // { c: 30, d: 40 }
    ```
## Nested Object destructuring
1. Nesting objects works similarly to arrays
    ```javascript
    function foo() {
        return { a:1, b:2, c: 3,
                        d: {
                            e: 4,
                         }
               };
    }

    var {
        a = 10,
        b: X = 42,
        c,
        d: {
            e
        } = {}, // sets e to 4 or unassigned if e is not defined
        d: Y, // sets { e: 4 } to Y
    } = foo() || {};
    ```

1. Also, if you assign the variables in advance, you must add `()`'s around the destructuring assignment because the `{}`'s are treated as a block scoping (not an expression) otherwise
    ```javascript
    function foo() {
        return { a:1, b:2, c: 3,
                        d: {
                            e: 4,
                         }
               };
    }

    var a, X, c, Y;

    ( { // note the use of a leading `(` here
        a = 10,
        b: X = 42,
        c,
        d: {
            e
        } = {}, // sets e to 4 or unassigned if e is not defined
        d: Y, // sets { e: 4 } to Y
    } = foo() || {} );
    ```

## Destructuring and Function Parameters
1. All these rules are applicable to function params
    ```javascript
    function foo([a, b, c]) {
        console.log(a, b, c);
    }

    foo( 1,2,3 );
    ```
    - this fails because we're trying to destructure the first argument AS and array
    ```javascript
    function foo([a, b, c] = []) {
        console.log(a, b, c);
    }

    foo( [ 1,2,3 ] );
    ```
1. ...or as object parameters
    ```javascript
    function foo( {a, b, c} = {}) {
        console.log(a, b, c);
    }

    foo(
        {
        a: 1,
        b: 2,
        c: 3
        } );
    ```
- A good starting exercise is to take some function with a lot of arguments, and convert to object destructuring, which removes all the issues with confusing argument assignments, etc

## Advanced Destructuring
1. Example: you have an object representing defaults for a given set of parameters. You want to set some values, leave some others as default.
    - you end up using some mixin library to handle this, but all have different methods of doing it
    - You could also do the following in ES6:
    ```javascript
    var defaults = {
        method: "POST",
        callback: function() {},
        headers: {
            "content-type": "text/plain"
        }
    };

    var config = {
        url: "http://some.url",
        callback: foo,
        headers: {
            "x-requested-with": "foo"
        }
    };

    {
        let {
            method = defaults.method,
            callback = defaults.callback,
            url,
            headers: {
               "content-type": contentType = defaults.headers["content-type"],
                "x-requested-with" = xRequestedWith,
            }
        } = config;

        config = {
            method,
            callback,
            url,
            headers: {
                "content-type": contentType,
                "x-requested-with": xRequestedWith,
            }
        };
    }
    ```
    - or, just remove the defaults object, and inline the defaults that are being set:
    ```javascript
    var config = {
        url: "http://some.url",
        callback: foo,
        headers: {
            "x-requested-with": "foo"
        }
    };

    {
        let {
            method = "POST",
            callback = function() {},
            url,
            headers: {
               "content-type": contentType = "text/plain",
                "x-requested-with": "foo",
            }
        } = config;

        config = {
            method,
            callback,
            url,
            headers: {
                "content-type": contentType,
                "x-requested-with": xRequestedWith,
            }
        };
    }
    ```
## Exercise 3
1. Exercise 3 start: see comments for assignment task
```javascript
function ajax(url,cb) {
	// fake ajax response:
	cb({
		foo: 2,
		baz: [ 6, 8, 10 ],
		bam: {
			qux: 12
		}
	});
}

function check(data) {
	console.log(
		56 === (
			data.foo +
			data.bar +
			data.baz[0] + data.baz[1] + data.baz[2] +
			data.bam.qux +
			data.bam.qam
		)
	);
}

var defaults = {
	foo: 0,
	bar: 4,
	bam: {
		qux: 0,
		qam: 14
	}
};

function response( /* do some destructuring here */ ) {

	check({
        /* do some restructuring here */
	});

}

ajax("http://fun.tld",response);
```
2. Solution (only the response function, everything else remains unchanged)
```javascript
function response({
            foo = defaults.foo, // set defaults here, because here we're in assignment context
            baz = defaults.bar,
            bam: {
              qux = defaults.qux,
              qam = defaults.qam,
            } = {}
          } = {}) {
	check({ // restructure using implicit assignment
	        // because variable names remain the same
		foo,
		bar,
		baz,
		bam: {
			qux,
			qam,
		}
	});
}
```
3. In response to a question about whether destructuring will still look up the prototype chain when a variable is missing: (answer is yes)
    ```javascript
    /* create an object as a prototype of another object
     * with an 'a' property */
    var obj = Object.create({ a: 2 });

    obj.a; // 2 - the '.a' just looks up the prototype chain

    var { a } = obj; // destructure a

    a; // 2 - destructuring preserves the same behavior
    ```
    - Destructuring is a declarative syntax for doing the same assingments we could do in ES2015


