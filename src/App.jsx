import './App.css';
import { useState, useEffect } from 'react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';
import WalletInfo from './components/WalletInfo';
import AirdropForm from './components/AirdropForm';
import TransferForm from './components/TransferForm';
import Transactions from './components/Transactions';

function App() {
  const [tab, setTab] = useState('transfer');
  const [airdropAddress, setAirdropAddress] = useState('');
  const [airdropAmount, setAirdropAmount] = useState('');
  const [balance, setBalance] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const { connection } = useConnection();
  const { publicKey, connected } = useWallet();

  // Update balance when wallet changes or connects
  useEffect(() => {
    async function fetchBalance() {
      if (connected && publicKey) {
        const bal = await connection.getBalance(publicKey);
        setBalance(bal / LAMPORTS_PER_SOL);
      } else {
        setBalance(null);
      }
    }
    fetchBalance();
  }, [connected, publicKey, connection]);

  // Clear fields on wallet disconnect
  useEffect(() => {
    if (!connected) {
      setAirdropAddress('');
      setAirdropAmount('');
      setMessage(null);
    }
  }, [connected]);

  // Placeholder for transfer logic
  const handleTransfer = (e) => {
    e.preventDefault();
    setMessage({ type: 'success', text: 'Transfer successful!' });
  };

  // Airdrop logic
  const handleAirdrop = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    try {
      const pubkey = publicKey;
      await connection.requestAirdrop(pubkey, parseFloat(airdropAmount) * LAMPORTS_PER_SOL);
      setMessage({ type: 'success', text: 'Airdrop successful!' });
      // Refresh balance
      const bal = await connection.getBalance(pubkey);
      setBalance(bal / LAMPORTS_PER_SOL);
    } catch (e) {
      setMessage({ type: 'error', text: e.message });
    }
    setLoading(false);
  };

  const accountAddress = connected && publicKey ? publicKey.toBase58() : '';

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Wallet Connect Button - fixed top right */}
      <div className="fixed top-4 right-4 z-50">
        <WalletMultiButton className="!bg-blue-600 !text-white !rounded !px-4 !py-2 !text-sm" />
      </div>
      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-lg p-10 w-full max-w-xl border border-gray-100">
          <WalletInfo name="Account 1" address={accountAddress} balance={balance} />
          {/* Tabs */}
          <div className="flex bg-gray-50 rounded overflow-hidden border mb-4">
            <button
              className={`flex-1 py-2 text-center text-sm font-medium ${tab === 'transfer' ? 'bg-white border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'}`}
              onClick={() => setTab('transfer')}
            >
              Transfer Sol
            </button>
            <button
              className={`flex-1 py-2 text-center text-sm font-medium ${tab === 'airdrop' ? 'bg-white border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'}`}
              onClick={() => setTab('airdrop')}
            >
              Airdrop Sol
            </button>
            <button
              className={`flex-1 py-2 text-center text-sm font-medium ${tab === 'transactions' ? 'bg-white border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'}`}
              onClick={() => setTab('transactions')}
            >
              Transactions
            </button>
          </div>
          {/* Tab Panels */}
          <div className="bg-white border rounded-lg p-6">
            {tab === 'transfer' && <TransferForm />}
            {tab === 'airdrop' && (
              <AirdropForm
                address={airdropAddress}
                amount={airdropAmount}
                loading={loading}
                message={message}
                onAddressChange={e => setAirdropAddress(e.target.value)}
                onAmountChange={e => setAirdropAmount(e.target.value)}
                onSubmit={handleAirdrop}
              />
            )}
            {tab === 'transactions' && <Transactions />}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
