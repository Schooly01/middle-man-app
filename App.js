import React, { useState } from 'react';

export default function MiddleManApp() {
  const [step, setStep] = useState(1);
  const [contract, setContract] = useState({
    description: '',
    asset: '',
    secondPartyDeliverable: '',
    fulfilled: false,
    agreed: false,
  });
  const [vault, setVault] = useState(null);

  const handleCreateContract = () => {
    if (!contract.agreed) {
      alert("You must agree to the terms before continuing.");
      return;
    }
    setVault({ ...contract });
    setStep(2);
  };

  const handleMarkAsFulfilled = () => {
    setContract({ ...contract, fulfilled: true });
    setStep(3);
  };

  const handleRelease = () => {
    setStep(4);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 p-6 flex flex-col items-center justify-center">
      <div className="bg-white shadow-2xl rounded-2xl w-full max-w-xl p-6 space-y-6">
        <h1 className="text-3xl font-bold text-center">Middle Man Vault</h1>
        <p className="text-center italic text-sm text-gray-500">Trust Between Strangers—Made Simple</p>

        {step === 1 && (
          <div className="space-y-4">
            <textarea
              className="w-full p-2 border rounded"
              placeholder="What do you want done?"
              value={contract.description}
              onChange={(e) => setContract({ ...contract, description: e.target.value })}
            />
            <input
              className="w-full p-2 border rounded"
              placeholder="Asset to hold (e.g. $500, NFT, file)"
              value={contract.asset}
              onChange={(e) => setContract({ ...contract, asset: e.target.value })}
            />
            <textarea
              className="w-full p-2 border rounded"
              placeholder="What must Party Two deliver?"
              value={contract.secondPartyDeliverable}
              onChange={(e) => setContract({ ...contract, secondPartyDeliverable: e.target.value })}
            />
            <label className="flex items-center space-x-2 text-sm">
              <input
                type="checkbox"
                checked={contract.agreed}
                onChange={(e) => setContract({ ...contract, agreed: e.target.checked })}
              />
              <span>I agree to the terms of this basic contract.</span>
            </label>
            <button onClick={handleCreateContract} className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
              Create Contract
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4 text-sm">
            <p><strong>Contract:</strong> {vault.description}</p>
            <p><strong>Vault Holds:</strong> {vault.asset}</p>
            <p><strong>To Receive:</strong> {vault.secondPartyDeliverable}</p>
            <button onClick={handleMarkAsFulfilled} className="w-full bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600">
              Mark as Fulfilled
            </button>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4 text-center">
            <p className="text-lg font-medium">✅ Task Completed by Party Two</p>
            <button onClick={handleRelease} className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
              Release Asset
            </button>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-4 text-center">
            <p className="text-xl font-semibold">💸 Payment Confirmation</p>
            <p className="text-sm">Funds held in vault have been successfully released to Party Two.</p>
            <button onClick={() => window.location.reload()} className="w-full bg-gray-800 text-white py-2 rounded hover:bg-gray-900">
              Create New Contract
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
