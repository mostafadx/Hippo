import { useState } from 'react';
import { BrowserProvider } from 'ethers';
import Web3Modal from 'web3modal';
import hippoLogo from '/hippo.svg';
import './App.css';

function App() {
  const [walletAddress, setWalletAddress] = useState<string | null>(null); // Explicit type
  const [count, setCount] = useState(0);

  const connectWallet = async () => {
    try {
      const web3Modal = new Web3Modal();
      const instance = await web3Modal.connect();
      const provider = new BrowserProvider(instance);

      const signer = await provider.getSigner();
      const address = await signer.getAddress(); // Now this will work
      setWalletAddress(address);
    } catch (error) {
      console.error('Failed to connect wallet:', error);
    }
  };

  return (
    <>
      <div>
        <a href="https://www.etsy.com/market/hippo_lovers" target="_blank">
          <img src={hippoLogo} className="logo" alt="Hippo logo" />
        </a>
      </div>
      <h2>Hippos are always spotted!</h2>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          {count} hippo
        </button>
      </div>

      {/* Floating Connect to Wallet Button */}
      <div className="connect-wallet-container">
        <button className="connect-wallet-button" onClick={connectWallet}>
          {walletAddress
            ? `Connected: ${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`
            : 'Connect Wallet'}
        </button>
      </div>
    </>
  );
}

export default App;