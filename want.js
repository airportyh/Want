var fs = require('fs')
var esprima = require('esprima')
module.exports = function(filename, whatYouWant){
    var content = fs.readFileSync(filename)
    var code
    if (typeof whatYouWant === 'string'){
        var whatYouWant = arguments[1]
        code = '(function(){' + content + 
            '\n return ' + whatYouWant + '}())'
    }else if (whatYouWant instanceof Array){
        code = '(function(){' + content + 
            '\n return {' + whatYouWant.map(function(wyw){
                return [wyw, wyw].join(':')
            }).join(',') +  
            '}}())'
            
    }
    code += '//@ sourceURL=' + filename
    try{
        return eval(code)
    }catch(e){
        if (e instanceof SyntaxError){
            try{
                esprima.parse(content)
            }catch(e){
                throw new SyntaxError(filename + ' ' + e.message)
            }
            throw e
        }else if (e instanceof ReferenceError){
            throw new ReferenceError(e.message + ' in ' + filename)
        }else{
            throw e
        }
    }
}