# Thrall
Paycraft repository

## Dependencies.

The project need the following dependecies:
* Nodejs.
* PostgreSQL.
* Git.

## Installing Nodejs
* Download from https://nodejs.org/en/download/
* Click next, next, next...
* Open a prompt and run: "node -v". If the node version was shown, everything is ok. If not, check into your Environment Variables if the node.js path was defined.

## Installing PostgreSQL.
* Download from http://www.postgresql.org/download/windows/
* Install into your Operational System
* Done.

## Installing Git
* Download from https://git-scm.com/download/win
* Click next, next, next...
* Hurray! Your Git was installed!

## Installing the Project
* If in Windows, just run "install_windows.bat" as Administrator.
* Wait for the message "press any key to continue...".
* If the message has not been shown, open the command prompt and redirects to the project folder. After this run the following commands:
- $ npm install -g bower
- $ npm install -g express
- $ bower install
- $ npm install

## Run the Project
* Open your PostgreSQL manager that you prefer.
* Create the following databases: "paycraft_development", "paycraft_test" and "paycraft_production".
* Open your prompt command and run the following command "npm start"
- Open the following address into your browser: http://127.0.0.1:3000
- 
## Troubleshooting
* Before all, ensure yourself that all steps were obeyed.
* Ensure that every time that you to pull the project you run the installation file script again (install_windows.bat).
