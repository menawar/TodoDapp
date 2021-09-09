const hre = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  const Todos = await hre.ethers.getContractFactory("Todos");
  const todos = await Todos.deploy();

  await todos.deployed();

  const create = await todos.createTask("cook", "menawar");
  const cCreate = await create.wait();
  console.log(cCreate);

  const update = await todos.updateTask(1, "wash");
  const uUpdate = await update.wait();
  console.log(uUpdate);

  const getTaskss = await todos.getTask(1);
  console.log(getTaskss);

  const delet = await todos.deleteTask(1);
  const dDelete = await delet.wait();
  console.log(dDelete);

  const geTaskiDss = await todos.getTaskIds();
  console.log(geTaskiDss);

  const toggle = await todos.toggleTask(1);
  const tToggle = await toggle.wait();
  console.log(tToggle);

  console.log("Todos deployed to:", todos.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
