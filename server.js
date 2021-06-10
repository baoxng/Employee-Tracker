//Dependencies
const inquirer= require('inquirer');
const mysql= require('mysql');
const cTable= require('console.table');
var figlet= require('figlet');
const chalk= require('chalk');

//Port connection
const connection= mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password:"0N!yme14",
    database:"employee_trackerdb"
});

//Figlet 
function initalizeDb(){
    figlet('Welcome to the Employee Tracker', function(err, data) {
        if (err) {
            console.log(chalk.red('Something went wrong...'));
            console.dir(err);
            return;
        }
        console.log(data)
        intializePrompt();
    });
}

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
            "Add Employee",
            "Add Deparment",
            "Add Role",
            "Update Employee Role",
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
            case "Exit":
               connection.end();
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


//View departments, roles, employees

function viewAllEmployees(){
    connection.query("SELECT * FROM employee", (err, res) => {
        if (err) throw err;
        console.table(res);
        intializePrompt();
    })
   
};

function viewAllDept(){
    connection.query("SELECT * FROM department", (err, res) => {
        if (err) throw err;
        console.table(res);
        intializePrompt();
    })  
}

function viewAllRole(){
    connection.query("SELECT * FROM role", (err, res) => {
        if (err) throw err;
        console.table(res);
        intializePrompt();
    })  
}

//Add department, employee, role
function addDepartment(){
    inquirer.prompt(
        {
            type: 'input',
            name: 'departmentName',
            message: 'What is the name of the department?',
        },
    ).then(res => {
        connection.query("INSERT INTO department SET ?", {name: res.departmentName}, (err, res) => {
            if (err) throw err;
            console.log("Added new department");
            intializePrompt();
        })
    })
   
}

function addEmployee(){
    inquirer.prompt(
        [{
            type: 'input',
            name: 'firstName',
            message: 'What is the first name of the employee?',
        },
        {
            type: 'input',
            name: 'lastName',
            message: 'What is the last name of the employee?',
        },
        {
            type: 'input',
            name: 'roleId',
            message: 'What is the role id of the employee?',
        },
        {
            type: 'input',
            name: 'managerId',
            message: 'What is the manager id of the employee?',
        },
        ]).then(res => {
            if (res.managerId === "") {
                res.managerId = null
            }

        connection.query("INSERT INTO employee SET ?", {first_name: res.firstName, last_name: res.lastName, role_id: res.roleId, manager_id: res.managerId}, (err, res) => {
            if (err) throw err;
            console.log("Employee added");
            intializePrompt();
        })
    })
}

function addRole(){
    inquirer.prompt(
        [{
            type: 'input',
            name: 'roleName',
            message: 'What is the name of the role?',
        },
        {
            type: 'input',
            name: 'roleSalary',
            message: 'What is the salary of the role?',
        },
        {
            type: 'input',
            name: 'departmentId',
            message: 'What is the department id of the role?',
        },
        ]).then(res => {
        connection.query("INSERT INTO role SET ?", {title: res.roleName, salary: res.roleSalary, department_id: res.departmentId}, (err, res) => {
            if (err) throw err;
            console.log("new role added");
            intializePrompt();
        })
    })
    
}

//Update employee roles

function updateEmployeeRole(){
    inquirer.prompt(
    [{
        type: "input",
        message: "First name of employee you would like to update:",
        name: "employeeUpdate"
      },

      {
        type: "input",
        message: "Change to which role?",
        name: "updateRole"
      }
    ])
    .then(function(res) {
      connection.query('UPDATE employee SET role_id=? WHERE first_name= ?',[res.updateRole, res.employeeUpdate],function(err, res) {
        if (err) throw err;
        console.table(res);
        intializePrompt();
      });
    });
}


connection.connect(function(err) {
    initalizeDb();
    if (err) throw err;
    console.log("Connected as id " + connection.threadId);
  });

