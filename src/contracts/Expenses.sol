// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ExpenseTracker {
    struct Expense {
        uint256 id;
        uint256 amount;
        string date;
        string category;
        string description;
        uint256 canceled;
    }

    mapping(uint256 => Expense) public expenses;
    uint256 public nextId;

    function addExpense(uint256 _amount, string memory _date, string memory _category, string memory _description) external {
        expenses[nextId] = Expense(nextId, _amount, _date, _category, _description, 1);
        nextId++;
    }

    function cancelExpense(uint256 _id) external {
        require(expenses[_id].id == _id, "Expense not found");
        expenses[_id].canceled = 0;
    }

    function getAllExpenses() external view returns (Expense[] memory) {
        Expense[] memory allExpenses = new Expense[](nextId);
        for (uint256 i = 0; i < nextId; i++) {
            allExpenses[i] = expenses[i];
        }
        return allExpenses;
    }

    function getExpense(uint256 _id) external view returns (Expense memory)  {
        Expense memory expense = expenses[_id];
        return expense;
    }
}
