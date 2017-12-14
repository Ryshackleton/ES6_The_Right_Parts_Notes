# Let vs var

## Block Scoping

```javascript
    function foo(x,y) {
        if( x > y ) {
            var tmp = x; // hoisted to scope of foo
            x = y;
            y = tmp;
        }
    }
    
    for(var i = 0; i < 10; i++) { // var i is hoisted, but only use it in the for loop
        // ...
    }
    
    for(let i = 0; i < 10; i++ ) { // with 'let', we will ENFORCE block scoping at COMPILE time.
        // ...
    }
    
    var z - bar(x * 2); // this says: "I am usable across scopes"
```
    
USE OF VAR: use when you intend to use across scope, use 'let' where you need to enforce the variable to within a scope
   
CAUTION:
```javascript
    try {
        let z = bar(x * 2);
    } catch(err) {
        console.log(`the error is... ${z}`) // also an error, because let restricts scope to the previous try block, BUT 'var' would have let that happen
    }
```


Can't do this with 'let', although this is somewhat nasty and probably not best practice anyway
```javascript
    if (...) {
        var w = ...
        var r = ...
    } else if (...) {
        var w = ...
        var r = ...
    } else {
        var w = ...
        var r = ...
    }
```
    
## Closures and Explicit blocks

Let within for loop to bind i
```javascript
    function foo(x,y) {
        for (let i = 0; i<10; i++) { // var would not work here because the i is not bound within the closure of the function
            $("btn"+i).click(function() {
                console.log(" button " + i + "clicked!");
            });
        }
    }
```
    
Explicitly defining a scoped block
```javascript
    if (x > y) {
        { let x = 2; // declare x within its own scope for clarity, put let at the top, so other devs don't run in to the 'temporal dead zone' where the variable is not defined (e.g. if you put a console.log() before the let x, because x is not useable until it's defined within that scope)
            // ....
        }
    }
```
    
## Const
const defines a variable that cannot be reassigned...that's it!
```javascript
    var x = [1,2,3];
    var x = []; // not allowed!!!
    x[0] = 5; // fine.  the reference hasn't been reassigned, the value within has.
    const x = Object.freeze([1,2,3]); // makes values at the top level immutable!!!
```
    
When to use const
```javascript
    const PI = 3.14;
```
    
