import abi from "./contract/BeAPatron.json";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import Buy from "./components/Buy";
import Patrons from "./components/Patrons";
import patron from "./patron.jpg"
import "./App.css" ;

function App() {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });
  const [account, setAccount] = useState("None");
  useEffect(() => {
    const connectWallet = async () => {
      const contractAddress = "0xccC0Df8D933039A95B4c5166906e7e23eFa752b1";
      const contractABI = abi.abi;
      try {
        const { ethereum } = window;

        if (ethereum) {
          const account = await ethereum.request({
            method: "eth_requestAccounts",
          });

          window.ethereum.on("chainChanged",()=>{
            window.location.reload();
          })
          window.ethereum.on("accountsChanged",()=>{
            window.location.reload();
          })

          const provider = new ethers.providers.Web3Provider(ethereum);
          const signer = provider.getSigner();
          const contract = new ethers.Contract(
            contractAddress,
            contractABI,
            signer
          );
          setAccount(account);
          setState({ provider, signer, contract });
        }else{
          alert("Please install metamask");
        }
           

          
          
      } catch (error) {
        console.log(error);
      }
    };
    connectWallet();
  }, []);

  
  return (
    <div style={{ backgroundColor: "#EFEFEF", height: "100%" }}>
      <img src={patron} className="img-fluid" alt=".." width="100%" />
      <p
        class="text-muted lead "
        style={{ marginTop: "10px", marginLeft: "5px" }}
      >
        <small>Connected Account - {account}</small>
      </p>
      <div className="container">
        <Buy state={state} />
        <Patrons state={state} />
      </div>
    </div>
  );
}

export default App;
