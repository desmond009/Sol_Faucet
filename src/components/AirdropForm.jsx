import React from 'react';

const AirdropForm = ({ address, amount, loading, message, onAddressChange, onAmountChange, onSubmit }) => (
  <form className="flex flex-col gap-3" onSubmit={onSubmit}>
    <div>
      <div className="font-semibold text-gray-800 mb-1">Airdrop Sol</div>
      <div className="text-xs text-gray-400 mb-2">Airdrop Sol to any solana address</div>
      <input
        className="border rounded px-3 py-2 w-full mb-2"
        placeholder="Enter Solana Address"
        value={address}
        onChange={onAddressChange}
      />
      <input
        className="border rounded px-3 py-2 w-full mb-2"
        placeholder="Enter Amount"
        type="number"
        value={amount}
        onChange={onAmountChange}
      />
    </div>
    <button
      className="bg-gray-900 text-white rounded px-4 py-2 font-semibold w-fit mt-2 disabled:opacity-50"
      disabled={loading}
      type="submit"
    >
      {loading ? 'Airdropping...' : 'Airdrop Sol'}
    </button>
    {message && (
      <div className={`text-sm ${message.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>{message.text}</div>
    )}
  </form>
);

export default AirdropForm; 