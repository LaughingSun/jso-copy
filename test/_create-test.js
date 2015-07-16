var assert = require('assert')
  , _create = require('../src/copy.js')._create
  , getDesc = Object.getOwnPropertyDescriptor
  , testdata, i, d

; testdata = [
  {a:1, b:2, c:3}
  , [0,1,2,3,4,5,6,7,8,9]
  , /\w+/gim
  , new Date
  , new Map
  , new Set
  , 1
  , 1.1
  , 'a string'
  , true
]

for (i in testdata) test_create(testdata[i])

function test_create(a) {
  var b
  ; describe(['_create(', a.constructor.name, ')'].join(''), function() {
    b = _create(a)
    ; it('should have same constructor ' + b.constructor.name, function(){
      assert(a.constructor === b.constructor
          , 'a and b do not have the same constructor')
    })
    ; if (a instanceof Object) {
      ; it('should not be the same object', function(){
        assert.notStrictEqual(a, b
            , 'a and b are the same object')
      })
    }
  })
}

