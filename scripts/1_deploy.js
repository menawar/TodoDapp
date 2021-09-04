const hre = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  const Todos = await hre.ethers.getContractFactory("Todos");
  const todos = await Todos.deploy();

  await todos.deployed();

  const create = await todos.createTask("cook", "menawar");
  const u = await create.wait();
  console.log(u);

  console.log("Todos deployed to:", todos.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
