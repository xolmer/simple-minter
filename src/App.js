import "./App.css";
import minterAbi from "./minterAbi.json";
import { ethers, BigNumber } from "ethers";
import { useEffect, useState } from "react";
const minterAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

function App() {
  //Connecting
  const [accounts, setAccounts] = useState([]);

  const connectAccounts = async () => {
    if (window.ethereum) {
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      setAccounts(accounts);
    }
  };
  useEffect(() => {
    connectAccounts();
  }, []);

  //Minting
  const [mintAmount, setMintAmount] = useState(1);
  const handleMint = async () => {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(minterAddress, minterAbi.abi, signer);
      try {
        const response = await contract.mint(BigNumber.from(mintAmount));
        console.log("response : ", response);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="App">
      <h1>Minter</h1>
      {accounts.length && (
        <div>
          Mint Button
          <button onClick={() => setMintAmount(mintAmount - 1)}>-</button>
          <span>{mintAmount}</span>
          <button onClick={() => setMintAmount(mintAmount + 1)}>+</button>
          <button onClick={handleMint}>Mint</button>
        </div>
      )}
    </div>
  );
}

export default App;
