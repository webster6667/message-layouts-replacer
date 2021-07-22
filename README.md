<p align="center" style="text-align:center">
    <img src="./illustration.svg" alt="illustration" width="100"/>
</p>

# message-layouts-replacer

> Function than replace layouts to values

[![npm version](https://badge.fury.io/js/message-layouts-replacer.svg)](https://www.npmjs.com/package/message-layouts-replacer)
[![](https://data.jsdelivr.com/v1/package/npm/message-layouts-replacer/badge)](https://www.jsdelivr.com/package/npm/message-layouts-replacer)


## Table of Contents

- [Quick start](#quick-start)
  - [Install](#install)
  - [Initialization](#initialization)
- [Methods](#methods)
  - [messageLayoutsReplacer](#messageLayoutsReplacer)

## Quick start

### Install

We support all platforms.

#### npm

For module bundlers such as Webpack or Browserify.

```shell
npm i message-layouts-replacer
```

#### Include with &lt;script&gt;

1. <a href="https://cdn.jsdelivr.net/npm/message-layouts-replacer/dist/lib/message-layouts-replacer.js" target="_blank">Download lib</a>
2. Add script to html

```html
<script src="message-layouts-replacer.js"></script>
```

##### CDN

Recommended for learning purposes, you can use the latest version:

```html
<script src="https://cdn.jsdelivr.net/npm/message-layouts-replacer/dist/lib/message-layouts-replacer.js"></script>
```

Recommended for production for avoiding unexpected breakage from newer versions:

```html
<script src="https://cdn.jsdelivr.net/npm/message-layouts-replacer@0.0.0/dist/lib/message-layouts-replacer.js"></script>
```

### Initialization

#### ES6

message-layouts-replacer as an ES6 module.

```js
import messageLayoutsReplacer from 'message-layouts-replacer';

const messageAfterReplace = messageLayoutsReplacer('limit is exceeded {limit}', [{
     searchLayout: '{limit}',
     valueToReplace: '51'
}])

console.log(messageAfterReplace) //'limit is exceeded 51'

```

#### Node

message-layouts-replacer as a Node.js module

```js
const messageLayoutsReplacer = require('message-layouts-replacer');

const messageAfterReplace = messageLayoutsReplacer('limit is exceeded {limit}', [{
    searchLayout: '{limit}',
    valueToReplace: '51'
}])

console.log(messageAfterReplace) //'limit is exceeded 51'

```

#### Browser

Exports a global variable called `messageLayoutsReplacer`. Use it like this

Connect to html file ```<script src="https://cdn.jsdelivr.net/npm/message-layouts-replacer/dist/lib/message-layouts-replacer.js" ></script>```

```html
<script>
    var messageAfterReplace = messageLayoutsReplacer('limit is exceeded {limit}', [{
        searchLayout: '{limit}',
        valueToReplace: '51'
    }])

    console.log(messageAfterReplace) //'limit is exceeded 51'

</script>
```

#### AMD

message-layouts-replacer as an AMD module. Use with Require.js, System.js, and so on.

1. <a href="https://cdn.jsdelivr.net/npm/message-layouts-replacer/dist/lib/message-layouts-replacer.js" target="_blank">Download lib</a>
2. Connect to your module loader

```js
requirejs(['message-layouts-replacer'], function(messageLayoutsReplacer) {

    var messageAfterReplace = messageLayoutsReplacer('limit is exceeded {limit}', [{
        searchLayout: '{limit}',
        valueToReplace: '51'
    }])

    console.log(messageAfterReplace) //'limit is exceeded 51'
});
```

## Methods

### messageLayoutsReplacer

function than replace layouts to values


#### Params
- `messageForReplace`
  - Type: `string`
  - Description: string, that have layouts for replace
- `arrayOfReplacedSettings`
  - Type: `Array.&lt;ReplacedSettingsProps&gt;`
  - Description: array with layout replace settings

#### Returns
- `string`

#### Example
```JS
//layout replace
messageLayoutsReplacer('limit is exceeded {limit}', [{
    searchLayout: '{limit}',
    valueToReplace: '51'
}]) // => 'limit is exceeded 51'

//layout replace with decline
messageLayoutsReplacer('Осталось minutes['минута', 'минуты', 'минут']', [{
    searchLayout: 'minutes',
    valueToReplace: '51'
}]) // => 'Осталось 51 минута'
```



## Author

webster6667
