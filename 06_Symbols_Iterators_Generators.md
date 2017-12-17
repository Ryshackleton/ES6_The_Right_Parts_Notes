# Symbols, Generators, Iterators
#### Or, how to use a `Symbol` iterator to `Generate` a custom `Iterator`

## Symbol
- A symbol is a new data type in JavaScript
    - most closely associated with a string, but it isn't
    - A symbol is a unique, globally un-guessable value within the context of your program
    - technically stored as numbers, but you'll never see it

    ```javascript
    var x = Symbol(" whatever description you like ");
    var y = Symbol(" whatever description you like ");
    x === y; // false
    ```

    - property for an object
    ```javascript
    var x = Symbol(" whatever description you like ");

    var obj = {
      id: 42
    };
    
    obj[x] = "shh, this is secret";
    ```
    - Try it in developer console:
    ```javascript
    var x = Symbol(" whatever description you like ");

    var obj = {
      id: 42
    };
    
    obj[x] = "shh, this is secret";
    
    "shh, this is secret"
    > obj[x]
    "shh, this is secret"
    > obj
    {id: 42, Symbol( whatever description you like ): "shh, this is secret"}
    > Object.getOwnPropertySymbols(obj)
    [Symbol( whatever description you like )]
    ```
    - Symbols are special properties that are collected into a different "bucket" than other properties

- Well known symbols
    - Symbol.iterator
    - Symbol.toStringTag
    - Symbol.toPrimitive
    - Symbol.isConcatSpreadable
    - These are hooks to tell the user how to use a given iterator, etc.

- Iterators with Symbols
    - e.g. Array
    ```javascript
    var arr = [1,2,3];

    var it = arr[Symbol.iterator]();
    
    it.next(); // { value: 1, done: false }
    it.next(); // { value: 2, done: false }
    it.next(); // { value: 3, done: false }
    it.next(); // { value: undefined, done: true }
    ```

    ```javascript
    var arr = [1,2,3];

    // for of -> 'of' must be followed by something that returns an iterable
    // for, of just calls .next(), keeps returning iterator.value until (done === true)
    for ( var v of arr) { 
      console.log( v ); 
    }
    ```
    - so `for of` can loop over any iterable

    - NOTE: different from `for in`, which loops over keys, not values
    ```javascript
    var str = "Hello";

    for ( var k in str) { 
      console.log( k ); 
    }
    // 0, 1, 2, 3, 4
    ```

    - `...` operator uses iterable under the hood
    ```javascript
    var arr = [1,2,3];

    var str = "Hello";
    
    [ ...str ]; // ["H", "e", "l", "l", "o"] 
    
    [ x, y, ...rest ] = [ ...str ]; // x: "H", y: "e", rest: ["l", "l", "o"]
    ```
- Creating a custom iterator
    - Old, crappy way to create a custom iterator

    ```javascript
    var obj = {
      // make a function that will return a { value: something, done: true | false }
      [Symbol.iterator]() { 
        var idx = this.start, en = this.end;
        var it = {
          next: () => { // arrow function so this will look up to obj
            if (idx <= en) {
             var v = this.values[idx];
             idx++;
             return { value: v, done: false };
            } else {
              return { done: true };
            } 
          }
        };
        return it;
      },
      values: [ 2,3,4,6,8,10,12,14,16,18,20,22,24,26,28],
      start: 4,
      end: 13,
    };
    ```
    - in dev console: add that code, then spread to use the iterator

    ```javascript
    // > [...obj]
    // [8, 10, 12, 14, 16, 18, 20, 22, 24, 26]
    ```
    - we'll come back to this in a sec and rewrite this

## Generators
- (a slight devation)
    - use the * notation to create a generator, which is a shorthand way of constructing an iterator
    - yield keyword returns a value and a done indicator

    ```javascript
    function *main() {
      console.log("hello");
      yield; // pause locally inside the generator
      console.log("world");
    }
    
    var it = main(); // constructs an iterator
    
    it.next(); // { value: undefined, done: false }, console: "hello"
    
    it.next(); // { value: undefined, done: true }, console: "world"
    ```

    - in the examples below, notice the placement of the yield vs return, and the behavior of the resulting returned value
    ```javascript
    function *main() {
      console.log("hello");
      yield 9; // pause locally inside the generator
      console.log("world");
      return 10;
    }
    
    var it = main(); // constructs an iterator
    
    it.next(); // { value: 9, done: false }, console: "hello"
    
    it.next(); // { value: 9, done: true }, console: "world"
    ```

    ```javascript
    function *main() {
      console.log("hello");
      yield 9; // pause locally inside the generator
      console.log("world");
      yield 10; // pause again inside generator, return done: false
    }
    
    var it = main(); // constructs an iterator
    
    it.next(); // { value: 9, done: false }, console: "hello"
    
    it.next(); // { value: 10, done: false }, console: "world"
    
    it.next(); // { value: undefined, done: true }, console: 
    ```
    - so, as long as there's still something left to `yield`, `done` will return `false`
    - Generators are a really just a state machine, because they generate values based on a given state

    - try logging this out to the console to see how some of the flow works:
    ```javascript
    function *main() {
      for (var i=0; i<5; i++) {
        console.log(`main[${i}]`);
        yield i;
        console.log(`main[${i}] after yield`);
      }
    }
    
    var j = 0;
    for (var v of main()) {
      console.log(v);
      console.log(`for loop[${j++}]`);
    }
    ```

## Computed generator methods
- creating a better custom iterator
    - rebuild our iterator method with a generator
    ```javascript
    var obj = {
        // old code for reference
        // [Symbol.iterator]() {
        //     var idx = this.start, en = this.end;
        //     var it = {
        //       next: () => { // arrow function so this will look up to obj
        //         if (idx <= en) {
        //          var v = this.values[idx];
        //          idx++;
        //          return { value: v, done: false };
        //         } else {
        //           return { done: true };
        //         } 
        //       }
        //     };
        //     return it;
        //   },
        *[Symbol.iterator]() {
          for (var idx=this.start; idx<=this.end; idx++) {
            yield this.values[idx];
          }
        },
      values: [ 2,3,4,6,8,10,12,14,16,18,20,22,24,26,28],
      start: 4,
      end: 13,
    };
    ```
