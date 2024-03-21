// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ExpenseTracker {
    struct Expense {
        uint256 id;
        uint256 amount;
        string date;
        string category;
        string description;
    }

    mapping(uint256 => Expense) public expenses;
    uint256 public nextId;

    function addExpense(uint256 _amount, string memory _date, string memory _category, string memory _description) external {
        expenses[nextId] = Expense(nextId, _amount, _date, _category, _description);
        nextId++;
    }

    function updateExpense(uint256 _id, uint256 _amount, string memory _date, string memory _category, string memory _description) external {
        require(expenses[_id].id == _id, "Expense not found");
        expenses[_id].amount = _amount;
        expenses[_id].date = _date;
        expenses[_id].category = _category;
        expenses[_id].description = _description;
    }

    function deleteExpense(uint256 _id) external {
        require(expenses[_id].id == _id, "Expense not found");
        delete expenses[_id];
    }

    function getAllExpenses() external view returns (Expense[] memory) {
    Expense[] memory allExpenses = new Expense[](nextId);
    for (uint256 i = 0; i < nextId; i++) {
        allExpenses[i] = expenses[i];
    }
    return allExpenses;
    }

    function getNextId() external view returns (uint256) {
        return nextId;
    }

    function getAmount(uint256 _id) external view returns (uint256) {
        return expenses[_id].amount;
    }

    function getDate(uint256 _id) external view returns (string memory) {
        return expenses[_id].date;
    }

    function getCategory(uint256 _id) external view returns (string memory) {
        return expenses[_id].category;
    }

    function getDescription(uint256 _id) external view returns (string memory) {
        return expenses[_id].description;
    }
}
