# FileInspector

## License
has to be defined

## Version 0.0.0
This application is under development. It is more or less a proof of concept. 

## Contents
1. [Overview](#overview)
2. [Build](#build)
   2.1. [Dependencies](#dependencies)
   2.2. [Get the Code](#get-the-code)
   2.3. [Build](#build)
3. [Contributing](#contributing)
4. [FAQ](#faq)

## Overview
FileInspector is a Two-Window-FileCommander. The mainly motivations were
- learn WEB techniques (Web Components, CSS, Typescript, Javascript)
- have a useable File Commander available under MacOS.

It is written in fantastic TypeScript and deployed with the help of the famous electron framework.

![Screenshot](/images/screenshot1.png)


## Build
### Dependencies
This application is written in TypeScript, which requires NodeJS and a global installation of TypeScript.  First, let's install this:

```bash
npm install -g typescript

```

### Get the Code
Second, we need to get the code.  We can get this directly from Github:

```bash
git clone https://github.com/uid01089/fileinspector.git
cd fileinspector
```
### Build
At first all needed npm-packages have to be downloaded, referenced by the package.json file:

```bash
npm install
```

2nd the tpyescript source code have to be converted into plain javascript:

```bash
npm run-script build
```

After these two steps the application can be started by:

```bash
npm start
```