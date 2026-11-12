<!-- !/usr/bin/env markdown
-*- coding: utf-8 -*-
region header
Copyright Torben Sickert (info["~at~"]tsickert.com) 16.12.2012

License
-------

This library written by Torben Sickert stands under a creative commons naming
4.0 international license.
See https://creativecommons.org/licenses/by/4.0/deed.de
endregion -->

<!--|deDE:Projektstatus-->
<!--|frFR:Statut du projet-->
Project Status
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
[![web documentation](https://img.shields.io/website-up-down-green-red/https/tsickert.com/errorreporter.svg?label=web-documentation&style=for-the-badge)](https://tsickert.com/errorreporter)


<!--|deDE:Einsatzmöglichkeiten-->
<!--|frFR:Cas d'utilisation-->
Use case
--------

A small client side error reporter. Include it in your website and every
uncaught error and unhandled promise rejection in your visitors' browsers is
sent to your server, together with details about the browser, the operating
system and the page. You learn about problems in production without asking
users to open their developer tools.
<!--deDE:
    Ein kleiner clientseitiger Fehlerreporter. Binden Sie ihn in Ihre Website
    ein, und jeder nicht abgefangene Fehler sowie jede nicht behandelte
    Promise-Ablehnung im Browser Ihrer Besucher wird an Ihren Server gesendet,
    zusammen mit Angaben zu Browser, Betriebssystem und Seite. So erfahren Sie
    von Problemen im Produktivbetrieb, ohne Nutzer bitten zu müssen, ihre
    Entwicklerwerkzeuge zu öffnen.
-->
<!--frFR:
    Un petit outil de signalement d'erreurs côté client. Intégrez-le à votre
    site web et chaque erreur non interceptée ainsi que chaque rejet de
    promesse non traité dans le navigateur de vos visiteurs est envoyé à
    votre serveur, accompagné d'informations sur le navigateur, le système
    d'exploitation et la page. Vous êtes informé des problèmes en production
    sans demander aux utilisateurs d'ouvrir leurs outils de développement.
-->

Features included:
<!--deDE:Enthaltene Funktionen:-->
<!--frFR:Fonctionnalités incluses:-->

- Registers itself on load, no further code needed.<!--deDE:Registriert sich beim Laden selbst, kein weiterer Code nötig.--><!--frFR:S'enregistre automatiquement au chargement, aucun code supplémentaire nécessaire.-->
- Reports each distinct error only once per page view.<!--deDE:Meldet jeden unterschiedlichen Fehler nur einmal pro Seitenaufruf.--><!--frFR:Signale chaque erreur distincte une seule fois par affichage de page.-->
- Detailed browser, engine, operating system and device information via the
  optional [ua-parser-js](https://www.npmjs.com/package/ua-parser-js).<!--deDE:Detaillierte Angaben zu Browser, Engine, Betriebssystem und Gerät über das optionale [ua-parser-js](https://www.npmjs.com/package/ua-parser-js).--><!--frFR:Informations détaillées sur le navigateur, le moteur, le système d'exploitation et l'appareil grâce au paquet optionnel [ua-parser-js](https://www.npmjs.com/package/ua-parser-js).-->
- Filters for known noise and unsupported browsers, extendable with your own
  rules.<!--deDE:Filter für bekanntes Rauschen und nicht unterstützte Browser, erweiterbar um eigene Regeln.--><!--frFR:Filtres pour les erreurs parasites connues et les navigateurs non pris en charge, extensibles avec vos propres règles.-->
- Hooks for successful, failed and ignored reports.<!--deDE:Hooks für erfolgreiche, fehlgeschlagene und ignorierte Meldungen.--><!--frFR:Hooks pour les signalements réussis, échoués et ignorés.-->

<div class="wd-table-of-contents">
    <h2 id="content">Content<!--deDE:Inhalt--><!--frFR:Contenu--></h2>
    <!--wd-table-of-contents-->
</div>

Installation
------------

Install it via a package manager and import it once in your entry module:
<!--deDE:
    Installieren Sie es über einen Paketmanager und importieren Sie es einmal
    in Ihrem Einstiegsmodul:
-->
<!--frFR:
    Installez-le via un gestionnaire de paquets et importez-le une fois dans
    votre module d'entrée:
-->

```bash
npm install errorreporter
```

```JavaScript
import 'errorreporter'
```

Or include the compiled version from a CDN as early as possible in your HTML,
ideally as first script. It is then available as global "errorreporter":
<!--deDE:
    Oder binden Sie die kompilierte Version über ein CDN möglichst früh in Ihr
    HTML ein, idealerweise als erstes Skript. Sie ist dann als globales
    "errorreporter" verfügbar:
-->
<!--frFR:
    Ou intégrez la version compilée depuis un CDN le plus tôt possible dans
    votre HTML, idéalement comme premier script. Elle est alors disponible
    sous le nom global "errorreporter":
-->

<!--showExample:hidden-->

```HTML
<script src="https://unpkg.com/errorreporter@latest/index.js"></script>
```

For browser details load
[ua-parser-js](https://www.npmjs.com/package/ua-parser-js) before, so that a
global "UAParser" exists when the error reporter is loaded. Without it reports
contain the raw user agent only and browser based filter rules do not apply:
<!--deDE:
    Für Browserdetails laden Sie zuvor
    [ua-parser-js](https://www.npmjs.com/package/ua-parser-js), sodass beim
    Laden des Fehlerreporters ein globales "UAParser" existiert. Ohne es
    enthalten Meldungen nur den rohen User-Agent und browserbasierte
    Filterregeln greifen nicht:
-->
<!--frFR:
    Pour obtenir les détails du navigateur, chargez d'abord
    [ua-parser-js](https://www.npmjs.com/package/ua-parser-js) afin qu'un
    "UAParser" global existe lors du chargement de l'outil de signalement.
    Sans lui, les signalements ne contiennent que l'agent utilisateur brut et
    les règles de filtrage basées sur le navigateur ne s'appliquent pas:
-->

```HTML
<script src="https://unpkg.com/ua-parser-js@2/dist/ua-parser.min.js"></script>
<script src="https://unpkg.com/errorreporter@latest/index.js"></script>
```

<!--|deDE:Beispiel-->
<!--|frFR:Exemple-->
Example
-------

This live example replaces the network request with a function that shows the
reported message:
<!--deDE:
    Dieses Live-Beispiel ersetzt die Netzwerkanfrage durch eine Funktion, die
    die gemeldete Nachricht anzeigt:
-->
<!--frFR:
    Cet exemple en direct remplace la requête réseau par une fonction qui
    affiche le message signalé:
-->

<!--showExample-->

```HTML
<div id="error-output"></div>
```

<!--showExample:JavaScript-->

```JavaScript
errorreporter.globalContext.fetch = (url, options) => {
    document.querySelector('#error-output').textContent =
        JSON.parse(options.body).errorMessage

    return Promise.resolve()
}
Promise.reject('Example error')
```

<!--|deDE:Empfang auf dem Server-->
<!--|frFR:Réception sur le serveur-->
Receiving reports on the server
-------------------------------

Each report is a "PUT" request with a JSON body to "/__error_report__" on the
host the page was loaded from. Store or forward it as you like. The body
contains:
<!--deDE:
    Jede Meldung ist eine "PUT"-Anfrage mit JSON-Inhalt an
    "/__error_report__" auf dem Host, von dem die Seite geladen wurde.
    Speichern oder leiten Sie sie nach Belieben weiter. Der Inhalt umfasst:
-->
<!--frFR:
    Chaque signalement est une requête "PUT" avec un corps JSON envoyée à
    "/__error_report__" sur l'hôte depuis lequel la page a été chargée.
    Stockez-le ou transmettez-le comme vous le souhaitez. Le corps contient:
-->

- "errorMessage", "stack", "url", "lineNumber" and "columnNumber": The error
  itself.<!--deDE:"errorMessage", "stack", "url", "lineNumber" und "columnNumber": Der Fehler selbst.--><!--frFR:"errorMessage", "stack", "url", "lineNumber" et "columnNumber": L'erreur elle-même.-->
- "absoluteURL": Address of the page where it happened.<!--deDE:"absoluteURL": Adresse der Seite, auf der er auftrat.--><!--frFR:"absoluteURL": Adresse de la page où elle s'est produite.-->
- "userAgent" and "technologyDescription": Raw user agent and a readable
  summary like "Firefox 140 (140.0 | Gecko 140.0) | Windows 10".<!--deDE:"userAgent" und "technologyDescription": Roher User-Agent und eine lesbare Zusammenfassung wie "Firefox 140 (140.0 | Gecko 140.0) | Windows 10".--><!--frFR:"userAgent" et "technologyDescription": Agent utilisateur brut et un résumé lisible comme "Firefox 140 (140.0 | Gecko 140.0) | Windows 10".-->
- "issuesToIgnore": The filter rules active on the client.<!--deDE:"issuesToIgnore": Die auf dem Client aktiven Filterregeln.--><!--frFR:"issuesToIgnore": Les règles de filtrage actives sur le client.-->

<!--|deDE:Konfiguration-->
<!--|frFR:Configuration-->
Configuration
-------------

All settings are properties of the exported "errorHandler". Set them right
after loading, before the first error occurs:
<!--deDE:
    Alle Einstellungen sind Eigenschaften des exportierten "errorHandler".
    Setzen Sie sie direkt nach dem Laden, bevor der erste Fehler auftritt:
-->
<!--frFR:
    Tous les réglages sont des propriétés du "errorHandler" exporté.
    Définissez-les juste après le chargement, avant la première erreur:
-->

```JavaScript
import {errorHandler} from 'errorreporter'

errorHandler.reportPath = '/api/client-error'
errorHandler.additionalIssuesToIgnore = [
    {errorMessage: /ResizeObserver loop/},
    {browser: {name: 'Safari', major: '15'}}
]
errorHandler.failedHandler = (error) => console.warn(error)
```

- "reportPath": Path on the current host to send reports to. Defaults to
  "/__error_report__".<!--deDE:"reportPath": Pfad auf dem aktuellen Host, an den Meldungen gesendet werden. Standardmäßig "/__error_report__".--><!--frFR:"reportPath": Chemin sur l'hôte courant auquel les signalements sont envoyés. Par défaut "/__error_report__".-->
- "additionalIssuesToIgnore": Your own filter rules, added to the built-in
  ones.<!--deDE:"additionalIssuesToIgnore": Eigene Filterregeln, die zu den eingebauten hinzukommen.--><!--frFR:"additionalIssuesToIgnore": Vos propres règles de filtrage, ajoutées à celles intégrées.-->
- "issuesToIgnore": Replaces the built-in filter rules. They cover old
  Internet Explorer and Firefox versions and common messages caused by browser
  extensions or the environment.<!--deDE:"issuesToIgnore": Ersetzt die eingebauten Filterregeln. Diese decken alte Internet-Explorer- und Firefox-Versionen sowie häufige, durch Browsererweiterungen oder die Umgebung verursachte Meldungen ab.--><!--frFR:"issuesToIgnore": Remplace les règles de filtrage intégrées. Celles-ci couvrent les anciennes versions d'Internet Explorer et de Firefox ainsi que les messages fréquents causés par des extensions de navigateur ou l'environnement.-->
- "reportedHandler": Called with the response after a report was sent.<!--deDE:"reportedHandler": Wird nach dem Senden einer Meldung mit der Antwort aufgerufen.--><!--frFR:"reportedHandler": Appelé avec la réponse après l'envoi d'un signalement.-->
- "failedHandler": Called if sending fails. Shows a browser alert by default.<!--deDE:"failedHandler": Wird aufgerufen, wenn das Senden fehlschlägt. Zeigt standardmäßig einen Browser-Hinweis an.--><!--frFR:"failedHandler": Appelé si l'envoi échoue. Affiche par défaut une alerte du navigateur.-->
- "issueToIgnoreHandler": Called for filtered errors. If a rule without
  "errorMessage" matched, i.e. an unsupported browser, it shows an alert
  asking the visitor to upgrade by default.<!--deDE:"issueToIgnoreHandler": Wird für herausgefilterte Fehler aufgerufen. Hat eine Regel ohne "errorMessage" gegriffen, also ein nicht unterstützter Browser, zeigt es standardmäßig einen Hinweis an, der zum Aktualisieren auffordert.--><!--frFR:"issueToIgnoreHandler": Appelé pour les erreurs filtrées. Si une règle sans "errorMessage" s'est appliquée, c'est-à-dire un navigateur non pris en charge, il affiche par défaut une alerte invitant le visiteur à mettre à jour.-->

<!--|deDE:Filterregeln-->
<!--|frFR:Règles de filtrage-->
### Filter rules

A rule is a partial error description. It matches if all given properties
match: strings have to be equal, regular expressions have to match. Available
properties are "errorMessage", "technologyDescription", "ua" and the objects
"browser" ("name", "major", "version"), "engine" and "os" ("name",
"version").
<!--deDE:
    Eine Regel ist eine teilweise Fehlerbeschreibung. Sie greift, wenn alle
    angegebenen Eigenschaften passen: Zeichenketten müssen gleich sein,
    reguläre Ausdrücke müssen zutreffen. Verfügbar sind "errorMessage",
    "technologyDescription", "ua" sowie die Objekte "browser" ("name",
    "major", "version"), "engine" und "os" ("name", "version").
-->
<!--frFR:
    Une règle est une description partielle d'erreur. Elle s'applique si
    toutes les propriétés indiquées correspondent: les chaînes doivent être
    égales, les expressions régulières doivent correspondre. Les propriétés
    disponibles sont "errorMessage", "technologyDescription", "ua" ainsi que
    les objets "browser" ("name", "major", "version"), "engine" et "os"
    ("name", "version").
-->

<!--|deDE:Entwicklung-->
<!--|frFR:Développement-->
Development
-----------

```bash
yarn install
yarn build
yarn test
```
