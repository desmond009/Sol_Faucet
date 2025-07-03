import React from 'react';

function shortenAddress(address) {
  if (!address) return '';
  return address.slice(0, 4) + '...' + address.slice(-4);
}

const WalletInfo = ({ name, address, balance }) => (
  <>
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-3xl font-serif font-semibold">{name}</h2>
      <button className="flex items-center gap-2 bg-gray-50 border rounded px-3 py-1 text-sm font-medium text-gray-700 shadow-sm">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 19.5a7.5 7.5 0 1115 0v.75A2.25 2.25 0 0117.25 22.5h-10.5A2.25 2.25 0 014.5 20.25V19.5z" />
        </svg>
        {shortenAddress(address)}
      </button>
    </div>
    <div className="mb-4 flex items-center gap-2">
      <span className="font-semibold text-gray-800">Balance:</span>
      <span className="font-semibold">{balance !== null ? balance : '--'} SOL</span>
    </div>
  </>
);

export default WalletInfo; 