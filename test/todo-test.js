const { expect } = require("chai");
const { ethers } = require("hardhat");
const { assert } = require("chai");

describe("Todos", async function () {
  let Todos, todos;

  beforeEach(async () => {
    Todos = await ethers.getContractFactory("Todos");
    todos = await Todos.deploy();
  });

  describe("Create Task", () => {
    it("should create Task", async () => {
      await todos.deployed();
      const create = await todos.createTask("work", "menawar");
      const taskId = await todos.taskId();
      assert.equal(taskId, 2);
      const event = create.logs[0].args;
      //   assert.equal(event.id.toNumber(), 2);
      assert.equal(event.describtion, "work");
      assert.equal(event.isDone, false);

      //   expect().to.equal(
      //     todos.getTask(1)
      //   );
    });
    // it("should change its name when requested", async () => {
    //   const MyContract = await ethers.getContractFactory("MyContract");
    //   const myContract = await MyContract.deploy("My Contract");

    //   await myContract.changeName("Another Contract");
    //   expect(await myContract.getName()).to.equal("Another Contract");
    // });
  });
});
