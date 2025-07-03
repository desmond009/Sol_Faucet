import React from 'react';

const TransferForm = () => (
  <form className="flex flex-col gap-3">
    <div>
      <div className="font-semibold text-gray-800 mb-1">Transfer Sol</div>
      <div className="text-xs text-gray-400 mb-2">Transfer Sol to any solana address</div>
      <input className="border rounded px-3 py-2 w-full mb-2" placeholder="Enter Solana Address" />
      <input className="border rounded px-3 py-2 w-full mb-2" placeholder="Enter Amount" type="number" />
    </div>
    <button className="bg-gray-900 text-white rounded px-4 py-2 font-semibold w-fit mt-2">Transfer Sol</button>
  </form>
);

export default TransferForm; 