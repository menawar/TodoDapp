const { expect } = require("chai");
const { ethers } = require("hardhat");
const { assert } = require("chai");

describe("Todos", async function () {
  let Todos, todos;

  beforeEach(async () => {
    Todos = await ethers.getContractFactory("Todos");
    todos = await Todos.deploy();
    await todos.deployed();
  });

  describe("Create Task", () => {
    it("should create Task", async () => {
      let taskIds = await todos.getTaskIds();
      assert.equal(taskIds.length, 0);

      await todos.createTask("cook rice and stew", "devNathan");
      taskIds = await todos.getTaskIds();
      assert.equal(taskIds.length, 1);

      await todos.createTask("Wash cloths", "devNathan");
      taskIds = await todos.getTaskIds();
      assert.equal(taskIds.length, 2);
    });

    it("Throws  error if task doesn't exist", async () => {
      todos.getTask(1).catch(assert);
    });

    it("toggles task completion", async () => {
      const result = await todos.toggleTask(1);
      const task = await todos.tasks(1);
      assert.equal(task.isDone, true);
    });
    //
  });
  //
});
