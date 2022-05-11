<!-- !/usr/bin/env markdown
-*- coding: utf-8 -*-
region header
Copyright Torben Sickert (info["~at~"]torben.website) 16.12.2012

License
-------

This library written by Torben Sickert stand under a creative commons naming
3.0 unported license. See https://creativecommons.org/licenses/by/3.0/deed.de
endregion -->

Project status
--------------

[![npm](https://img.shields.io/npm/v/errorreporter?color=%23d55e5d&label=npm%20package%20version&logoColor=%23d55e5d)](https://www.npmjs.com/package/errorreporter)
[![npm downloads](https://img.shields.io/npm/dy/errorreporter.svg)](https://www.npmjs.com/package/errorreporter)

[![<LABEL>](https://github.com/thaibault/errorreporter/actions/workflows/build.yaml/badge.svg)](https://github.com/thaibault/errorreporter/actions/workflows/build.yaml)
[![<LABEL>](https://github.com/thaibault/errorreporter/actions/workflows/test.yaml/badge.svg)](https://github.com/thaibault/errorreporter/actions/workflows/test.yaml)
[![<LABEL>](https://github.com/thaibault/errorreporter/actions/workflows/test:coverage:report.yaml/badge.svg)](https://github.com/thaibault/errorreporter/actions/workflows/test:coverage:report.yaml)
[![<LABEL>](https://github.com/thaibault/errorreporter/actions/workflows/check:types.yaml/badge.svg)](https://github.com/thaibault/errorreporter/actions/workflows/check:types.yaml)
[![<LABEL>](https://github.com/thaibault/errorreporter/actions/workflows/lint.yaml/badge.svg)](https://github.com/thaibault/errorreporter/actions/workflows/lint.yaml)

[![code coverage](https://coveralls.io/repos/github/thaibault/errorreporter/badge.svg)](https://coveralls.io/github/thaibault/errorreporter)

<!-- Too unstable yet
[![dependencies](https://img.shields.io/david/thaibault/errorreporter.svg)](https://david-dm.org/thaibault/errorreporter)
[![development dependencies](https://img.shields.io/david/dev/thaibault/errorreporter.svg)](https://david-dm.org/thaibault/errorreporter?type=dev)
[![peer dependencies](https://img.shields.io/david/peer/thaibault/errorreporter.svg)](https://david-dm.org/thaibault/errorreporter?type=peer)
-->
[![documentation website](https://img.shields.io/website-up-down-green-red/https/torben.website/errorreporter.svg?label=documentation-website)](https://torben.website/errorreporter)

Use case
--------

An client side error reporter written in javaScript. Embed this code into your
website markup and get an ajax call to a specified resource for each distinct
error with detailed client informations. You can filter each non supported
client technology to avoid getting error reports from environments which aren't
expected.

```HTML
<script src="https://torben.website/errorreporter/data/distributionBundle/index.compiled.js">
</script>
```

<!-- region vim modline
vim: set tabstop=4 shiftwidth=4 expandtab:
vim: foldmethod=marker foldmarker=region,endregion:
endregion -->
