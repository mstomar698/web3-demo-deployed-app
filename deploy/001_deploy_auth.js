const { ethers } = require("hardhat");

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  await deploy("Auth", {
    from: deployer,
    args: [],
    log: true,
  });
};

module.exports.tags = ["Auth"];
