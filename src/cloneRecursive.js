
var NATIVECODE_REGEX = /^function(?:\s+\w+)?\((?:\s*\w+(?:\s*,\s*\w+)*)?\)\s*\{\s*\[native code\]/
  , getNames = Object.getOwnPropertyNames
  , defProp = Object.defineProperty
  , getDesc = Object.getOwnPropertyDescriptor
  , create = Object.create

; module.exports = cloneRecursive
;

/*@TODO: I think that __proto__`s treated differently, currently it can
 ^ fail on non native constructed items
; it('should deepEqual __proto__`s ', function(){
  assert.deepEqual(a.__proto__, b.__proto__
    , 'a and b do not deepEqual __proto__`s')
})
*/

function cloneRecursive (a) {
  var srcCache = []
    , dstCache = []
    , ci = 0
  ; return (a instanceof Object) ? _cloneObject(a) : a

  function _cloneObject (a) {
    var names, b, i, j, k, n, o, p, q
    ; if ((i = srcCache.indexOf(a)) >= 0) {
      b = dstCache[i]
    } else {
      b = ((q = a.constructor) === Object) ? {}
          : (q === Array) ? []
          : NATIVECODE_REGEX.test(q.toString()) ? new a.constructor(a)
          : create(a)
      ; k = (names = getNames(a)).length
      ; j = -1
      ; while (++j < k) {
        if ((o = (p = getDesc(a, n = names[j])).value) instanceof Object) {
          ; dstCache[ci] = p.value = _cloneObject(o)
          ; srcCache[ci++] = o
        }
        defProp(b, n, p)
      }
    }
    return b
  }
}

