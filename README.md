<!--
SPDX-FileCopyrightText: 2020 The HedgeDoc developers (see AUTHORS file)

SPDX-License-Identifier: CC0-1.0
-->

# Modifications since forking

1. Upgrade the version of markdown-it to 14.1.0
2. Set the default width to 100% if no width or height is specified
3. Release the `dist` directory for javascript importing

## Install nstructions

by yarn:
```
yarn add git+https://github.com/bjgarywong/markdown-it-image-size.git
```

by npm:
```
npm install git+https://github.com/bjgarywong/markdown-it-image-size.git
```

-------------------------------

Below is the content before forking.

# DEPRECATED

Use https://github.com/hedgedoc/markdown-it-plugins instead

# markdown-it-imsize
> A markdown-it plugin for size-specified image markups. This plugin overloads original image renderer of markdown-it.
> This is a typescript port of https://github.com/tatsy/markdown-it-imsize without the local file system support.

## Usage

#### Enable plugin

```js
var md = require('markdown-it')({
  html: true,
  linkify: true,
  typography: true
}).use(require('markdown-it-imsize')); // <-- this use(package_name) is required
```

#### Example

```md
![test](image.png =100x200)
```

is interpreted as

```html
<p><img src="image.png" alt="test" width="100" height="200"></p>
```

## Options

#### Auto fill

```js
var md = require('markdown-it')({
  html: true,
  linkify: true,
  typography: true
}).use(require('markdown-it-imsize'), { autofill: true });
```

will fill the width and height fields automatically if the specified image path is valid.

Therefore,

```md
![test](image.png)
```

is interpreted as

```html
<p><img src="image.png" alt="test" width="200" height="200"></p>
```

where ```image.png``` is a valid path and its size is 200 x 200.
