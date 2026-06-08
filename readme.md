<!-- !/usr/bin/env markdown
-*- coding: utf-8 -*-
region header
Copyright Torben Sickert (info["~at~"]torben.website) 16.12.2012

License
-------

This library written by Torben Sickert stands under a creative commons naming
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

[![deploy web documentation](https://img.shields.io/github/actions/workflow/status/thaibault/errorreporter/deploy-web-documentation.yaml?label=deploy%20web%20documentation&style=for-the-badge)](https://github.com/thaibault/errorreporter/actions/workflows/deploy-web-documentation.yaml)
[![web documentation](https://img.shields.io/website-up-down-green-red/https/torben.website/errorreporter.svg?label=web-documentation&style=for-the-badge)](https://torben.website/errorreporter)

<!--|deDE:Installation-->
Installation
------------

You can install via package manager, simply download the compiled version as
zip file here and inject or request via cdn in HTML:
<!--deDE:
    Sie können das Paket über den Paketmanager installieren oder einfach die
    kompilierte Version als ZIP-Datei hier herunterladen und in HTML einbinden
    oder über ein CDN abrufen:
-->

```bash
npm install errorreporter
```

<!--showExample-->

```HTML
<script src="https://unpkg.com/errorreporter@latest/index.js"></script>
```

Use case
--------

A client side error reporter written in JavaScript. Embed this code into your
website markup and get an ajax call to a specified resource for each distinct
error with detailed client information. You can filter each non-supported
client technology to avoid getting error reports from environments which aren't
expected.

<!--showExample:JavaScript-->

```JavaScript
console.log('A', errorreporter)
```
