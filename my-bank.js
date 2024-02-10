// install inquirer and faker from npm
import inquirer from "inquirer";
import { faker } from "@faker-js/faker";
// create class for customer detail
class Customer {
    constructor(firstName, lastName, age, gender, mobileNumber, accountNumber) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
        this.gender = gender;
        this.mobileNumber = mobileNumber;
        this.accountNumber = accountNumber;
    }
}
;
;
// create class for bank
class Bank {
    constructor() {
        this.customer = [];
        this.account = [];
    }
    addCustomer(obj) {
        this.customer.push(obj);
    }
    addAccountNumber(obj) {
        this.account.push(obj);
    }
    transection(accountObj) {
        let newAccount = this.account.filter((acc) => acc.accountNumber !== accountObj.accountNumber);
        this.account = [...newAccount, accountObj];
    }
}
let myBank = new Bank();
// use faker library to create customers
for (let i = 1; i <= 3; i++) {
    let fName = faker.person.firstName("male");
    let lName = faker.person.lastName();
    let num = parseInt(faker.string.numeric("300121212"));
    const cus = new Customer(fName, lName, 19 * i, "male", num, 1000 + i);
    myBank.addCustomer(cus);
    myBank.addAccountNumber({ accountNumber: cus.accountNumber, balance: 100 * i });
}
// bank functionality
async function bankService(bank) {
    do {
        let service = await inquirer.prompt({
            type: "list",
            name: "select",
            message: "Please select the Option",
            choices: ["View Balance", "Cash Withdraw", "Cash Deposit", "Exit"]
        });
        if (service.select == "View Balance") {
            let res = await inquirer.prompt({
                type: "input",
                name: "userAcc",
                message: "Please enter your Account Number"
            });
            let account = myBank.account.find((acc) => acc.accountNumber == res.userAcc);
            if (!account) {
                console.log("Invalid Account Number");
            }
            if (account) {
                let name = myBank.customer.find((item) => item.accountNumber == account?.accountNumber);
                console.log(`Dear ${name?.firstName} ${name?.lastName} Your Account Balance is $${+account.balance}`);
            }
        }
        if (service.select == "Cash Withdraw") {
            let res = await inquirer.prompt({
                type: "input",
                name: "userAcc",
                message: "Please enter your Account Number"
            });
            let account = myBank.account.find((acc) => acc.accountNumber == res.userAcc);
            if (!account) {
                console.log("Invalid Account Number");
            }
            ;
            if (account) {
                let ans = await inquirer.prompt({
                    type: "number",
                    name: "money",
                    message: "Please enter the Amount."
                });
                if (ans.money > account.balance) {
                    console.log("Insufficient Balance");
                }
                let newBalance = account.balance - ans.money;
                bank.transection({ accountNumber: account.accountNumber, balance: newBalance });
            }
        }
        if (service.select == "Cash Deposit") {
            let res = await inquirer.prompt({
                type: "input",
                name: "userAcc",
                message: "Please enter your Account Number"
            });
            let account = myBank.account.find((acc) => acc.accountNumber == res.userAcc);
            if (!account) {
                console.log("Invalid Account Number");
            }
            ;
            if (account) {
                let ans = await inquirer.prompt({
                    type: "number",
                    name: "money",
                    message: "Please enter the Amount."
                });
                let newBalance = account.balance + ans.money;
                bank.transection({ accountNumber: account.accountNumber, balance: newBalance });
            }
        }
        // putting this (if) condition for to exit from this function 
        if (service.select == "Exit") {
            return;
        }
    } while (true);
}
bankService(myBank);
