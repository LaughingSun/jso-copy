
var assert = require('assert')
  , FNNAME_REGEX = /^function(?:\s+(\w+))?\(/


module.exports = doTest
; doTest

function textifier (key, val) {
  if (val instanceof Object) {
    if (val.constructor === RegExp) return ['constructor:', val.constructor.name, '(', val.toString(), ')'].join('')
  }
  return val
} 

function untextifier (key, val) {
  var t = 'constructor:'
    , i = t.length
    , cn, j
  ; if (typeof val === 'string' && val.indexOf(t) === 0
      && (j = val.indexOf('(', i)) > i) {
    switch (cn = val.slice(i, j).trim()) {
      case 'RegExp':
      default:
        return eval(['new ', cn, val.slice(j)].join(''))
    }
  }
  return val
} 


function doTest (methname, method, cases) {
  var i, testargs
  ; describe(methname, function() {
    var a, b, c
    ; it('should be a function', function(){
      assert.equal(typeof method, 'function', [methname, ' is missing or not a function'].join(''))
      ; if (typeof method !== 'function') return
      ; for (i = 0; i < cases.length; i++) {
        c = cases[i]
        ; doTestCase(methname, method, c.args, c.afterfn, c.aftera, c.afterb)
      }
    })
  })
}

function doTestCase (methname, method, args, fn, aftera, afterb) {
  var a = args[0]
    , as = JSON.stringify(a, textifier)
    , expect = JSON.parse(as, untextifier)
    , argss = args.slice()
    , b, bs, fs, c, d
  ; argss[0] = as
  ; argss[1] = JSON.stringify(argss[1], textifier)
  ; describe(['b = ', methname, '(', argss.join(', '), ')'].join(''), function() {
    b = method.apply(null, args)
    ; it('should have same constructor ', function(){
      assert(a.constructor === b.constructor
          , 'a and b do not have the same constructor')
    })
    /*@TODO: I think that __proto__`s treated differently*/
    ; it('should deepEqual __proto__`s ', function(){
      assert.deepEqual(a.__proto__, b.__proto__
        , 'a and b do not deepEqual __proto__`s')
    })
    
    ; it('should have same __proto__.constructor ', function(){
      assert(a.__proto__.constructor === b.__proto__.constructor
        , 'a and b do not have the same __proto__.constructor')
    })
    ; if (a instanceof Object) {
      it('should not be the same object', function(){
        assert.notStrictEqual(a, b, 'a and b are the same object')
      })
    }
    ; if(fn instanceof Function) {
      fs = [fn.name || fn.toString().match(FNNAME_REGEX)[1]
          || '<anonymous>', '(a,b)'].join('')
      if (aftera == undefined) aftera = JSON.parse(JSON.stringify(a))
      ; if (afterb == undefined) afterb = JSON.parse(JSON.stringify(b))
      
      ; fn(a, b)

      ; it(['a should be ', JSON.stringify(aftera), ' after ', fs].join(''), function(){
        assert.deepEqual(a, aftera)
      })
      ; it(['b should be ', JSON.stringify(afterb), ' after ', fs].join(''), function(){
        assert.deepEqual(b, afterb)
      })
    } else {
      it('should return as deeply equal', function(){
        assert.deepEqual(a, b, 'a and b are not deeply equal')
      })
    }
  })
}
