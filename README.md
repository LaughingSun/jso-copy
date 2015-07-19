# jso-copy
Javascript Object copy tools

node usage:
```javascript
var jsoCopy = require('jsocopy.js') // or 'jsocopy.min.ja'
  , jsoClone = require jsoCopy.clone
  , jsoMerge = require jsoCopy.merge

; jsoCopy({some: "thing"}) -> {"some": "thing"}
; jsoCopy.deep({some: ["things"]}, 1) -> {"some": ["things"]}
; jsoCopy.deep({some: ["things"]}, 1, myCallback(key, val) {return val.replace(/i/g, 'a')}) -> {"some": ["thangs"]}
; jsoClone({some: "thing"}) -> {"some": "thing"}
; jsoClone({some: "thing"}, 10, myCallback(desc, name) {return desc.value.replace(/i/g, 'a')}) -> {"some": ["thangs"]}
; jsoMerge({some: "thing"}, b = {}, 2, myCallback(desc, name) {return desc.value.replace(/i/g, 'a')}) -> {"some": ["thangs"]}
```

Notes:
* docs (html) are in the docs directory
* the only pre-requisites are node, but it is very browsifiable for those wishing to use it for browser side.
+ currenly copy, clone and merge should handle non-object arguments, however merge does not gracefully handle mering objects into scalars and visaversa.  
+ copy should handle end result properties and not their definitions, hence currently getters/setters merge their descripters and not their values (to be fixed)

TODO:
+ add deepEquals and notDeepEquals
+ make copy use end values and not their desciptors


