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
    inquirer.prompt([
        {
            name: "name",
            type: "input",
            message: "What Department is being added?"
        }
    ]).then(function(res){
        const query= connection.query(
            "INSERT INTO department SET ? ",
            {
                name: res.name
            },
            (err)=>{
                if(err) throw err
                console.table(res);
                intializePrompt();
            }
        )
    })
}

function addRole(){
    connection.query("SELECT role.title AS Title, rolse.salary AS Salary FROM role", (err, res)=> [
        inquirer.prompt([
            {
                name: "Title",
                type: "input",
                message: "What is the new role titled?"
            },
            {
                name: "Salary",
                type: "input",
                message: "What is the salary?"
            }
        ]).then((res)=>{
            connection.query(
                "INSERT INTO role SET ?",
                {
                    title: res.Title,
                    salary: res.Salary,
                },
                (err) => {
                    if(err) throw err;
                    console.table(res);
                    intializePrompt();
                }
            )
        })
    ])
}

//View departments, roles, employees

function viewAllEmployees(){
    connection.query("SELECT employee.first_name, employee.last_name, role.title, role.salary, department.name, CONCAT(e.first_name, ' ' ,e.last_name) AS Manager FROM employee INNER JOIN role on role.id = employee.role_id INNER JOIN department on department.id = role.department_id left join employee e on employee.manager_id = e.id;", 
    (err, res) =>{
      if (err) throw err
      console.table(res)
      intializePrompt()
  })
}

function viewAllDept(){
    connection.query("SELECT employee.first_name, employee.last_name, department.name AS Department FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id ORDER BY employee.id;", 
    (err, res) =>{
      if (err) throw err
      console.table(res)
      intializePrompt()
    })
}

function viewAllRole(){
    connection.query("SELECT employee.first_name, employee.last_name, role.title AS Title FROM employee JOIN role ON employee.role_id = role.id;", 
    (err, res) => {
    if (err) throw err
    console.table(res)
    intializePrompt()
    })
}

//Update employee roles, employee managers

function updateEmployeeRole(){
    connection.query("SELECT employee.last_name, role.title FROM employee JOIN role ON employee.role_id = role.id;",
        (err, res) =>{
        // console.log(res)
         if (err) throw err
         console.log(res)
        inquirer.prompt([
              {
                name: "lastName",
                type: "list",
                choices: function() {
                  const lastName = [];
                  for (let i = 0; i < res.length; i++) {
                    lastName.push(res[i].last_name);
                  }
                  return lastName;
                },
                message: "What is the Employee's last name? ",
              },
              {
                name: "role",
                type: "list",
                message: "What is the Employees new title? ",
                choices: selectRole()
              },
          ]).then(function(value) {
            const roleId = selectRole().indexOf(value.role) + 1
            connection.query("UPDATE employee SET WHERE ?", 
            {
              last_name: val.lastName
               
            }, 
            {
              role_id: roleId
               
            }, 
            (err)=>{
                if (err) throw err
                console.table(val)
                intializePrompt()
            })
      
        });
      });
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


//Exit Application

function exitApp(){

}


//Other Functions

const roleArr=[];
function selectRole(){
    connection.query("SELECT * FROM role", (err, res) => {
        if(err) throw err
        for(let i=0; i < res.length; i++ ){
            roleArr.push(res[i].title);
        }
    })
    return roleArr;
}

const managerArr=[]
function selectManager(){
    connection.query("SELECT first_name, last_name FROM employee WHERE manager_id IS NULL", function(err, res) {
        if (err) throw err
        for (let i = 0; i < res.length; i++) {
          managerArr.push(res[i].first_name);
        }
    
      })
      return managersArr;
}