# Template Strings

## Concise Properties and Methods
1. ES Old way
    ```javascript
    var a = 1;

    var c = "hello"

    var obj {
      a: a,
      b: function() {},
      // b function b() { // this is valid in ESOld
      //   b();
      // } 
      foo: function*() {} // generator syntax
    };
    
    obj[c] = 42; // have to define the property outside the object literal
    ```
- ES6 Way:
    ```javascript
    var a = 1;

    var obj {
      a, // now we can shorten to remove the double variable name
      b() {}, // and remove function keyword
      /* // however, you can no longer name your functions 
      b() {
         b(); // this is actually invalid,
              // b is lexically an anonymous function
      } */
      [c]: 42,
      [c+"fn"]() { }, // also valid
      *foo() {}, // concise generator syntax
      *[c+"generator"]() {}, // computed concise generator syntax
    };
    ```

## Template Strings
1. ES Old way
    ```javascript
    var name = "Kyle";
    var orderNumber = "123";
    var total = 319.7;
    
    var msg = "Hello " + name + ", your order \
        (#" + orderNumber + ") was $" + 
        total ".";
    
    ```
- ES6 Way
    ```javascript
    var name = "Kyle";
    var orderNumber = "123";
    var total = 319.7;
    
    // note that this still needs the \ to escape the \n
    var msg = `Hello ${name}, your order \
          (#${orderNumber}) was $${total}.`;
    ```

## Tag Functions
1. Extra feature included with template literals
- notice the `foo` in front of the string literal
    ```javascript
    /* the `foo` ahead of ths string literal below creates the
     * equivalent of the following function with params:
     * @param strings - an array of the strings in-between the
     *    variables defined by ${variable}
     * @param value1 - the first value
     * @param value2 - the second value
     * or more likely ...values  to gather the values
     */
    function foo(strings, value1, value2, value3 ) {
      
  
    }
    
    var name = "Kyle";
    var orderNumber = "123";
    var total = 319.7;
    
    var msg = foo`Hello ${name}, your order (#${orderNumber}) was $${total}.`;
    ```

