#!/usr/bin/env node

import inquirer from "inquirer";

interface BankAccount {
    accountName: string;
    balance: number;
    withdraw(amount: number): void;
    deposit(amount: number): void;
    checkBalance(): void;
}

class MyBankAccount implements BankAccount {
    accountName: string;
    balance: number;

    constructor(accountName: string, balance: number) {
        this.accountName = accountName;
        this.balance = balance;
    }

    withdraw(amount: number): void {
        if (this.balance >= amount) {
            this.balance -= amount;
            console.log(`Withdrawn ${amount}. New balance: ${this.balance}`);
        } else {
            console.log("Insufficient balance.");
        }
    }

    deposit(amount: number): void {
        this.balance += amount;
        console.log(`Deposited ${amount}. New balance: ${this.balance}`);
    }

    checkBalance(): void {
        console.log(`Current balance for ${this.accountName}: ${this.balance}`);
    }
}


const accounts: BankAccount[] = [
    new MyBankAccount('Hussain', 1000),
    new MyBankAccount('Hamza', 1500),
    new MyBankAccount('Ali', 2000),
];

async function main() {
    while (true) {
        const accountChoices: string[] = [];
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
