import Web3 from "web3";
import Auth from "../artifacts/contracts/Auth.sol/Auth.json";

const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");

const contractAddress = "<contract_address>"; // replace with your contract address
const contract = new web3.eth.Contract(Auth.abi, contractAddress);

export { web3, contract };