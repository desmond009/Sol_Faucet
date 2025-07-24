import React, { useState } from 'react';

const TransferForm = ({ onTransfer, loading, message }) => {
  const [to, setTo] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!to || !amount) return;
    onTransfer(to, amount);
  };

  return (
    <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
      <div>
        <div className="font-semibold text-gray-800 mb-1">Transfer Sol</div>
        <div className="text-xs text-gray-400 mb-2">Transfer Sol to any solana address</div>
        <input
          className="border rounded px-3 py-2 w-full mb-2"
          placeholder="Enter Solana Address"
          value={to}
          onChange={e => setTo(e.target.value)}
          disabled={loading}
        />
        <input
          className="border rounded px-3 py-2 w-full mb-2"
          placeholder="Enter Amount"
          type="number"
          value={amount}
          onChange={e => setAmount(e.target.value)}
          disabled={loading}
        />
      </div>
      <button
        className="bg-gray-900 text-white rounded px-4 py-2 font-semibold w-fit mt-2"
        type="submit"
        disabled={loading}
      >
        {loading ? 'Transferring...' : 'Transfer Sol'}
      </button>
      {message && (
        <div className={`mt-2 text-sm ${message.type === 'error' ? 'text-red-600' : 'text-green-600'}`}>
          {message.text}
        </div>
      )}
    </form>
  );
};

export default TransferForm; 