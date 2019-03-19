# 1. Setting up a React application.

Before we can start coding we need get some libraries pulled in and configure them.

Getting started with react is actually quite simple since it needs you to only incude 2 libraries which are:

- React.js (or react.development.js)
- React-dom.js. (or react-dom.development.js)

We will use npm to setup these dependencies and any others we might need along the way. So lets get to it.

1. First, make sure you have installed npm.
2. Initialize the app directory using "npm init"
3. Now we have our project setup and ready to include react. For now we will be including the libraries from the internet. 
Please add the following snippet above the existing "app.js" script tag in the body.  
`<script src="https://unpkg.com/react@16.0.0/umd/react.development.js">`  
`</script><script src="https://unpkg.com/react-dom@16.0.0/umd/react-dom.development.js"></script>`
     
4. Also we need to include some specific babel presets so we can simply write template files in JavaScript. We will use Babel to transpile the code into native javascript. Install using  
Install the dependencies "@babel/core", "@babel/preset-env" and "@babel/preset-react" using "npm install". Dont forget to add "--save-dev" to write to the package.json 
5. If you do not have babel installed please do so using npm with the command: "npm install --save-dev @babel/core @babel/cli" 
6. We will be using live-server to to live reload with code changes as well as hosting our application. Install with the following command "npm install live-server -g".
7. Open a terminal window or command prompt and run from the 'app' folder:  
    `babel src/app.js --out-file=public/scripts/app.js --presets=@babel/env,@babel/react --watch`  
This will transpile the source "src/app.js" file to the destination "public/script/app.js" and will make sure to use the react preset so babel knows what to do with react code. Also it will watch for changes
8. Open a new terminal window or command prompt and run from the 'app' folder: 
`live-server public`  
this will start a server and host your 'public' folder. Every change you now make to the source files will be automatically shown in the browser.
If everything goes right you can open a browser window and go to the url which is shown in your console. If you see "Hello world", everything is fine
9. Please proceed to [React templates](2 React templates.md)
