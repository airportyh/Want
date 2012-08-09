var want = require('./want')
var expect = require('chai').expect
describe('want', function(){
    it('should want function', function(){
        var hello = want('fixtures/hello.js', 'hello')
        expect(hello()).to.equal('hello world')
    })
    it('should want multiple things', function(){
        var greetings = want('fixtures/greetings.js', ['hello', 'goodMorning', 'goodAfternoon'])
        expect(greetings.hello()).to.equal('hello')
        expect(greetings.goodMorning()).to.equal('good morning')
        expect(greetings.goodAfternoon()).to.equal('good afternoon')
    })
    it('catches non-existent symbol', function(){
        expect(function(){
            want('fixtures/greetings.js', 'foobar')
        }).to.throw(/foobar is not defined in fixtures\/greetings\.js/)
    })
    it('catches syntax error', function(){
        expect(function(){
            want('fixtures/bad_syntax.js', 'hello')
        }).to.throw(/bad_syntax\.js Line 11: Unexpected end of input/)
    })
    it('catches runtime error', function(){
        var foobar = want('fixtures/runtime_error.js', 'foobar')
        try{
            foobar()
            throw new Error('should have throw a runtime error.')
        }catch(e){
            expect(e.stack).to.match(/runtime_error\.js:2/)
        }
    })
    it('catches immediate runtime error', function(){
        try{
            want('fixtures/im_runtime_error.js', 'foobar')
        }catch(e){
            expect(e.stack).to.match(/im_runtime_error\.js:1/)
        }
    })
})