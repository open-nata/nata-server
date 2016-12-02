## Nata server for android testing !

A test framework 

## Install 

### First : mongodb and adb

Checkout mongodb and android tools(adb + monkey) first 

```bash
    $ mongod --version
    //db version v2.6.3
    $ adb version 
    //Android Debug Bridge version 1.0.36
```
### Second :nodejs
Checkout nodejs and npm version first , my nodejs and npm version is v6.7.0 and 3.10.3.

```bash
    $ git clone https://github.com/open-nata/nata-server
    $ cd nata-server && npm install 
```

## Use

Before you use , you may also need install nodemon first 

```bash
    $ npm install -g nodemon  //install nodemon first
    $ sudo sh start.sh
```

open localhost:8080 in browser to check if starting successful

