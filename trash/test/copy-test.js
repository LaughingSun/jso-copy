var toTest = require('./lib/do-test.js')
  , copy = require('../src/jsocopy.js')
  , merge = copy.merge
  , testdata, testcases, methname

; testdata = {
  "copy": {
    method: copy
    , data: [
      {args: [{a:1, b:2, c:3}]}
      , {args: [[0,1,2,3,4,5,6,7,8,9]]}
      , {args: [/\w+/gim]}
      , {args: [new Date]}
      , {args: [new Map]}
      , {args: [new Set]}
      , {args: [1]}
      , {args: [1.1]}
      , {args: ['a string']}
      , {args: [true]}
      , {args: [[[0,1,2,3,4],[5,6,7,8,9]]]}
      , {args: [{first: {a:1, b:2, c:3}, second: {a:4, b:5, c:6}}]}
      , {args: [[c = [0,1,2,3,4], c]]}
      , {args: [{first: c = {a:1, b:2, c:3}, second: c}]}
    ]
  }

  , "copy.deep": {
    method: copy.deep
    , data: [
      {args: [{a:1, b:2, c:3}]}
      , {args: [[0,1,2,3,4,5,6,7,8,9]]}
      , {args: [/\w+/gim]}
      , {args: [new Date]}
      , {args: [new Map]}
      , {args: [new Set]}
      , {args: [1]}
      , {args: [1.1]}
      , {args: ['a string']}
      , {args: [true]}
      , {args: [[[0,1,2,3,4],[5,6,7,8,9]]]}
      , {args: [{first: {a:1, b:2, c:3}, second: {a:4, b:5, c:6}}]}
      , {args: [[c = [0,1,2,3,4], c]]}
      , {args: [{first: c = {a:1, b:2, c:3}, second: c}]}

      , {args: [{a:1, b:2, c:3}, 1]}
      , {args: [[0,1,2,3,4,5,6,7,8,9], 1]}
      , {args: [/\w+/gim, 1]}
      , {args: [new Date, 1]}
      , {args: [new Map, 1]}
      , {args: [new Set, 1]}
      , {args: [1, 1]}
      , {args: [1.1, 1]}
      , {args: ['a string', 1]}
      , {args: [true, 1]}
      , {args: [[[0,1,2,3,4],[5,6,7,8,9]], 1]}
      , {args: [{first: {a:1, b:2, c:3}, second: {a:4, b:5, c:6}}, 1]}
      , {args: [[c = [0,1,2,3,4], c], 1]}
      , {args: [{first: c = {a:1, b:2, c:3}, second: c}, 1]}

      , {args: [{a:1, b:2, c:3}, -1]}
      , {args: [[0,1,2,3,4,5,6,7,8,9], -1]}
      , {args: [/\w+/gim, -1]}
      , {args: [new Date, -1]}
      , {args: [new Map, -1]}
      , {args: [new Set, -1]}
      , {args: [1, -1]}
      , {args: [1.1, -1]}
      , {args: ['a string', -1]}
      , {args: [true, -1]}
      , {args: [[[0,1,2,3,4],[5,6,7,8,9]], -1]}
      , {args: [{first: {a:1, b:2, c:3}, second: {a:4, b:5, c:6}}, -1]}
      , {args: [[c = [0,1,2,3,4], c], -1]}
      , {args: [{first: c = {a:1, b:2, c:3}, second: c}, -1]}
    ]
  }

  , "copy.clone": {
    method: copy.clone
    , data: [
      {args: [{a:1, b:2, c:3}]}
      , {args: [[0,1,2,3,4,5,6,7,8,9]]}
      , {args: [/\w+/gim]}
      , {args: [new Date]}
      , {args: [new Map]}
      , {args: [new Set]}
      , {args: [1]}
      , {args: [1.1]}
      , {args: ['a string']}
      , {args: [true]}
      , {args: [[[0,1,2,3,4],[5,6,7,8,9]]]}
      , {args: [{first: {a:1, b:2, c:3}, second: {a:4, b:5, c:6}}]}
      , {args: [[c = [0,1,2,3,4], c]]}
      , {args: [{first: c = {a:1, b:2, c:3}, second: c}]}

      , {args: [{a:1, b:2, c:3}, 1]}
      , {args: [[0,1,2,3,4,5,6,7,8,9], 1]}
      , {args: [/\w+/gim, 1]}
      , {args: [new Date, 1]}
      , {args: [new Map, 1]}
      , {args: [new Set, 1]}
      , {args: [1, 1]}
      , {args: [1.1, 1]}
      , {args: ['a string', 1]}
      , {args: [true, 1]}
      , {args: [[[0,1,2,3,4],[5,6,7,8,9]], 1]}
      , {args: [{first: {a:1, b:2, c:3}, second: {a:4, b:5, c:6}}, 1]}
      , {args: [[c = [0,1,2,3,4], c], 1]}
      , {args: [{first: c = {a:1, b:2, c:3}, second: c}, 1]}

      , {args: [{a:1, b:2, c:3}, -1]}
      , {args: [[0,1,2,3,4,5,6,7,8,9], -1]}
      , {args: [/\w+/gim, -1]}
      , {args: [new Date, -1]}
      , {args: [new Map, -1]}
      , {args: [new Set, -1]}
      , {args: [1, -1]}
      , {args: [1.1, -1]}
      , {args: ['a string', -1]}
      , {args: [true, -1]}
      , {args: [[[0,1,2,3,4],[5,6,7,8,9]], -1]}
      , {args: [{first: {a:1, b:2, c:3}, second: {a:4, b:5, c:6}}, -1]}
      , {args: [[c = [0,1,2,3,4], c], -1]}
      , {args: [{first: c = {a:1, b:2, c:3}, second: c}, -1]}
    ]
  }

  , "merge": {
    method: merge
    , data: [
      {args: [{a:1, b:2, c:3}, {}]}
      , {args: [[0,1,2,3,4,5,6,7,8,9], []]}
      , {args: [new Date, new Date]}
      , {args: [new Map, new Map]}
      , {args: [new Set, new Set]}
      , {args: [1, 1]}
      , {args: [1.1, 1.1]}
      , {args: ['a string', 'a string']}
      , {args: [true, true]}
      , {args: [[[0,1,2,3,4],[5,6,7,8,9]], []]}
      , {args: [{first: {a:1, b:2, c:3}, second: {a:4, b:5, c:6}}, {}]}
      , {args: [[c = [0,1,2,3,4], c], []]}
      , {args: [{first: c = {a:1, b:2, c:3}, second: c}, {}]}

      , {args: [{a:1, b:2, c:3}, {}, 1]}
      , {args: [[0,1,2,3,4,5,6,7,8,9], [], 1]}
      , {args: [new Date, new Date, 1]}
      , {args: [new Map, new Map, 1]}
      , {args: [new Set, new Set, 1]}
      , {args: [1, 1, 1]}
      , {args: [1.1, 1.1, 1]}
      , {args: ['a string', 'a string', 1]}
      , {args: [true, true, 1]}
      , {args: [[[0,1,2,3,4],[5,6,7,8,9]], [], 1]}
      , {args: [{first: {a:1, b:2, c:3}, second: {a:4, b:5, c:6}}, {}, 1]}
      , {args: [[c = [0,1,2,3,4], c], [], 1]}
      , {args: [{first: c = {a:1, b:2, c:3}, second: c}, {}, 1]}

      , {args: [{a:1, b:2, c:3}, {}, -1]}
      , {args: [[0,1,2,3,4,5,6,7,8,9], [], -1]}
      , {args: [new Date, new Date, -1]}
      , {args: [new Map, new Map, -1]}
      , {args: [new Set, new Set, -1]}
      , {args: [1, 1, -1]}
      , {args: [1.1, 1.1, -1]}
      , {args: ['a string', 'a string', -1]}
      , {args: [true, true, -1]}
      , {args: [[[0,1,2,3,4],[5,6,7,8,9]], [], -1]}
      , {args: [{first: {a:1, b:2, c:3}, second: {a:4, b:5, c:6}}, {}, -1]}
      , {args: [[c = [0,1,2,3,4], c], [], -1]}
      , {args: [{first: c = {a:1, b:2, c:3}, second: c}, {}, -1]}
    ]
  }

    //   , [[0,1,2,3,4,5,6,7,8,9]
    //     , incADecB, [-1,0,1,2,3,4,5,6,7,8], [1,2,3,4,5,6,7,8,9,10]]
    //   , [{a:1, b:2, c:3}
    //     , incADecB, {a:0, b:1, c:2}, {a:2, b:3, c:4}]
    //   , [[[0,1,2,3,4],[5,6,7,8,9]]
    //     , incASDecBS, [[0,1,2,3,4],[5,6,7,8,9]], [[0,1,2,3,4],[5,6,7,8,9]]]
    //   , [{first: {a:1, b:2, c:3}, second: {a:4, b:5, c:6}}
    //     , incASDecBS
    //     , {first: {a:1, b:2, c:3}, second: {a:4, b:5, c:6}}
    //     , {first: {a:1, b:2, c:3}, second: {a:4, b:5, c:6}}]
    //   , [[c = [0,1,2,3,4], c]
    //     , incASDecBS, [c = [0,1,2,3,4], c], [c = [0,1,2,3,4], c]]
    //   , [{first: c = {a:1, b:2, c:3}, second: c}
    //     , incASDecBS
    //     , {first: c = {a:1, b:2, c:3}, second: c}
    //     , {first: c = {a:1, b:2, c:3}, second: c}]
  // , "copy.deep": {
  //   method: copy
  //   , data: [
  //    [[0,1,2,3,4,5,6,7,8,9]]
  //     , [{a:1, b:2, c:3}]
  //     , [/\w+/gim]
  //     , [[[0,1,2,3,4],[5,6,7,8,9]]]
  //     , [{first: {a:1, b:2, c:3}, second: {a:4, b:5, c:6}}]
  //     , [[c = [0,1,2,3,4], c]]
  //     , [{first: c = {a:1, b:2, c:3}, second: c}]
  //     , [[0,1,2,3,4,5,6,7,8,9]
  //       , incADecB, [-1,0,1,2,3,4,5,6,7,8], [1,2,3,4,5,6,7,8,9,10]]
  //     , [{a:1, b:2, c:3}
  //       , incADecB, {a:0, b:1, c:2}, {a:2, b:3, c:4}]
  //     , [[[0,1,2,3,4],[5,6,7,8,9]]
  //       , incASDecBS, [[-1,0,1,2,3],[4,5,6,7,8]], [[1,2,3,4,5],[6,7,8,9,10]]]
  //     , [{first: {a:1, b:2, c:3}, second: {a:4, b:5, c:6}}
  //       , incASDecBS
  //       , {first: {a:0, b:1, c:2}, second: {a:3, b:4, c:5}}
  //       , {first: {a:2, b:3, c:4}, second: {a:5, b:6, c:7}}]
  //     , [[c = [0,1,2,3,4], c]
  //       , incASDecBS, [c = [-2,-1,0,1,2], c], [c = [1,2,3,4,5], c]]
  //     , [{first: c = {a:1, b:2, c:3}, second: c}
  //       , incASDecBS
  //       , {first: c = {a:-1, b:0, c:1}, second: c}
  //       , {first: c = {a:2, b:3, c:4}, second: c}]
  //   ]
  // }
}
for (methname in testdata) {
  testcases = testdata[methname]
  toTest(methname, testcases.method, testcases.data)
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

