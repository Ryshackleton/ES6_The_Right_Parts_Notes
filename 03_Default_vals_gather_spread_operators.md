# Default values and the gather/spread operators

## Default Values
1. setting a default value (old way - imperative)
    ```javascript
    function foo(x) {
        x = x || 42;
    }
    foo(0); // x becomes 42, because 0 is falsy
    ```

    - to fix this...
    ```javascript
    function foo(x) {
        x = x !== undefined ? x : 42;
    }
    foo(0); // x becomes 0
    ```
2. Declarative way in ES6: setting a default value
    ```javascript
    function foo(x = 42) {

    }
    foo(0); // x becomes 0
    foo.apply(0); // x becomes 0

    foo(); // x becomes 42
    foo(null, []); // x becomes 42
    ```
## Lazy expressions
1. Default parameter values can be functions...

    - how many times is bar called in this case???
    ```javascript
    function bar() {
        console.log("called bar!");
    }

    function foo(x = bar()) {
    }
    ```
    - Zero times.  It's not called until foo() is called!!!

    - Example use case: enforce argument checking
    ```javascript
    function requred(parameterName) {
        throw `Parameter ${parameterName} is required`;
    }

    function foo(id = required("id")) {
    }
    ```
    - Now, this throws exception when no parameters is called
        - (seems like using TypeScript could accomplish the same thing)


2. Other oddities
    - can use parameters to assign other parameters, but parameters are defined left to right
        - so we could define x as id, but not id as x, because x comes second
    ```
    function foo(id = required("id"), x = id) {
    }
    ```

3. A really oddball case to illustrate the subtleties of lazy loading
    ```
    var x = 1;
    function foo(x = 2, f = function() { return x; }) {
        console.log( f() );
    }
    foo();
    ```
    - outputs 2, because the closure is around the parameter, not the outer scoped x

    - Variation:
    ```
    var x = 1;
    function foo(x = 2, f = function() { return x; }) {
        var x = 5;
        console.log( f() );
    }
    foo();
    ```
    - in Chrome, throws error! - old content in the course, where this executes


## Gather (rest) and spread operators - Part 1
1. Old method of passing a list of variables, etc (Imperative)
    ```javascript
    function foo() {
        var args = [].slice.call( arguments ); // this gets us an array of arguments
        args.unshift( 42 ); // tack on a '42' as first argument
        bar.apply( null, args );  // null ignores the this binding
                                  // args passes the newly modified args to the new function
    }
    ```
    - Declarative method in ES6
        - (rest operator, like 'the rest', or 'gather' operator)
    ```javascript
    function foo( ...args ) {
        array.unshift(42);
        bar( ...args );
    }
    ```
    - the `...` operator is context dependent:
        - in parameter list the `...` operator is in an assignment context because it's assigning each parameter as it was passed in when the function was called -> in this case the `...` operator `GATHERS` parameters
        - when the `...` operator is used in a list context, the `...` operator `SPREADS`

## Gather (rest) and spread operators - Part 2
1. Now we can eliminate the unshift
    - abstracting away the `[].slice.call();` helps make the functionality of adding a 42 to the argument list more clear
    ```javascript
    function foo( ...args ) {
        bar( 42, ...args );
    }
    ```
## Using the gather and spread operators
1. Can use to merge arrays and now objects
    ```javascript
    var x = [4,5];
    var y = [1,2,3];
    var z = [0].concat(x,y,[6]);
    ```

    ```javascript
    var x = [4,5];
    var y = [1,2,3];
    var z = [0, ...x, ...y, 6];

    foo(0, ...x, ...y, 6);
    ```





