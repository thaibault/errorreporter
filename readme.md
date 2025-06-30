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

[![npm](https://img.shields.io/npm/v/errorreporter?color=%23d55e5d&label=npm%20package%20version&logoColor=%23d55e5d&style=for-the-badge)](https://www.npmjs.com/package/errorreporter)
[![npm downloads](https://img.shields.io/npm/dy/errorreporter.svg?style=for-the-badge)](https://www.npmjs.com/package/errorreporter)

[![build](https://img.shields.io/github/actions/workflow/status/thaibault/errorreporter/build.yaml?style=for-the-badge)](https://github.com/thaibault/errorreporter/actions/workflows/build.yaml)
[![build push package](https://img.shields.io/github/actions/workflow/status/thaibault/errorreporter/build-package-and-push.yaml?label=build%20push%20package&style=for-the-badge)](https://github.com/thaibault/errorreporter/actions/workflows/build-package-and-push.yaml)

[![check types](https://img.shields.io/github/actions/workflow/status/thaibault/errorreporter/check-types.yaml?label=check%20types&style=for-the-badge)](https://github.com/thaibault/errorreporter/actions/workflows/check-types.yaml)
[![lint](https://img.shields.io/github/actions/workflow/status/thaibault/errorreporter/lint.yaml?label=lint&style=for-the-badge)](https://github.com/thaibault/errorreporter/actions/workflows/lint.yaml)
[![test](https://img.shields.io/github/actions/workflow/status/thaibault/errorreporter/test-coverage-report.yaml?label=test&style=for-the-badge)](https://github.com/thaibault/errorreporter/actions/workflows/test-coverage-report.yaml)

[![code coverage](https://img.shields.io/coverallsCoverage/github/thaibault/errorreporter?label=code%20coverage&style=for-the-badge)](https://coveralls.io/github/thaibault/errorreporter)

[![deploy documentation website](https://img.shields.io/github/actions/workflow/status/thaibault/errorreporter/deploy-documentation-website.yaml?label=deploy%20documentation%20website&style=for-the-badge)](https://github.com/thaibault/errorreporter/actions/workflows/deploy-documentation-website.yaml)
[![documentation website](https://img.shields.io/website-up-down-green-red/https/torben.website/errorreporter.svg?label=documentation-website&style=for-the-badge)](https://torben.website/errorreporter)

Use case
--------

An client side error reporter written in javaScript. Embed this code into your
website markup and get an ajax call to a specified resource for each distinct
error with detailed client informations. You can filter each non supported
client technology to avoid getting error reports from environments which aren't
expected.

```HTML
<script
    src="https://torben.website/errorreporter/data/distributionBundle/index.compiled.js"
></script>
```
