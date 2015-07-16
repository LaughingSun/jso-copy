
var NATIVECODE_REGEX = /^function(?:\s+\w+)?\((?:\s*\w+(?:\s*,\s*\w+)*)?\)\s*\{\s*\[native code\]/
  , getNames = Object.getOwnPropertyNames
  , defProp = Object.defineProperty
  , getDesc = Object.getOwnPropertyDescriptor
  , create = Object.create

; module.exports = clone
;

/*@TODO: I think that __proto__`s treated differently, currently it can
 ^ fail on non native constructed items
; it('should deepEqual __proto__`s ', function(){
  assert.deepEqual(a.__proto__, b.__proto__
    , 'a and b do not deepEqual __proto__`s')
})
*/

function clone (a) {
  var stack, args, srcCache, dstCache, names, b, c, i, j, k, n, o, p, q
  ; if (a instanceof Object) {
    stack = []
    ; srcCache = [a]
    ; b = ((q = a.constructor) === Object) ? {}
        : (q === Array) ? []
        : NATIVECODE_REGEX.test(q.toString()) ? new a.constructor(a)
        : create(a)
    ; dstCache = [b]
    ; c = 1
    ; j = 0
    ; args = {a: a, b: b}
    ; do {
      names = getNames(a = args.a)
      ; b = args.b
      ; i = 0
      ; while ((n = names[i++]) !== undefined) {
        if ((o = (p = getDesc(a, n)).value) instanceof Object) {
          if ((k = srcCache.indexOf(o)) < 0) {
            q = ((q = o.constructor) === Object) ? {}
              : (q === Array) ? []
              : NATIVECODE_REGEX.test(q.toString()) ? new o.constructor(o)
              : create(o)
            stack[j++] = {a: srcCache[k = c] = o, b: dstCache[c++] = q}
          }
          p.value = dstCache[k]
        }
        defProp(b, n, p)
      }
    } while (args = stack[--j])
    ; return dstCache[0]
  }
  return a
}


