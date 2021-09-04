//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Todos {
  constructor() {
    lastTaskId = 0;
  }

 
  struct Task {
    uint256 id;
    uint256 date;
    string description;
    string author;
    uint256 dateCompleted;
    bool isDone;
  }

  uint256[] taskIds;
  uint256 public lastTaskId;
  mapping(uint256 => Task) tasks;

  modifier checkIfTaskIdExists(uint256 id) {
    if (id == 0) {
      revert("task id is invalid");
    }
    _;
  }

  // events
  event TaskCreated(uint256, uint256, string, string, uint256, bool);
  event ToggleTaskStatus(uint256, uint256, bool);
  event TaskUpdated(uint256 _id, string _description);
  event TaskDeleted(uint256 _id);

  function createTask(string memory _description, string memory _author)
    public
  {
    lastTaskId++;
    tasks[lastTaskId] = Task(
      lastTaskId,
      block.timestamp,
      _description,
      _author,
      0,
      false
    );
    taskIds.push(lastTaskId);
    emit TaskCreated(
      lastTaskId,
      block.timestamp,
      _description,
      _author,
      0,
      false
    );
  }

  function getTask(uint256 _id)
    public
    view
    checkIfTaskIdExists(_id)
    returns (
      uint256,
      uint256,
      string memory,
      string memory,
      uint256,
      bool
    )
  {
    return (
      _id,
      tasks[_id].date,
      tasks[_id].description,
      tasks[_id].author,
      tasks[_id].dateCompleted,
      tasks[_id].isDone
    );
  }

  function updateTask(uint256 _id, string memory _description) public {
    Task storage task = tasks[_id];
    task.description = _description;
    emit TaskUpdated(_id, _description);
  }

  function deleteTask(uint256 _id) public {
    require(_id <= taskIds.length);
    uint256 taskId = taskIds[_id - 1];
    delete tasks[taskId];

    emit TaskDeleted(_id);
  }

  function getTaskIds() public view returns (uint256[] memory) {
    return taskIds;
  }

  function toggleTask(uint256 _id) public checkIfTaskIdExists(_id) {
    Task storage task = tasks[_id];
    task.isDone = true;
    task.dateCompleted = task.isDone ? block.timestamp : 0;
    emit ToggleTaskStatus(_id, task.dateCompleted, task.isDone);
  }
}
