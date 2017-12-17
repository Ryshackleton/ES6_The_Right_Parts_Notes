# Ranges
- what if I wanted to generate ranges in javascript?
    - try it in the console
    ```javascript
    Number.prototype[Symbol.iterator] = function*() {
      for (var i=0; i<=this; i++) {
        yield i;
      }
    };
    
    [...8];
    ```
    - try making one that can take negative numbers, etc...
