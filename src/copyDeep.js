
var NATIVECODE_REGEX = /^function(?:\s+\w+)?\((?:\s*\w+(?:\s*,\s*\w+)*)?\)\s*\{\s*\[native code\]/
  , getNames = Object.getOwnPropertyNames
  , defProp = Object.defineProperty
  , getDesc = Object.getOwnPropertyDescriptor
  , create = Object.create

; module.exports = copyDeep
;

/*@TODO: I think that __proto__`s treated differently, currently it can
 ^ fail on non native constructed items
; it('should deepEqual __proto__`s ', function(){
  assert.deepEqual(a.__proto__, b.__proto__
    , 'a and b do not deepEqual __proto__`s')
})
*/


function copyDeep (a) {
  var stack, names, b, i, j, n, o, p, q
  ; if (a instanceof Object) {
    stack = []
    b = ((q = a.constructor) === Object
        || ! NATIVECODE_REGEX.test(q.toString())) ? {} //create(a)
      : a instanceof Array ? [] : new a.constructor(a)
    ; names = getNames(a)
    ; i = j = 0
    ; while (true) {
      while (n = names[i++]) {
        if ((o = (p = getDesc(a, n)).value) instanceof Object) {
          stack[j++] = {a:a, b:b, i:i, p:p, names:names}
          ; b = create(a = o)
          ; names = getNames(a)
          ; i = 0
          ; continue
        }
        defProp(b, n, p)
      }
      if (! j) break
      ; (p = (args = stack[--j]).p).value = b
      ; defProp(b = args.b, (names = args.names)[(i = args.i)-1], p)
      ; a = args.a
    }
    return b
  }
  return a
}

