//Dependencies
const inquirer= require('inquirer');
const mysql= require('mysql');
const cTable= require('console.table');

//Port connection
const connection= mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password:"0N!yme14",
    database:"employee_trackerDB"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected as id " + connection.threadId);
    intializePrompt();
  });

//Prompt question


//Add departments, role, employees


//View departments, roles, employees


//Update employee roles


//Update employee managers


//View employees by manager


//Delete departments, roles and employees


//View the total utilized budget of a department

