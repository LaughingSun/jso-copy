/* 
 * The MIT License
 *
 * Copyright 2015 Erich.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

var NATIVECODE_REGEX = /^function(?:\s+\w+)?\((?:\s*\w+(?:\s*,\s*\w+)*)?\)\s*\{\s*\[native code\]/
  // , MAX_DEPTH = Number.MAX_SAFE_INTEGER
  // , _slice = Array.prototype.slice
  , getNames = Object.getOwnPropertyNames
  , setProp = Object.defineProperty
  , getProp = Object.getOwnPropertyDescriptor
  , create = Object.create

/** @module jsoCopy */

/** a callback used in many of the copy methods
  *
  * @callback definer
  * @param {object} propertyDefinition  - the property definition
  * @param {string} propertyName        - the property name
  */

; module.exports = copy
; copy.create = _create
; copy.copy = copy
; copy.deep = deep
; copy.clone = clone
; copy.merge = merge
; copy.deepEquals = require('./equals.js')

/*@TODO: I think that __proto__`s treated differently, currently it can
 ^ fail on non native constructed items
; it('should deepEqual __proto__`s ', function(){
  assert.deepEqual(a.__proto__, b.__proto__
    , 'a and b do not deepEqual __proto__`s')
})
*/

/** makes a copy of a javascript object or value
  * 
  * @param  {object}      a   - the object to copy
  * @param  {?definer}   cb   - optional definer callback
  * @returns {object}         - the copy of a
  */
function copy (a, cb) {
  return deep(a, 0, cb)
}

/** makes a deep copy of a javascript object or value
  * 
  * @param  {object}      a   - the object to copy
  * @param  {?int}       md   - maximum depth of copy
  * @param  {?definer}   cb   - definer callback
  * @returns {object}         - the copy of a
  */
function deep (a, md, cb) {
  var stack, names, b, i, j, n, o, p, q
  ; if (md instanceof Function) cb = md
  ; if (md !== (md | 0)) md = -1
  ; if (a instanceof Object) {
    stack = []
    ; b = ((q = a.constructor) === Object
        || ! NATIVECODE_REGEX.test(q.toString())) ? {} //create(a)
      : a instanceof Array ? [] : new a.constructor(a)
    ; names = getNames(a)
    ; i = j = 0
    ; while (true) {
      while (n = names[i++]) {
        if ((o = (p = getProp(a, n)).value) instanceof Object) {
          stack[j++] = {a:a, b:b, i:i, p:p, names:names}
          ; b = create(a = o)
          ; names = getNames(a)
          ; i = 0
          ; continue
        }
        setProp(b, n, p)
      }
      if (! j) break
      ; (p = (args = stack[--j]).p).value = b
      ; setProp(b = args.b, (names = args.names)[(i = args.i)-1], p)
      ; a = args.a
    }
    return b
  }
  return a
}

/** makes a clone of a javascript object or value
  * 
  * @param  {object}      a   - the object to clone
  * @param  {?definer}   cb   - definer callback
  * @returns {object}         - the copy of a
  */
function clone (a, cb) {
  var stack, args, srcCache, dstCache, names, b, c, d, i, j, k, n, o, q
  ; if (a instanceof Object) {
    if (cb instanceof Function) return clonecb(a, cb)
    ; stack = []
    ; srcCache = [a]
    ; b = ((q = a.constructor) === Object) ? {}
        : (q === Array) ? []
        : NATIVECODE_REGEX.test(q.toString()) ? new a.constructor(a)
        : _create(a)
    ; dstCache = [b]
    ; c = 1
    ; j = 0
    ; args = {a: a, b: b}
    ; do {
      names = getNames(a = args.a)
      ; b = args.b
      ; i = 0
      ; while ((n = names[i++]) !== undefined) {
        if ((o = (d = getProp(a, n)).value) instanceof Object) {
          if ((k = srcCache.indexOf(o)) < 0) {
            q = ((q = o.constructor) === Object) ? {}
              : (q === Array) ? []
              : NATIVECODE_REGEX.test(q.toString()) ? new o.constructor(o)
              : _create(o)
            stack[j++] = {a: srcCache[k = c] = o, b: dstCache[c++] = q}
          }
          d.value = dstCache[k]
        }
        setProp(b, n, d)
      }
    } while (args = stack[--j])
    ; return dstCache[0]
  }
  return a
}

function clonecb (a, cb) {
  var stack, args, srcCache, dstCache, names, b, c, i, j, k, n, o, p, q
  ; if (a instanceof Object) {
    ; stack = []
    ; srcCache = [a]
    ; b = ((q = a.constructor) === Object) ? {}
        : (q === Array) ? []
        : NATIVECODE_REGEX.test(q.toString()) ? new a.constructor(a)
        : _create(a)
    ; dstCache = [b]
    ; c = 1
    ; j = 0
    ; args = {a: a, b: b}
    ; do {
      names = getNames(a = args.a)
      ; b = args.b
      ; i = 0
      ; while ((n = names[i++]) !== undefined) {
        if ((o = (p = getProp(a, n)).value) instanceof Object) {
          if ((k = srcCache.indexOf(o)) < 0) {
            q = ((q = o.constructor) === Object) ? {}
              : (q === Array) ? []
              : NATIVECODE_REGEX.test(q.toString()) ? new o.constructor(o)
              : _create(o)
            stack[j++] = {a: srcCache[k = c] = o, b: dstCache[c++] = q}
          }
          p.value = dstCache[k]
          ; if (cb(d, n) === false) continue
        }
        setProp(b, n, p)
      }
    } while (args = stack[--j])
    ; return dstCache[0]
  }
  return a
}

/** merges javascript objects
  * 
  * @param  {object}      a     - the object to merge from
  * @param  {object}          b     - the object to merge to
  * @param  {?int}       md     - maximum depth of copy
  * @param  {?definer}   cb     - definer callback
  * @returns {object}           - the copy of a
  */
function merge (a, b) {
  var i = arguments.length - 1
    , md = 0
    , cb, t
  ; if (i >= 2 && (arguments[i] instanceof Function || arguments[i] == null)) cb = arguments[i--]
  ; if (i >= 2) {
    if (arguments[i] === true) {
      md = -1
      ; i--
    } else if (arguments[i] === (arguments[i] | 0)) {
      md = arguments[i--]
    }
  }
  ; if (i < 1) throw new Error('expects at least 2 operands')
  ; t = typeof (b = arguments[i])
  ; if (cb instanceof Function) {
    while (i--) {
      if ((a = arguments[i]) == null) continue
      ; if (typeof a !== t) throw new Error(['argument #', i, ' (', typeof a, ') cannot be merged with a different type (', t, ')'].join(''))
      ; _mergecb(a, b)
    }
  } else {
    while (i--) {
      if ((a = arguments[i]) == null) continue
      ; if (typeof a !== t) throw new Error(['argument #', i, ' (', typeof a, ') cannot be merged with a different type (', t, ')'].join(''))
      ; _merge(a, b)
    }
  }
  return b

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
      return b
    }
    return a
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
      return b
    }
    return a
  }

}

/** creates an object of the same type
  * 
  * @param  {object}      a     - the object of the type to create
  * @returns {object}           - the creation
  */
function _create(a) {
  var c
  ; return a instanceof Object ? (((c = a.constructor) === Object) ? {} : (c === Array) ? []
        : NATIVECODE_REGEX.test(c.toString()) ? new c(a)
        : create(a)) : a
}
