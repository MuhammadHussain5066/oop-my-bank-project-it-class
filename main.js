#!/usr/bin/env node
import inquirer from "inquirer";
class MyBankAccount {
    accountName;
    balance;
    constructor(accountName, balance) {
        this.accountName = accountName;
        this.balance = balance;
    }
    withdraw(amount) {
        if (this.balance >= amount) {
            this.balance -= amount;
            console.log(`Withdrawn ${amount}. New balance: ${this.balance}`);
        }
        else {
            console.log("Insufficient balance.");
        }
    }
    deposit(amount) {
        this.balance += amount;
        console.log(`Deposited ${amount}. New balance: ${this.balance}`);
    }
    checkBalance() {
        console.log(`Current balance for ${this.accountName}: ${this.balance}`);
    }
}
const accounts = [
    new MyBankAccount('Hussain', 1000),
    new MyBankAccount('Hamza', 1500),
    new MyBankAccount('Ali', 2000),
];
async function main() {
    while (true) {
        const accountChoices = [];
        for (const account of accounts) {
            accountChoices.push(account.accountName);
        }
        const { selectedAccount } = await inquirer.prompt([
            {
                type: 'list',
                name: 'selectedAccount',
                message: 'Choose an account:',
                choices: accountChoices,
            },
        ]);
        const account = accounts.find(acc => acc.accountName === selectedAccount);
        if (!account) {
            console.log("Account not found.");
            continue;
        }
        const { action } = await inquirer.prompt([
            {
                type: 'list',
                name: 'action',
                message: 'Select an action:',
                choices: ['Check Balance', 'Deposit', 'Withdraw', 'Exit'],
            },
        ]);
        if (action === 'Exit') {
            console.log('Goodbye!');
            return;
        }
        switch (action) {
            case 'Check Balance':
                account.checkBalance();
                break;
            case 'Deposit':
                const { depositAmount } = await inquirer.prompt([
                    {
                        type: 'input',
                        name: 'depositAmount',
                        message: 'Enter the deposit amount:',
                        validate: (input) => {
                            const value = parseFloat(input);
                            return !isNaN(value) && value > 0 ? true : 'Please enter a valid amount.';
                        },
                    },
                ]);
                account.deposit(parseFloat(depositAmount));
                break;
            case 'Withdraw':
                const { withdrawAmount } = await inquirer.prompt([
                    {
                        type: 'input',
                        name: 'withdrawAmount',
                        message: 'Enter the withdrawal amount:',
                        validate: (input) => {
                            const value = parseFloat(input);
                            return !isNaN(value) && value > 0 ? true : 'Please enter a valid amount.';
                        },
                    },
                ]);
                account.withdraw(parseFloat(withdrawAmount));
                break;
        }
    }
}
main();
