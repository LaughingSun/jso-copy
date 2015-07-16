
var NATIVECODE_REGEX = /^function(?:\s+\w+)?\((?:\s*\w+(?:\s*,\s*\w+)*)?\)\s*\{\s*\[native code\]/
  , MAX_DEPTH = Number.MAX_SAFE_INTEGER
  , getNames = Object.getOwnPropertyNames
  , setProp = Object.defineProperty
  , getProp = Object.getOwnPropertyDescriptor
  , create = Object.create

; module.exports = copy
; copy._create = _create
; copy.deep = copyDeep
; copy.merge = merge
; merge.deep = mergeDeep

/*@TODO: I think that __proto__`s treated differently, currently it can
 ^ fail on non native constructed items
; it('should deepEqual __proto__`s ', function(){
  assert.deepEqual(a.__proto__, b.__proto__
    , 'a and b do not deepEqual __proto__`s')
})
*/

function copy (a, cb) {
  return mergeDeep(a, _create(a), 0, cb)
}

function copyDeep (a, md, cb) {
  return mergeDeep(a, _create(a), md, cb)
}

function merge (a, b, cb) {
  return mergeDeep(a, b, 0, cb)
}

function mergeDeep (a, b, md, cb) {
  if (a instanceof Object) {
    md || (md = 0)
    ; return (cb instanceof Function)
        ? _mergecb(a, b)
        : _merge(a, b)
  }
  return a

  function _merge (a, b) {
    var names, c, d, e, j, n, v, u
    // ; if ((a = d.value) === b) throw new Error('a === b')
    ; if (a !== b && a instanceof Object) {
      c = (names = getNames(a)).length
      ; j = -1
      ; if (md--) {
        while (++j < c) {
          if ((v = (d = getProp(a, n = names[j])).value) instanceof Object) {
            if ( ! b.hasOwnProperty(n)
                || ! ((u = (e = getProp(b, n)).value) instanceof Object)) {
              u = _create(v)
            }
            d.value = _merge(v, u)
          }
          setProp(b, n, d)
        }
      } else {
        while (++j < c) setProp(b, n = names[j], getProp(a, n))
      }
    }
    return b
  }

  function _mergecb (a, b) {
    var names, c, d, e, j, n, v, u
    // ; if ((a = d.value) === b) throw new Error('a === b')
    ; if (a !== b && a instanceof Object) {
      ; c = (names = getNames(a)).length
      ; j = -1
      ; if (md--) {
        while (++j < c) {
          if ((v = (d = getProp(a, n = names[j])).value) instanceof Object) {
            if ( ! b.hasOwnProperty(n)
                || ! ((u = (e = getProp(b, n)).value) instanceof Object)) {
              u = _create(v)
            }
            d.value = _merge(v, u)
            ; if (cb(d, n) === false) continue
          }
          setProp(b, n, d)
        }
      } else {
        while (++j < c) {
          if (cb(d = getProp(a, n), n) !== false) setProp(b, n = names[j], d)
        }
      }
    }
    return b
  }

}

function _create(a) {
  var c
  ; return a instanceof Object ? (((c = a.constructor) === Object) ? {} : (c === Array) ? []
        : NATIVECODE_REGEX.test(c.toString()) ? new c(a)
        : create(a)) : a
}
