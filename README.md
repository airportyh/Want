*Want*: Use Functions Or Objects From Plain Ol' JS Files
==============================================================

`want` is like `require` except it can import symbols from plain ol` Javascript files - ones that do not use the commonJS system to export symbols.

Example 1: `want`-ing a single symbol
-------------------------------------

You have a `hello.js` whose contents are

    function hello(){
        return 'hello world'
    }

You can `want` that function from a Node program like so

    var want = require('want')
    var hello = want('hello.js', 'hello')
    console.log(hello())

Example 2: `want`-ing multiple symbols
--------------------------------------

You have a file `greetings.js` which defines multple symbols

    function hello(){
        return 'hello'
    }

    function goodMorning(){
        return 'good morning'
    }

    function goodAfternoon(){
        return 'good afternoon'
    }

You can `want` each of the symbols by providing them to `want()` like so

    var greetings = want('greetings.js', ['hello', 'goodMorning', 'goodAfternoon'])
    console.log(greetings.hello())
    console.log(greetings.goodMorning())
    console.log(greetings.goodAfternoon())

What `want` Can`t Do
--------------------

`want` does not support nested dependencies. The "wanted" JS files must be self-sufficient - *not have any dependencies*.

Install
-------

    npm install want
