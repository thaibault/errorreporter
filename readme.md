<!-- #!/usr/bin/env markdown
-*- coding: utf-8 -*-
region header
Copyright Torben Sickert 16.12.2012

License
   This library written by Torben Sickert stand under a creative commons
   naming 3.0 unported license.
   See https://creativecommons.org/licenses/by/3.0/deed.de
endregion -->

Project status
--------------

[![npm version](https://badge.fury.io/js/errorreporter.svg)](https://www.npmjs.com/package/errorreporter)
[![downloads](https://img.shields.io/npm/dy/clientnode.svg)](https://www.npmjs.com/package/errorreporter)
[![build status](https://travis-ci.org/thaibault/errorReporter.svg?branch=master)](https://travis-ci.org/thaibault/errorReporter)
[![code coverage](https://coveralls.io/repos/github/thaibault/errorReporter/badge.svg)](https://coveralls.io/github/thaibault/errorReporter)
[![dependencies](https://img.shields.io/david/thaibault/errorreporter.svg)](https://david-dm.org/thaibault/errorreporter)
[![development dependencies](https://img.shields.io/david/dev/thaibault/errorreporter.svg)](https://david-dm.org/thaibault/errorreporter?type=dev)
[![peer dependencies](https://img.shields.io/david/peer/thaibault/errorreporter.svg)](https://david-dm.org/thaibault/errorreporter?type=peer)
[![documentation website](https://img.shields.io/website-up-down-green-red/https/torben.website/errorReporter.svg?label=documentation-website)](https://torben.website/errorReporter)

Use case
--------

An client side error reporter written in javaScript. Embed this code into your
website markup and get an ajax call to a specified resource for each distinct
error with detailed client informations. You can filter each non supported
client technology to avoid getting error reports from environments which aren't
expected.

    #!HTML

    <script src="https://goo.gl/a4b9oS"></script>

<!-- region vim modline
vim: set tabstop=4 shiftwidth=4 expandtab:
vim: foldmethod=marker foldmarker=region,endregion:
endregion -->
