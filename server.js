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
    database:"employee_trackerdb"
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
            "View Total Utilized Budget (Department)",
            "Add Employee",
            "Add Deparment",
            "Add Role",
            "Update Employee Role",
            "Update Employee Manager",
            "Delete Employee",
            "Delete Role",
            "Delete Department",
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
            case "View Total Utilized Budget (Department)":
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


//View departments, roles, employees

function viewAllEmployees(){
    connection.query(
        "SELECT employee.id, first_name, last_name, title, salary, department, manager FROM employee_trackerdb.employee INNER JOIN role on role.id = employee.role_id INNER JOIN department on department.id = role.department_id;",
        function (err, res){
            if(err) throw err;
            console.table(res)
            intializePrompt();
        }
    )
};

function viewAllDept(){
    
}

function viewAllRole(){
    
}

//Add department, employee, role
function addDepartment(){
   
}

function addEmployee(){

}

function addRole(){
    
}

//Update employee roles, employee managers

function updateEmployeeRole(){
   
}

function updateEmployeeManager(){

}


//Delete department, employee, role

function  deleteDepartment(){

}

function deleteEmployee(){

}

function deleteRole(){

}

//Exit Application

function exitApp(){
console.table("Goodbye! Thanks for using the Employee Database :)")
}



