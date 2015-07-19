# jso-copy
Javascript Object copy tools

node usage:
```javascript
var jsoCopy = require('jsocopy.js') // or 'jsocopy.min.ja'
  , jsoClone = require jsoCopy.clone
  , jsoMerge = require jsoCopy.merge
```


Notes:
+ currenly copy, clone and merge should handle non-object arguments, however merge does not gracefully handle mering objects into scalars and visaversa.  
+ copy should handle end result properties and not their definitions, hence currently getters/setters merge their descripters and not their values (to be fixed)

TODO:
+ add deepEquals and notDeepEquals
+ make copy use end values and not their desciptors
+ 

