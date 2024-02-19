import { useState } from "react";
import { useAccount, useBalance, useConnect, useDisconnect } from "wagmi";

export default function Home() {
  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();

  // State to track if the user is connected or not
  const [isConnectedState, setIsConnectedState] = useState(isConnected);

  // State to store the search query
  const [searchQuery, setSearchQuery] = useState("");
  // State to store the wallet address input value
  const [walletAddress, setWalletAddress] = useState('');
  // Function to handle connection/disconnection
  const handleConnection = () => {
    if (isConnectedState) {
      disconnect();
    } else {
      connect({ connector: connectors && connectors[0] });
    }
    setIsConnectedState(!isConnectedState);
  };

  // Text to display on the button based on connection status
  const buttonText = isConnectedState ? "Disconnect" : "Connect";

  // Define an array of token addresses
  const tokenAddresses = [
    // USDT Token Address
    "55d398326f99059fF775485246999027B3197955",
    // ETH Token Address
    "2170Ed0880ac9A755fd29B2688956BD959F933F8",
    // AVAX Token Address
    "1CE0c2827e2eF14D5C4f29a091d735A204794041",
    // SELF Token Address
    "DfD58FfdD4FCdf6277050Da5214E7eC208cfC086",
    // SOL Token Address
    "570A5D26f7765Ecb712C0924E4De545B89fD43dF",
  ];

  // Fetch balances for each token address
  const balances = tokenAddresses.map((tokenAddress) => {
    const { data } = useBalance({
      token: `0x${tokenAddress}`,
      address: walletAddress || address,
    });
    return data;
  });

  // Filter balances based on search query
  const filteredBalances = balances.filter(
    (balance) =>
      balance &&
      balance.symbol.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      {/* Navbar  */}
      <header className="bg-gray-800 text-white">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center h-16">
            {/* Connect Button  */}
            <button
              onClick={handleConnection}
              className="inline-flex items-center px-8 py-4 text-base font-semibold text-white bg-gray-700 rounded-md shadow-md hover:bg-gray-800"
            >
              {buttonText}
            </button>
          </div>
        </nav>
      </header>

      {/* Hero Section  */}
      <section className="hero min-h-screen bg-gray-100 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {isConnectedState ? (
            <>
              <div className="mt-8 flex items-center">
                {/* Search Input and Balances (when connected) */}
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Search balance"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* Wallet Address Input */}
              <div className="mt-4 flex items-center">
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter wallet address"
                  value={walletAddress}
                  onChange={(e) => setWalletAddress(e.target.value)}
                />
              </div>

              {/* Balances and Symbol */}
              <ul className="mt-8 divide-y divide-gray-200">
                {filteredBalances.map((balance, index) => (
                  <li
                    key={index}
                    className="flex flex-wrap items-center justify-between py-4"
                  >
                    <p className="text-gray-900 font-medium">
                      {balance?.symbol}
                    </p>
                    <span className="text-gray-500"> {balance?.formatted}</span>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <>
              {/* Connect Wallet Prompt (when not connected) */}
              <div className="text-center mt-8">
                <h2 className="text-xl font-semibold text-gray-700">
                  Please connect your wallet to check your balances.
                </h2>
                <p className="mt-4 text-gray-500">
                  Connecting your wallet allows you to view your token balances
                  and interact with decentralized applications.
                </p>
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}
