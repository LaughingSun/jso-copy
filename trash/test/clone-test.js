var assert = require('assert')
  , toTest = require('./lib/do-test.js')
  , FNNAME_REGEX = /^function(?:\s+(\w+))?\(/
  , clone = require('../src/clone.js')
  , testdata, testargs, a, b, c, n

; testdata = {
  clone: c = [
    [[0,1,2,3,4,5,6,7,8,9]]
    , [{a:1, b:2, c:3}]
    , [/\w+/gim]
    , [[[0,1,2,3,4],[5,6,7,8,9]]]
    , [{first: {a:1, b:2, c:3}, second: {a:4, b:5, c:6}}]
    , [[c = [0,1,2,3,4], c]]
    , [{first: c = {a:1, b:2, c:3}, second: c}]

    , [[0,1,2,3,4,5,6,7,8,9]
      , incADecB, [-1,0,1,2,3,4,5,6,7,8], [1,2,3,4,5,6,7,8,9,10]]
    , [{a:1, b:2, c:3}
      , incADecB, {a:0, b:1, c:2}, {a:2, b:3, c:4}]
    , [[[0,1,2,3,4],[5,6,7,8,9]]
      , incASDecBS, [[-1,0,1,2,3],[4,5,6,7,8]], [[1,2,3,4,5],[6,7,8,9,10]]]
    , [{first: {a:1, b:2, c:3}, second: {a:4, b:5, c:6}}
      , incASDecBS
      , {first: {a:0, b:1, c:2}, second: {a:3, b:4, c:5}}
      , {first: {a:2, b:3, c:4}, second: {a:5, b:6, c:7}}]
    , [[c = [0,1,2,3,4], c]
      , incASDecBS, [c = [-2,-1,0,1,2], c], [c = [2,3,4,5,6], c]]
    , [{first: c = {a:1, b:2, c:3}, second: c}
      , incASDecBS
      , {first: c = {a:-1, b:0, c:1}, second: c}
      , {first: c = {a:3, b:4, c:5}, second: c}]
  ]
  , cloneRecursive: JSON.parse(JSON.stringify(c, textifier), untextifier)
}
for (n in testdata) {
  toTest(n)
}

;


function incADecB (a,b) {
  var keys = Object.keys(a)
    , i = 0, k
  ; while (i < keys.length) {
    a[k = keys[i++]]--
    ; b[k]++
  }
}

function incASDecBS (a,b) {
  var keys = Object.keys(a)
    , i = 0, k
  ; while (i < keys.length) incADecB(a[k = keys[i++]], b[k])
}

