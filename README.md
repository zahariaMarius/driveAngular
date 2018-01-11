
***ITS 2017***
***JAVASCRIPT***
**MEMBERS: *Toqir Nasir, Pietro Chiarva, Gianluca Abate, Stefano Tortone.***

The Json Plop
========================

**MANAGEMENT OF WORK:**
-----------------------

    We split the program functions among the members of the group.
    We have collaborated together working at school and at home using the program : TeamViewer
    we have shared code with a repository online using Git.

    Files:
    - server.js: Toqir
    - app.js : Toqir
    - client.js : Stefano, Gianluca
    - errorHandling.js : Pietro
    - json.js : Gianluca, Toqir

**ClientManager:**
-----------------------

 For manage the client we used:

 ***client.js***


**ServerManager:**
-----------------------

For manage the server we have used two file:

***app.js:***

Into this file we have used many require for node modules and other files.

Ex.
```js
var morgan = require('morgan')
```

**Script files Description:**
-----------------------
Directory Api:
 - json.js = file that handle all the method(GET, PUT, POST).
 - errorHandling.js = file used to manage the error of the calls.

Directory client:
 - client.js = manage the client of application.
 - index.html = the web page used for see the results.


Directory server:
- app.js = file used to manage the header and the errors of the server.
- server.js = file used to configure the server.

Other file:
- package-lock.json = a json with various information about the modules.
- package.json = a json with various information about the project.


**Node modules**
- express: framework for web application NODE.js and API creation.
- morgan: a module for logging request details.
- body-parser: a module that returns middleware that only parses json.
- unique-id-generator: a module that create unique id randomly.

**Postable data**
To be posted on this server a json must have the following properties:
- nome: string
- cognome: string
- missioniEffetuate: Array
- missioniDaEffettuare: Array









<!-- per fare le cose fighe in markdown -->
```js
var morgan = require('morgan')
```

lorem ipsum shhshs `node` lorem fhsjjfj
