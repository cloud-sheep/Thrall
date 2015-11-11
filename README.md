# Thrall
Paycraft repository

## Dependencies.

The project need the following dependecies:
* Nodejs.
* MongoDB.
* Git.

## Installing Nodejs
* Download from https://nodejs.org/en/download/
* Click next, next, next...
* Open a prompt and run: "node -v". If the node version was shown, everything is ok. If not, check into your Environment Variables if the node.js path was defined.

## Install MongoDB.
* Download from https://www.mongodb.org/downloads
* Install into your Operational System
* If you are using Windows you need to create the following path: "C:\data\db". This path will be used for MongoDB to storage your data.
* To test, go to the MongoDB binary directory (usually into "C:/Program Files/MongoDB/Server/<version>/bin") and run the mongod.exe. If everything is alright the following message will be shown: "waiting for connections on port 27017".
* You might also to install MongoDB as windows service (see https://docs.mongodb.org/manual/tutorial/install-mongodb-on-windows/).

## Install Git
* Download from https://git-scm.com/download/win
* Click next, next, next...
* Hurray! Your Git was installed!

## Install the Project
* If in Windows, just run "install_windows.bat" as Administrator.
* Wait for the message "press any key to continue...".
* If the message not be shown, open the command prompt and redirects to the project folder. After this run the following commands:
- $ npm install -g bower
- $ npm install -g express
- $ bower install
- $ npm install

## Run the Project
Run the following command:
- npm start
- Open the following address into your browser: http:127.0.0.1:3000

## Troubleshooting
* Before all, ensure yourself that all steps were obeyed and that MongoDB is active.
