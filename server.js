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

function intializePrompt(){
    inquirer.prompt(
    {
        type: "list",
        message: "Welcome to the employee database! What would you like to do?",
        name: "choice",
        choices: [
            "View All Employees",
            "View All Department",
            "View All Roles",
            "View Employee By Manager",
            "Add Employee",
            "Add Deparment",
            "Add Role",
            "Update Employee Role",
            "Update Employee Manager",
            "Delete Employee",
            "Delete Role",
            "Delete Department",
            "View Total Utilized Budget",
            "Exit"
        ]
    }).then(function(answer){
        switch(answer.choice){
            case "View All Employees":
                viewAllEmployees();
                break;  
            case "View All Department":
                viewAllDept();
                break;
            case "View All Roles":
                viewAllRole();
                break;
            case "View Employee By Manager":
                viewByManager();
                break;
            case "Add Employee":
                addEmployee();
                break;
            case "Add Deparment":
                addDepartment();
                break;
            case "Add Role":
                addRole();
                break;
            case "Update Employee Role":
                updateEmployeeRole();
                break;
            case "Update Employee Manager":
                updateEmployeeManager();
                break;
            case "Delete Employee":
                deleteEmployee();
                break;
            case "Delete Role":
                deleteRole();
                break;
            case "Delete Department":
                deleteDepartment();
                break;
            case "View Total Utilized Budget":
                totalUtilizedBudget()
                break;
            case "Exit":
                exitApp();
                break
            default:
                break;
        }

    }).catch(err =>{
        if(err){
            console.log("Please try again!")
        }else{
            console.log("Looks good!")
        }
    });

}


//Add departments, role, employees


//View departments, roles, employees


//Update employee roles


//Update employee managers


//View employees by manager


//Delete departments, roles and employees


//View the total utilized budget of a department

