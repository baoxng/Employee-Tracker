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

function addEmployee(){
    inquirer. prompt([
        {
            name: "firstname",
            type: "input",
            message: "Enter first name of Employee."
        },
        {
            name: "lastname",
            type: "input",
            message: "Enter last name of Employee."
        },
        {
            name: "role",
            type: "list",
            choices: selectRole()
        },
        {
            name: "choice",
            type: "list",
            message: "Who is the manager?",
            choices: selectManager()
        }
    ]).then(function (value){
        const roleID= selectRole().indexOf(value.role) + 1
        const managerID= selectManager().indexOf(value.choice)+ 1
        connection.query("INSERT INTO employee SET ?"),
        {
            first_name: value.firstName,
            last_name: value.lastName,
            manager_id: managerID,
            role_id: roleID
        }, (err)=> {
            if (err) throw err
            console.table(value)
            intializePrompt()
        }
    })
}

function addDepartment(){

}

function addRole(){

}

//View departments, roles, employees, employees by manager

function viewAllEmployees(){

}

function viewAllDept(){

}

function viewAllRole(){

}

function viewByManager(){

}

//Update employee roles, employee managers

function updateEmployeeRole(){

}

function updateEmployeeManager(){

}

//Delete departments, roles and employees

function deleteEmployee(){

}

function deleteRole(){

}

function deleteDepartment(){

}

//View the total utilized budget of a department

function totalUtilizedBudget(){

}

//Exit Application

function exitApp(){

}
