# ES6 The Right Parts: notes

## Arrow Functions

### Arrow function variations make syntax less declarative:
1. Variations:

```JavaScript
    () => 3 // returns 3, has no arguments
    x => 3 // has 1 argument
    (...x) => 3 // has some number of arguments
    (x,y) => 3 // has 2 arguments
```

2. Cases where implied return value is confusing
```javascript
    x => { try { 3;} catch(e) {} } // returns nothing, BUT try/catch must be wrapped in {}'s because the try/catch is NOT an expression
    x => { try { return 3; } catch(e) {} } // returns 3, now that we remember that return is not implied
    x => (3) // returns 3, because ()'s aren't the same as {}'s
    x => { y: x } // returns nothing
    x => {{ y: x }} // also returns nothing, double {{ not allowed
    x => { return { y: x } } // actually returns the object we want: { y: x }
    x => ({ y: x}) // also returns the object we want: { y: x }
```

### Named function expressions are more useful:
1. Named event handler that needs to unbind itself
1. recursive function that needs to call itself
    const foo = () => { foo(this) } // nope, can't do it.
1. Name inferencing:
    ```javascript
    const foo = x () => 3;
    foo.name; // "foo"
    ```

4. ...but not for anonymous functions!
    ```javascript
    foo( x => 3 ) // not name inferenced
    ```

### Promises and This:
1. Handling promise results via callback

    ```JavaScript
        p.then( v => v.id ) // what happens when v is null or undefined? -> JS exception, null.id, "anonymous function" in stack trace
        p.then( function extractID(v) { return v.id } // NOW, stack trace will show "function extractID"

        foo( function returnThree() { return 3 } ) // would show up in stack trace as "returnThree"
    ```

2. See Chapter 2 of You Don't Know JS, flow chart that shows when you should use arrow functions. CRAZY!!!!

3. The ONE reason Kyle Simpson thinks arrow functions got into ES6:
    - Arrow functions have no implicit `this` context
    ```Javascript
    var obj = {
        id: 4,
        foo: function () {
            setTimeout(function() {
                console.log(this.id);
            }, 100);
        }
    };
    obj.foo() // 'this' refers to global context, so undefined
    ```

    - This is annoying because to fix this we have to add a .bind(this) to the anonymous function

    - Alternatively, define ```var self = this;``` then refer to `self`, which is also clunky
    ```javascript
    var obj = {
        id: 4,
        foo: function () {
            setTimeout(function() {
                console.log(this.id);
            }.bind(this), 100);
        }
    };
    obj.foo() // now 'this' refers to the function context, so we get "4"
    ```

    - Arrow functions don't have an implicit `this` context, so when you refer to this, the function lexically looks up one level in scope to find the `this` context
    ```javascript
        var obj = {
            id: 4,
            foo: function () {
                setTimeout( () => {
                console.log(this.id); // 'this' just looks up one level of scope (to obj) and finds 'id'
                }, 100);
            }
        };
        obj.foo() // now 'this' refers to the obj context lexically, so we get "4" as we would expect
    ```


### Exercise 0 - try to change all function expressions to arrow functions
1. it's a mess!
1. you have to pay CLOSE attention to the 'this' context of each function
1. recursive calls get really messy, because in order to call itself, you have to do various tricks to
    make sure that your this context is valid


